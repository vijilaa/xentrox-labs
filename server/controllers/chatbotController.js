const fs = require('fs');
const path = require('path');

const FAQ_FILE_PATH = path.join(__dirname, '..', 'data', 'chatbotQuestions.json');
const USER_QUESTIONS_FILE_PATH = path.join(__dirname, '..', 'data', 'userQuestions.json');

// Helper to safely read JSON file
const readJsonFile = (filePath, fallback = []) => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf-8');
      return fallback;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error(`[Chatbot] Error reading ${filePath}:`, err.message);
    return fallback;
  }
};

// Helper to safely write JSON file
const writeJsonFile = (filePath, data) => {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`[Chatbot] Error writing ${filePath}:`, err.message);
    return false;
  }
};

// Stop words to strip during tokenization
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from',
  'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself',
  'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me', 'more', 'most',
  'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only', 'or', 'other',
  'our', 'ours', 'ourselves', 'out', 'over', 'own', 's', 'same', 'she', 'should', 'so', 'some',
  'such', 't', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there',
  'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was',
  'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with',
  'you', 'your', 'yours', 'yourself', 'yourselves', 'tell', 'give', 'please', 'know', 'want'
]);

// Common domain synonyms to enrich matching
const SYNONYM_MAP = {
  fee: ['fees', 'cost', 'costs', 'pricing', 'price', 'charges', 'rate', 'rupees', 'inr', 'tuition', 'amount'],
  placement: ['placements', 'placed', 'job', 'jobs', 'hiring', 'package', 'salary', 'career', 'lpa', 'guarantee'],
  location: ['locations', 'located', 'office', 'offices', 'branch', 'branches', 'address', 'addresses', 'campus', 'where'],
  course: ['courses', 'curriculum', 'syllabus', 'track', 'tracks', 'program', 'programs', 'training'],
  timing: ['timings', 'schedule', 'schedules', 'batch', 'batches', 'shift', 'shifts', 'hours', 'time'],
  duration: ['length', 'months', 'weeks', 'period', 'how long'],
  internship: ['internships', 'intern', 'live project', 'client project', 'experience letter'],
  certificate: ['certificates', 'certification', 'certifications', 'credential', 'credentials'],
  contact: ['phone', 'mobile', 'call', 'whatsapp', 'email', 'reach', 'number'],
  eligibility: ['eligible', 'qualification', 'qualifications', 'prerequisite', 'degree'],
  demo: ['trial', 'sample class', 'free session'],
  accommodation: ['hostel', 'pg', 'stay', 'room']
};

// Light word stemming for English plurals/suffixes
const stemWord = (word = '') => {
  let w = word.toLowerCase().trim();
  if (w.endsWith('ies') && w.length > 4) return w.slice(0, -3) + 'y';
  if (w.endsWith('es') && w.length > 4) return w.slice(0, -2);
  if (w.endsWith('s') && !w.endsWith('ss') && w.length > 3) return w.slice(0, -1);
  if (w.endsWith('ing') && w.length > 5) return w.slice(0, -3);
  if (w.endsWith('ed') && w.length > 4) return w.slice(0, -2);
  return w;
};

// Text normalization and token extraction
const tokenizeText = (text = '') => {
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s+#.]/g, ' ')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
};

// Expand tokens with synonym concepts
const expandTokensWithSynonyms = (tokens = []) => {
  const expanded = new Set(tokens);
  tokens.forEach((t) => {
    expanded.add(stemWord(t));
    for (const [canonical, synList] of Object.entries(SYNONYM_MAP)) {
      if (t === canonical || synList.includes(t) || stemWord(t) === canonical) {
        expanded.add(canonical);
        synList.forEach((s) => expanded.add(s));
      }
    }
  });
  return Array.from(expanded);
};

// Jaccard similarity between two token sets
const calculateJaccardSimilarity = (tokensA, tokensB) => {
  if (!tokensA.length || !tokensB.length) return 0;
  const setA = new Set(tokensA);
  const setB = new Set(tokensB);
  let intersection = 0;
  for (const token of setA) {
    if (setB.has(token)) intersection++;
  }
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
};

// Keyword & Semantic Matcher
const matchQuestionAgainstKnowledgeBase = (query, faqs) => {
  const cleanQuery = query.trim().toLowerCase();
  const rawQueryTokens = tokenizeText(cleanQuery);
  const queryTokens = expandTokensWithSynonyms(rawQueryTokens);

  let bestMatch = null;
  let highestScore = 0;
  let matchedKeywords = [];

  const scoredFaqs = faqs.map((faq) => {
    let score = 0;
    const currentMatchedKeywords = [];

    // 1. Direct Question exact or substring match (Very High Confidence)
    const faqQuestionClean = faq.question.toLowerCase();
    if (cleanQuery === faqQuestionClean) {
      score += 100;
      currentMatchedKeywords.push('exact_question_match');
    } else if (cleanQuery.includes(faqQuestionClean) || faqQuestionClean.includes(cleanQuery)) {
      score += 65;
    }

    // 2. Alternate Questions Match
    if (Array.isArray(faq.alternateQuestions)) {
      for (const alt of faq.alternateQuestions) {
        const altClean = alt.toLowerCase();
        if (cleanQuery === altClean) {
          score += 90;
          currentMatchedKeywords.push('alternate_question_match');
          break;
        } else if (cleanQuery.includes(altClean) || altClean.includes(cleanQuery)) {
          score += 55;
          break;
        }
      }
    }

    // 3. Keyword / Keyphrase Matching (Weighted by length and specificity)
    if (Array.isArray(faq.keywords)) {
      faq.keywords.forEach((kw) => {
        const cleanKw = kw.toLowerCase().trim();
        if (!cleanKw) return;

        // Exact phrase inside query (e.g., "mern stack", "placement assistance")
        if (cleanQuery.includes(cleanKw)) {
          const isMultiWord = cleanKw.includes(' ');
          const weight = isMultiWord ? 35 : 18;
          score += weight;
          if (!currentMatchedKeywords.includes(cleanKw)) {
            currentMatchedKeywords.push(cleanKw);
          }
        } else {
          // Check stemmed keyword or single token match
          const stemmedKw = stemWord(cleanKw);
          if (queryTokens.includes(cleanKw) || queryTokens.includes(stemmedKw)) {
            score += 14;
            if (!currentMatchedKeywords.includes(cleanKw)) {
              currentMatchedKeywords.push(cleanKw);
            }
          }
        }
      });
    }

    // 4. Token Overlap & Jaccard Similarity with Question & Alternate Questions
    const questionTokens = tokenizeText(faq.question);
    const tokenSim = calculateJaccardSimilarity(rawQueryTokens, questionTokens);
    score += tokenSim * 40;

    // Jaccard with keywords
    const kwTokens = tokenizeText((faq.keywords || []).join(' '));
    const kwSim = calculateJaccardSimilarity(rawQueryTokens, kwTokens);
    score += kwSim * 30;

    return {
      faq,
      score,
      matchedKeywords: currentMatchedKeywords
    };
  });

  // Sort by score descending
  scoredFaqs.sort((a, b) => b.score - a.score);

  if (scoredFaqs.length > 0 && scoredFaqs[0].score > 12) {
    bestMatch = scoredFaqs[0].faq;
    highestScore = scoredFaqs[0].score;
    matchedKeywords = scoredFaqs[0].matchedKeywords;
  }

  // Related questions suggestions (top 3 next candidates)
  const relatedFaqs = scoredFaqs
    .slice(bestMatch ? 1 : 0, bestMatch ? 4 : 3)
    .filter((item) => item.score > 5)
    .map((item) => ({
      id: item.faq.id,
      question: item.faq.question,
      category: item.faq.category
    }));

  // Normalize confidence between 0.0 and 1.0
  const normalizedConfidence = Math.min(1.0, Math.round((highestScore / 100) * 100) / 100);

  return {
    bestMatch,
    confidence: normalizedConfidence,
    matchedKeywords,
    relatedFaqs
  };
};

// @desc    Get all company FAQs / questions from JSON file
// @route   GET /api/chatbot/questions
// @access  Public
const getQuestions = async (req, res) => {
  try {
    const faqs = readJsonFile(FAQ_FILE_PATH, []);
    res.status(200).json({
      success: true,
      count: faqs.length,
      data: faqs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve chatbot knowledge base.',
      error: error.message
    });
  }
};

// @desc    Ask a question regarding the company (Keyword-based matching + Logging to userQuestions.json)
// @route   POST /api/chatbot/ask
// @access  Public
const askQuestion = async (req, res) => {
  try {
    const { query, source = 'web_chatbot', sessionId = null } = req.body;

    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a question to ask.'
      });
    }

    const trimmedQuery = query.trim();
    const faqs = readJsonFile(FAQ_FILE_PATH, []);

    // Perform keyword & semantic match
    const matchResult = matchQuestionAgainstKnowledgeBase(trimmedQuery, faqs);
    const { bestMatch, confidence, matchedKeywords, relatedFaqs } = matchResult;

    const isAnswered = !!bestMatch && confidence >= 0.2;

    // Log the question to userQuestions.json
    try {
      const userQuestions = readJsonFile(USER_QUESTIONS_FILE_PATH, []);

      // Check if this exact or highly similar question was already logged recently
      const normalizedQuery = trimmedQuery.toLowerCase();
      const existingEntryIndex = userQuestions.findIndex(
        (uq) => uq.query.toLowerCase() === normalizedQuery
      );

      if (existingEntryIndex >= 0) {
        userQuestions[existingEntryIndex].frequency = (userQuestions[existingEntryIndex].frequency || 1) + 1;
        userQuestions[existingEntryIndex].lastAskedAt = new Date().toISOString();
        userQuestions[existingEntryIndex].confidence = confidence;
        userQuestions[existingEntryIndex].answered = isAnswered;
      } else {
        const newLogEntry = {
          id: `uq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          timestamp: new Date().toISOString(),
          query: trimmedQuery,
          matchedQuestionId: bestMatch ? bestMatch.id : null,
          matchedQuestion: bestMatch ? bestMatch.question : null,
          category: bestMatch ? bestMatch.category : 'General',
          confidence,
          matchedKeywords,
          answered: isAnswered,
          frequency: 1,
          sessionId,
          source
        };

        // Keep last 500 questions
        userQuestions.unshift(newLogEntry);
        if (userQuestions.length > 500) {
          userQuestions.length = 500;
        }
      }

      writeJsonFile(USER_QUESTIONS_FILE_PATH, userQuestions);
    } catch (logErr) {
      console.error('[Chatbot] Failed to save user question to JSON file:', logErr.message);
    }

    // Detect fee-related inquiry to prompt name & phone lead capture
    const isFeeQuery =
      (bestMatch && (bestMatch.id === 'fees-structure' || bestMatch.id === 'fees-emi' || bestMatch.id === 'fees-scholarships' || (bestMatch.category === 'Fees & Admissions' && (bestMatch.id.includes('fee') || bestMatch.id.includes('emi'))))) ||
      /\b(fee|fees|cost|costs|pricing|price|emi|installment|tuition|charge|charges|how much)\b/i.test(trimmedQuery);

    // Default professional fallback response if question not found
    if (!isAnswered) {
      return res.status(200).json({
        success: true,
        answered: false,
        confidence: 0,
        query: trimmedQuery,
        isFeeQuery,
        answer: isFeeQuery
          ? "Our course fees depend on the track and duration, with flexible monthly installment (no-cost EMI) plans and early-bird scholarships available.\n\nPlease share your Name and Phone Number below so our academic counselor can send the exact fee brochure and active discounts directly to you!"
          : "Thank you for asking! I couldn't find an exact answer for your question in our current knowledge base. Our team is constantly expanding our answers.\n\nWould you like to connect directly with our admissions counselor or technical mentor? You can chat with us instantly on WhatsApp or request a fast callback!",
        matchedKeywords: [],
        suggestedActions: [
          { label: 'Chat on WhatsApp', action: 'whatsapp' },
          { label: 'Call +91 9940727614', action: 'call' },
          { label: 'Submit Enquiry', action: 'enroll_modal' }
        ],
        relatedQuestions: faqs.slice(0, 4).map((f) => ({
          id: f.id,
          question: f.question,
          category: f.category
        }))
      });
    }

    // Successfully answered
    res.status(200).json({
      success: true,
      answered: true,
      confidence,
      query: trimmedQuery,
      matchedQuestionId: bestMatch.id,
      matchedQuestion: bestMatch.question,
      category: bestMatch.category,
      answer: bestMatch.answer,
      isFeeQuery,
      matchedKeywords,
      suggestedActions: bestMatch.suggestedActions || [
        { label: 'Explore Courses', action: 'route', target: '/courses' },
        { label: 'Talk on WhatsApp', action: 'whatsapp' }
      ],
      relatedQuestions: relatedFaqs
    });
  } catch (error) {
    console.error('[Chatbot] Ask Question Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process your question.',
      error: error.message
    });
  }
};

// @desc    Log a user question directly to userQuestions.json (Used by client fallback/direct logging)
// @route   POST /api/chatbot/log-question
// @access  Public
const logUserQuestion = async (req, res) => {
  try {
    const { query, matchedQuestionId, matchedQuestion, confidence, matchedKeywords, answered, source } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({ success: false, message: 'Question query is required.' });
    }

    const userQuestions = readJsonFile(USER_QUESTIONS_FILE_PATH, []);
    const normalizedQuery = query.trim().toLowerCase();

    const existingIndex = userQuestions.findIndex((uq) => uq.query.toLowerCase() === normalizedQuery);
    if (existingIndex >= 0) {
      userQuestions[existingIndex].frequency = (userQuestions[existingIndex].frequency || 1) + 1;
      userQuestions[existingIndex].lastAskedAt = new Date().toISOString();
    } else {
      userQuestions.unshift({
        id: `uq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp: new Date().toISOString(),
        query: query.trim(),
        matchedQuestionId: matchedQuestionId || null,
        matchedQuestion: matchedQuestion || null,
        confidence: confidence || 0,
        matchedKeywords: matchedKeywords || [],
        answered: !!answered,
        frequency: 1,
        source: source || 'client_direct'
      });
      if (userQuestions.length > 500) userQuestions.length = 500;
    }

    writeJsonFile(USER_QUESTIONS_FILE_PATH, userQuestions);

    res.status(200).json({
      success: true,
      message: 'Question logged successfully to JSON file.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to log question.',
      error: error.message
    });
  }
};

// @desc    Get all user-asked questions from userQuestions.json (for Admin Analytics)
// @route   GET /api/chatbot/user-questions
// @access  Public / Admin
const getUserQuestions = async (req, res) => {
  try {
    const userQuestions = readJsonFile(USER_QUESTIONS_FILE_PATH, []);
    res.status(200).json({
      success: true,
      count: userQuestions.length,
      data: userQuestions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user questions log.',
      error: error.message
    });
  }
};

// @desc    Clear user questions log file
// @route   DELETE /api/chatbot/user-questions
// @access  Admin
const clearUserQuestions = async (req, res) => {
  try {
    writeJsonFile(USER_QUESTIONS_FILE_PATH, []);
    res.status(200).json({
      success: true,
      message: 'User questions log cleared successfully.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to clear user questions log.',
      error: error.message
    });
  }
};

// @desc    Add a new custom question/answer to knowledge base JSON
// @route   POST /api/chatbot/questions
// @access  Admin
const addNewFaq = async (req, res) => {
  try {
    const { category, question, keywords, alternateQuestions, answer, suggestedActions } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: 'Question and answer are required.'
      });
    }

    const faqs = readJsonFile(FAQ_FILE_PATH, []);
    const newFaq = {
      id: `custom_${Date.now()}`,
      category: category || 'General',
      question: question.trim(),
      keywords: Array.isArray(keywords) ? keywords : (keywords || '').split(',').map((k) => k.trim()),
      alternateQuestions: Array.isArray(alternateQuestions) ? alternateQuestions : (alternateQuestions || '').split('\n').map((q) => q.trim()).filter(Boolean),
      answer: answer.trim(),
      suggestedActions: Array.isArray(suggestedActions) ? suggestedActions : []
    };

    faqs.push(newFaq);
    writeJsonFile(FAQ_FILE_PATH, faqs);

    res.status(201).json({
      success: true,
      message: 'New question added to chatbot knowledge base successfully.',
      data: newFaq
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add question.',
      error: error.message
    });
  }
};

module.exports = {
  getQuestions,
  askQuestion,
  logUserQuestion,
  getUserQuestions,
  clearUserQuestions,
  addNewFaq
};
