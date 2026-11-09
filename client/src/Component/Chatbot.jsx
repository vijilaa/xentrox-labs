
import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  RotateCcw,
  Sparkles,
  Phone,
  MessageCircle,
  GraduationCap,
  ArrowRight,
  HelpCircle,
  Bot,
  User,
  CheckCircle2,
  Compass,
  Tag
} from 'lucide-react';

import {
  askChatbotQuestion,
  logChatbotQuestion,
  createEnquiry
} from '../services/api';

import localQuestions from '../data/chatbotQuestions.json';

// ==========================================
// STOP WORDS
// ==========================================

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an',
  'and', 'any', 'are', 'aren', 'as', 'at', 'be', 'because', 'been',
  'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can',
  'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each',
  'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having',
  'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his',
  'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself',
  'just', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not',
  'now', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'our',
  'ours', 'ourselves', 'out', 'over', 'own', 's', 'same', 'she',
  'should', 'so', 'some', 'such', 't', 'than', 'that', 'the',
  'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these',
  'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until',
  'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where',
  'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'you',
  'your', 'yours', 'yourself', 'yourselves', 'tell', 'give',
  'please', 'know', 'want'
]);

// ==========================================
// SYNONYMS
// ==========================================

const SYNONYM_MAP = {
  fee: [
    'fees', 'cost', 'costs', 'pricing', 'price', 'charges',
    'rate', 'rupees', 'inr', 'tuition', 'amount'
  ],

  placement: [
    'placements', 'placed', 'job', 'jobs', 'hiring',
    'package', 'salary', 'career', 'lpa', 'guarantee'
  ],

  location: [
    'locations', 'located', 'office', 'offices',
    'branch', 'branches', 'address', 'addresses',
    'campus', 'where'
  ],

  course: [
    'courses', 'curriculum', 'syllabus', 'track',
    'tracks', 'program', 'programs', 'training'
  ],

  timing: [
    'timings', 'schedule', 'schedules', 'batch',
    'batches', 'shift', 'shifts', 'hours', 'time'
  ],

  duration: [
    'length', 'months', 'weeks', 'period', 'how long'
  ],

  internship: [
    'internships', 'intern', 'live project',
    'client project', 'experience letter'
  ],

  certificate: [
    'certificates', 'certification',
    'certifications', 'credential', 'credentials'
  ],

  contact: [
    'phone', 'mobile', 'call', 'whatsapp',
    'email', 'reach', 'number'
  ],

  eligibility: [
    'eligible', 'qualification', 'qualifications',
    'prerequisite', 'degree'
  ],

  demo: [
    'trial', 'sample class', 'free session'
  ],

  accommodation: [
    'hostel', 'pg', 'stay', 'room'
  ]
};

// ==========================================
// TEXT PROCESSING
// ==========================================

const stemWord = (word = '') => {
  let w = word.toLowerCase().trim();

  if (w.endsWith('ies') && w.length > 4)
    return w.slice(0, -3) + 'y';

  if (w.endsWith('es') && w.length > 4)
    return w.slice(0, -2);

  if (w.endsWith('s') && !w.endsWith('ss') && w.length > 3)
    return w.slice(0, -1);

  if (w.endsWith('ing') && w.length > 5)
    return w.slice(0, -3);

  if (w.endsWith('ed') && w.length > 4)
    return w.slice(0, -2);

  return w;
};

const tokenize = (text = '') => {
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s+#.]/g, ' ')
    .split(/\s+/)
    .map(w => w.trim())
    .filter(w => w.length > 1 && !STOP_WORDS.has(w));
};

const expandTokens = (tokens = []) => {
  const expanded = new Set(tokens);

  tokens.forEach(t => {
    expanded.add(stemWord(t));

    for (const [canonical, synList] of Object.entries(SYNONYM_MAP)) {
      if (
        t === canonical ||
        synList.includes(t) ||
        stemWord(t) === canonical
      ) {
        expanded.add(canonical);
        synList.forEach(s => expanded.add(s));
      }
    }
  });

  return Array.from(expanded);
};

const calculateJaccard = (tokensA, tokensB) => {
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

// ==========================================
// LOCAL CHATBOT MATCHING ENGINE
// ==========================================

const matchLocally = (query) => {
  const cleanQuery = query.trim().toLowerCase();

  const rawQueryTokens = tokenize(cleanQuery);
  const queryTokens = expandTokens(rawQueryTokens);

  const scoredFaqs = localQuestions.map(faq => {
    let score = 0;

    const currentMatchedKeywords = [];

    const faqQuestionClean = faq.question.toLowerCase();

    if (cleanQuery === faqQuestionClean) {
      score += 100;
      currentMatchedKeywords.push('exact_match');

    } else if (
      cleanQuery.includes(faqQuestionClean) ||
      faqQuestionClean.includes(cleanQuery)
    ) {
      score += 65;
    }

    if (Array.isArray(faq.alternateQuestions)) {
      for (const alt of faq.alternateQuestions) {
        const altClean = alt.toLowerCase();

        if (cleanQuery === altClean) {
          score += 90;
          currentMatchedKeywords.push('alternate_match');
          break;

        } else if (
          cleanQuery.includes(altClean) ||
          altClean.includes(cleanQuery)
        ) {
          score += 55;
          break;
        }
      }
    }

    if (Array.isArray(faq.keywords)) {
      faq.keywords.forEach(kw => {
        const cleanKw = kw.toLowerCase().trim();

        if (!cleanKw) return;

        if (cleanQuery.includes(cleanKw)) {
          const isMultiWord = cleanKw.includes(' ');

          score += isMultiWord ? 35 : 18;

          if (!currentMatchedKeywords.includes(cleanKw)) {
            currentMatchedKeywords.push(cleanKw);
          }

        } else {
          const stemmedKw = stemWord(cleanKw);

          if (
            queryTokens.includes(cleanKw) ||
            queryTokens.includes(stemmedKw)
          ) {
            score += 14;

            if (!currentMatchedKeywords.includes(cleanKw)) {
              currentMatchedKeywords.push(cleanKw);
            }
          }
        }
      });
    }

    const questionTokens = tokenize(faq.question);

    score += calculateJaccard(
      rawQueryTokens,
      questionTokens
    ) * 40;

    const kwTokens = tokenize(
      (faq.keywords || []).join(' ')
    );

    score += calculateJaccard(
      rawQueryTokens,
      kwTokens
    ) * 30;

    return {
      faq,
      score,
      matchedKeywords: currentMatchedKeywords
    };
  });

  scoredFaqs.sort((a, b) => b.score - a.score);

  const isFeeFallback =
    /\b(fee|fees|cost|price|emi|installment|tuition|charges|how much)\b/i
      .test(cleanQuery);

  if (
    scoredFaqs.length > 0 &&
    scoredFaqs[0].score > 12
  ) {
    const top = scoredFaqs[0];

    const relatedFaqs = scoredFaqs
      .slice(1, 4)
      .filter(x => x.score > 5)
      .map(x => ({
        id: x.faq.id,
        question: x.faq.question,
        category: x.faq.category
      }));

    const matchedIsFee =
      isFeeFallback ||
      top.faq.id.includes('fee') ||
      top.faq.id.includes('emi') ||
      top.faq.category === 'Fees & Admissions';

    return {
      answered: true,

      confidence: Math.min(
        1,
        Math.round((top.score / 100) * 100) / 100
      ),

      matchedQuestionId: top.faq.id,
      matchedQuestion: top.faq.question,
      category: top.faq.category,
      answer: top.faq.answer,
      isFeeQuery: matchedIsFee,
      matchedKeywords: top.matchedKeywords,

      suggestedActions: top.faq.suggestedActions || [],

      relatedQuestions: relatedFaqs
    };
  }

  return {
    answered: false,
    confidence: 0,
    isFeeQuery: isFeeFallback,

    answer: isFeeFallback
      ? "Our course fees depend on the track and duration, with flexible monthly installment (no-cost EMI) plans and early-bird scholarships available.\n\nPlease share your Name and Phone Number below so our academic counselor can send the exact fee brochure and active discounts directly to you!"

      : "Thank you for asking! I couldn't find an exact answer for your question in our current knowledge base. Our team is constantly expanding our answers.\n\nWould you like to connect directly with our admissions counselor or technical mentor? You can chat with us instantly on WhatsApp or request a fast callback!",

    matchedKeywords: [],

    suggestedActions: [
      { label: 'Chat on WhatsApp', action: 'whatsapp' },
      { label: 'Call +91 9940727614', action: 'call' },
      { label: 'Submit Enquiry', action: 'enroll_modal' }
    ],

    relatedQuestions: localQuestions.slice(0, 3).map(f => ({
      id: f.id,
      question: f.question,
      category: f.category
    }))
  };
};

// ==========================================
// FEE LEAD CAPTURE FORM
// ==========================================

function FeeLeadCaptureCard({
  defaultCourse = 'MERN Stack Development'
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState(defaultCourse);

  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    const cleanDigits = phone.replace(/\D/g, '');

    if (cleanDigits.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      await createEnquiry({
        fullName: name.trim(),
        phone: cleanDigits,
        course: course || 'Fee Structure Inquiry',
        message: 'Requested course fee structure and scholarship details via AI Chatbot'
      });

      setStatus('submitted');

    } catch (err) {
      console.error('Failed to submit fee lead:', err);

      setErrorMsg(
        err.message || 'Unable to submit right now. Please connect via WhatsApp.'
      );

      setStatus('error');
    }
  };

  if (status === 'submitted') {
    return (
      <div className="mt-3 p-3.5 bg-gradient-to-br from-emerald-50 to-lime-50 border border-emerald-300 rounded-2xl text-slate-800 shadow-sm animate-in fade-in w-full">

        <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold text-xs mb-1">

          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />

          <span>Inquiry Saved in Database!</span>

        </div>

        <p className="text-[12px] text-slate-700 leading-snug">
          Thank you, <strong>{name}</strong>! Your contact number
          (<strong>+91 {phone}</strong>) has been registered.
          Our admissions counselor will contact you shortly.
        </p>

        <div className="mt-2.5 pt-2 border-t border-emerald-200/70 flex items-center justify-between">

          <span className="text-[10px] text-slate-500 font-medium">
            Need immediate response?
          </span>

          <a
            href={`https://wa.me/919940727614?text=${encodeURIComponent(
              `Hi XentroX Labs, I requested fee details for ${course}. My name is ${name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Chat on WhatsApp
          </a>

        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 p-3.5 bg-gradient-to-br from-white via-emerald-50/40 to-lime-50/40 border border-emerald-300 rounded-2xl shadow-sm text-slate-800 w-full animate-in fade-in">

      <div className="flex items-center justify-between gap-1 mb-1.5">

        <span className="text-[11px] font-extrabold text-[#033B32] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-lime-600" />
          Get Exact Course Fee & EMI Details
        </span>

        <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
          Saved to DB
        </span>

      </div>

      <p className="text-[11px] text-slate-600 leading-tight mb-2.5">
        Share your Name & Mobile Number below to receive the detailed fee schedule, no-cost EMI breakdown, and early-bird discount quote.
      </p>

      <form onSubmit={handleSubmit} className="space-y-2">

        <div className="relative">

          <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />

          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your Full Name"
            className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-white border border-slate-200 focus:border-emerald-500 rounded-xl outline-none"
          />

        </div>

        <div className="relative">

          <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />

          <input
            type="tel"
            required
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="10-digit Mobile Number"
            maxLength={10}
            className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-white border border-slate-200 focus:border-emerald-500 rounded-xl outline-none"
          />

        </div>

        <select
          value={course}
          onChange={e => setCourse(e.target.value)}
          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 focus:border-emerald-500 rounded-xl outline-none text-slate-700"
        >
          <option value="MERN Stack Development">MERN Stack Development</option>
          <option value="Python Full Stack Development">Python Full Stack Development</option>
          <option value="Java Full Stack Development">Java Full Stack Development</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Digital Marketing & Growth">Digital Marketing & Growth</option>
          <option value="Data Analytics & AI">Data Analytics & AI</option>
          <option value="Flutter Mobile App Development">Flutter Mobile App Development</option>
          <option value="DevOps & Cloud Computing">DevOps & Cloud Computing</option>
          <option value="Cyber Security">Cyber Security</option>
          <option value="General Technical Inquiry">Other / Not Sure Yet</option>
        </select>

        {errorMsg && (
          <p className="text-[11px] text-red-600 font-bold">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full py-2 px-3 text-xs font-bold text-white bg-[#033B32] hover:bg-[#022620] rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 disabled:opacity-60"
        >
          {status === 'submitting' ? (
            <span>Saving details to database...</span>
          ) : (
            <>
              <span>Get Fee Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5 text-lime-300" />
            </>
          )}
        </button>

      </form>
    </div>
  );
}

// ==========================================
// QUICK QUESTIONS
// ==========================================

const QUICK_PROMPTS = [
  {
    label: 'Courses Offered',
    query: 'What courses and tech programs do you offer?'
  },
  {
    label: 'MERN Stack Track',
    query: 'Tell me about the MERN Stack Development course'
  },
  {
    label: 'Course Fees & EMI',
    query: 'What is the fee structure for courses at XentroX Labs?'
  },
  {
    label: 'Job Placement Support',
    query: 'Do you offer placement assistance and job guarantee?'
  },
  {
    label: 'Lab Locations',
    query: 'Where are your training labs and offices located?'
  },
  {
    label: 'Career Gap Doubts',
    query: 'I have a career gap. Can I still get placed in an IT job?'
  },
  {
    label: 'Non-IT Background',
    query: 'Can an Arts or non-IT student learn coding?'
  },
  {
    label: 'Free Demo Class',
    query: 'Can I attend a free demo class before enrolling?'
  }
];

// ==========================================
// MAIN CHATBOT COMPONENT
// ==========================================

export default function Chatbot({
  onOpenEnroll,
  onSelectCourse
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [inputQuery, setInputQuery] = useState('');

  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem('xentrox_chat_history');

      if (saved) {
        return JSON.parse(saved);
      }

    } catch (e) {
      console.warn('Unable to load chat history:', e);
    }

    return [
      {
        id: 'msg_welcome',
        sender: 'bot',

        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),

        text: "👋 **Hello and welcome to XentroX Labs!**\n\nI'm your **AI Knowledge Assistant**, trained on over 60+ topics covering our **Courses, Placements, Fees, Live Client Projects, and Locations**.\n\nHow can I help you kickstart your software career today?",

        suggestedActions: [
          {
            label: 'Explore All Courses',
            action: 'route',
            target: '/courses'
          },
          {
            label: 'Talk to Counselor',
            action: 'whatsapp'
          }
        ]
      }
    ];
  });

  const [isLoading, setIsLoading] = useState(false);

  const [suggestions, setSuggestions] = useState([]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const prevMessagesCountRef = useRef(messages.length);

  const inputRef = useRef(null);

  // ==========================================
  // SCROLL TO BOTTOM (CONTAINER-ISOLATED)
  // ==========================================

  const scrollToBottom = (behavior = 'smooth') => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior
      });
    } else if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      const isInitial = prevMessagesCountRef.current === 0;
      scrollToBottom(isInitial ? 'auto' : 'smooth');
      prevMessagesCountRef.current = messages.length;

      const focusTimer = setTimeout(() => {
        inputRef.current?.focus();
      }, 200);

      return () => clearTimeout(focusTimer);
    }
  }, [isOpen, messages.length, isLoading]);

  // Isolate wheel and touch events within the message container
  // to ensure only the conversation scrolls and the background page does not
  useEffect(() => {
    if (!isOpen) return;
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.stopPropagation();

      const { scrollTop, scrollHeight, clientHeight } = container;
      const isScrollable = scrollHeight > clientHeight;

      if (!isScrollable) {
        e.preventDefault();
        return;
      }

      const deltaY = e.deltaY;
      const atTop = scrollTop <= 0 && deltaY < 0;
      const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 1 && deltaY > 0;

      if (atTop || atBottom) {
        e.preventDefault();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
      e.stopPropagation();
    };

    const handleTouchMove = (e) => {
      e.stopPropagation();
      if (!e.touches || !e.touches[0]) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const isScrollable = scrollHeight > clientHeight;

      if (!isScrollable) {
        e.preventDefault();
        return;
      }

      const atTop = scrollTop <= 0 && deltaY < 0;
      const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 1 && deltaY > 0;

      if (atTop || atBottom) {
        e.preventDefault();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isOpen]);

  // ==========================================
  // SAVE CHAT HISTORY
  // ==========================================

  useEffect(() => {
    try {
      sessionStorage.setItem(
        'xentrox_chat_history',
        JSON.stringify(messages)
      );
    } catch (e) {
      console.warn('Unable to save chat history:', e);
    }
  }, [messages]);

  // ==========================================
  // AUTOCOMPLETE
  // ==========================================

  useEffect(() => {
    const trimmed = inputQuery.trim().toLowerCase();

    if (trimmed.length >= 2) {
      const matches = localQuestions
        .filter(q => {
          const inQuestion = q.question.toLowerCase().includes(trimmed);

          const inKeywords = (q.keywords || [])
            .some(kw => kw.toLowerCase().includes(trimmed));

          const inAlts = (q.alternateQuestions || [])
            .some(alt => alt.toLowerCase().includes(trimmed));

          return inQuestion || inKeywords || inAlts;
        })
        .slice(0, 4)
        .map(q => ({
          id: q.id,
          question: q.question,
          category: q.category
        }));

      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);

    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputQuery]);

  // ==========================================
  // SEND MESSAGE
  // ==========================================

  const handleSendMessage = async (queryText) => {
    const query = (queryText || inputQuery).trim();

    if (!query || isLoading) return;

    setInputQuery('');
    setShowSuggestions(false);

    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: 'user',

      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),

      text: query
    };

    setMessages(prev => [...prev, userMsg]);

    setIsLoading(true);

    try {
      let botResponseData;

      // Backend API
      try {
        const apiRes = await askChatbotQuestion(
          query,
          'web_chatbot'
        );

        if (apiRes && apiRes.success) {
          botResponseData = apiRes;
        }

      } catch (apiErr) {
        console.warn(
          '[Chatbot Widget] Backend request failed:',
          apiErr.message
        );
      }

      // Local fallback
      if (!botResponseData) {
        botResponseData = matchLocally(query);

        logChatbotQuestion({
          query,
          matchedQuestionId: botResponseData.matchedQuestionId,
          matchedQuestion: botResponseData.matchedQuestion,
          confidence: botResponseData.confidence,
          matchedKeywords: botResponseData.matchedKeywords,
          answered: botResponseData.answered,
          source: 'client_fallback'
        }).catch(() => {});
      }

      // Fee detection
      const isFee =
        botResponseData.isFeeQuery ||
        /\b(fee|fees|cost|costs|pricing|price|emi|installment|tuition|charge|charges|how much)\b/i.test(query) ||
        (
          botResponseData.matchedQuestion &&
          /\b(fee|fees|cost|costs|pricing|price|emi|installment|tuition)\b/i.test(
            botResponseData.matchedQuestion
          )
        );

      const botMsg = {
        id: `bot_${Date.now()}`,
        sender: 'bot',

        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),

        text: botResponseData.answer,

        category: botResponseData.category,

        confidence: botResponseData.confidence,

        isFeeQuery: isFee,

        matchedKeywords: botResponseData.matchedKeywords || [],

        suggestedActions: botResponseData.suggestedActions || [],

        relatedQuestions: botResponseData.relatedQuestions || [],

        answered: botResponseData.answered !== false
      };

      setMessages(prev => [...prev, botMsg]);

    } catch (err) {
      console.error('[Chatbot Widget] Error:', err);

      setMessages(prev => [
        ...prev,
        {
          id: `bot_err_${Date.now()}`,
          sender: 'bot',

          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }),

          text: "I experienced a minor connection hiccup, but our team is ready to assist you right now!\n\nFeel free to tap the WhatsApp button below or call us directly at **+91 9940727614**.",

          suggestedActions: [
            {
              label: 'Chat on WhatsApp',
              action: 'whatsapp'
            },
            {
              label: 'Call +91 9940727614',
              action: 'call'
            }
          ]
        }
      ]);

    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // ACTION BUTTON HANDLER
  // ==========================================

  const handleActionClick = (actionItem) => {
    if (!actionItem) return;

    const {
      action,
      target,
      label
    } = actionItem;

    if (action === 'whatsapp') {
      const text = encodeURIComponent(
        `Hi XentroX Labs, I was asking the AI chatbot about: "${label || 'course details'}" and would like to speak to a counselor.`
      );

      window.open(
        `https://wa.me/919940727614?text=${text}`,
        '_blank',
        'noopener,noreferrer'
      );

    } else if (action === 'call') {
      window.location.href = 'tel:+919940727614';

    } else if (action === 'enroll_modal') {
      onOpenEnroll?.(target || '');

    } else if (action === 'course_modal') {
      if (onSelectCourse) {
        onSelectCourse({
          title: target || 'MERN Stack'
        });
      } else {
        onOpenEnroll?.(target || '');
      }

    } else if (action === 'route') {
      if (target) {
        window.location.href = target;
      }
    }
  };

  // ==========================================
  // RESET CHAT
  // ==========================================

  const handleResetChat = () => {
    const welcomeMsg = [
      {
        id: 'msg_welcome',
        sender: 'bot',

        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),

        text: "Conversation reset! 👋 How can I help you today regarding XentroX Labs courses, placements, or fees?",

        suggestedActions: [
          {
            label: 'Explore All Courses',
            action: 'route',
            target: '/courses'
          },
          {
            label: 'Talk to Counselor',
            action: 'whatsapp'
          }
        ]
      }
    ];

    setMessages(welcomeMsg);

    sessionStorage.removeItem('xentrox_chat_history');
  };

  // ==========================================
  // FORMAT CHATBOT TEXT
  // ==========================================

  const renderFormattedText = (rawText) => {
    if (!rawText) return null;

    const lines = rawText.split('\n');

    return (
      <div className="space-y-1.5 text-[13px] leading-relaxed">

        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1.5" />;
          }

          const parts = line.split(/(\*\*.*?\*\*)/g);

          const formattedLine = parts.map((part, pIdx) => {
            if (
              part.startsWith('**') &&
              part.endsWith('**')
            ) {
              return (
                <strong
                  key={pIdx}
                  className="font-extrabold text-[#033B32]"
                >
                  {part.slice(2, -2)}
                </strong>
              );
            }

            return part;
          });

          if (
            line.trim().startsWith('•') ||
            line.trim().startsWith('-')
          ) {
            return (
              <div
                key={idx}
                className="flex items-start gap-2 pl-1 my-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-lime-600 mt-2 shrink-0" />

                <span className="flex-1">
                  {formattedLine}
                </span>
              </div>
            );
          }

          const numberedMatch = line.trim().match(/^(\d+)\.\s+(.*)/);

          if (numberedMatch) {
            return (
              <div
                key={idx}
                className="flex items-start gap-2 pl-1 my-1"
              >
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-md shrink-0">
                  {numberedMatch[1]}
                </span>

                <span className="flex-1">
                  {formattedLine}
                </span>
              </div>
            );
          }

          return <p key={idx}>{formattedLine}</p>;
        })}

      </div>
    );
  };

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <>

      {/* FLOATING CHATBOT BUTTON */}

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center group pointer-events-auto">

        {!isOpen && (
          <div className="mr-3 px-3 py-1.5 text-xs font-bold text-slate-800 bg-white/95 border border-slate-200 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden sm:flex items-center gap-1.5 backdrop-blur-md">

            <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />

            <span>Ask XentroX AI</span>

          </div>
        )}

        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open XentroX AI Assistant"
            className="group relative flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#022620] via-[#033B32] to-emerald-900 text-white shadow-2xl border-2 border-lime-400/50 hover:border-lime-400 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer shadow-emerald-950/40"
          >

            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-lime-400 to-emerald-500 opacity-30 group-hover:opacity-75 blur-md transition-opacity duration-300 animate-pulse pointer-events-none" />

            <div className="relative z-10 flex items-center justify-center">
              <Bot className="w-5 h-5 sm:w-7 sm:h-7 text-lime-300 drop-shadow-sm group-hover:scale-105 transition-transform" />
            </div>

            <span className="absolute top-0 right-0 -mt-0.5 -mr-0.5 flex h-3.5 w-3.5">

              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />

              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-lime-400 border-2 border-[#022620]" />

            </span>

          </button>
        )}

      </div>

      {/* MAIN CHATBOT WINDOW */}

      {isOpen && (

        <div
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          className="fixed bottom-2 right-2 xs:bottom-3 xs:right-3 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-1rem)] xs:w-[calc(100vw-1.5rem)] sm:w-[410px] max-h-[88dvh] sm:max-h-[88vh] h-[520px] xs:h-[560px] sm:h-[640px] flex flex-col bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-2xl shadow-emerald-950/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200 overscroll-contain"
          style={{ overscrollBehavior: 'contain' }}
        >

          {/* HEADER */}

          <div className="bg-gradient-to-r from-[#022620] via-[#033B32] to-emerald-950 text-white p-4 flex items-center justify-between border-b border-white/10 shrink-0">

            <div className="flex items-center gap-3">

              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-lime-400 to-emerald-400 p-0.5 shadow-md flex items-center justify-center">

                <div className="w-full h-full bg-[#033B32] rounded-[14px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-lime-300" />
                </div>

                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-lime-400 border-2 border-[#022620] rounded-full" />

              </div>

              <div>
                <h3 className="font-extrabold text-sm text-white tracking-tight">
                  XentroX Assistant
                </h3>

                <span className="text-[10px] text-emerald-200">
                  AI Knowledge Assistant
                </span>
              </div>

            </div>

            <div className="flex items-center gap-1">

              <button
                type="button"
                onClick={handleResetChat}
                title="Reset conversation"
                aria-label="Reset conversation"
                className="p-2 text-emerald-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimize chatbot"
                aria-label="Close chatbot"
                className="p-2 text-emerald-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

          </div>

          {/* QUICK CATEGORY CHIPS */}

          <div
            data-lenis-prevent="true"
            data-lenis-prevent-touch="true"
            className="bg-slate-50 border-b border-slate-200/80 px-3 py-2 flex items-center gap-1.5 overflow-x-auto shrink-0 overscroll-contain"
            style={{ overscrollBehavior: 'contain' }}
          >

            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Compass className="w-3 h-3 text-emerald-700" />
              Quick:
            </span>

            {QUICK_PROMPTS.slice(0, 5).map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(qp.query)}
                disabled={isLoading}
                className="px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 rounded-full transition-all shrink-0 cursor-pointer whitespace-nowrap disabled:opacity-50"
              >
                {qp.label}
              </button>
            ))}

          </div>

          {/* CHAT MESSAGES */}

          <div
            ref={messagesContainerRef}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            className="flex-1 min-h-0 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-slate-50/50 to-white overscroll-contain"
            style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
          >

            {messages.map(msg => {

              const isBot = msg.sender === 'bot';

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    isBot
                      ? 'items-start'
                      : 'items-end justify-end'
                  }`}
                >

                  {isBot && (
                    <div className="w-7 h-7 rounded-full bg-[#033B32] text-lime-300 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] min-w-0 flex flex-col ${
                      isBot ? 'items-start' : 'items-end'
                    }`}
                  >

                    {/* CATEGORY BADGE */}

                    {isBot && msg.category && (
                      <div className="mb-1 flex items-center gap-1.5">

                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md flex items-center gap-1">

                          <Tag className="w-2.5 h-2.5" />

                          {msg.category}

                        </span>

                      </div>
                    )}

                    {/* MESSAGE BUBBLE */}

                    <div
                      className={`p-3.5 rounded-2xl text-[13px] shadow-xs break-words w-full ${
                        isBot
                          ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm'
                          : 'bg-gradient-to-br from-[#022620] to-[#033B32] text-white rounded-tr-sm shadow-md'
                      }`}
                    >
                      {isBot
                        ? renderFormattedText(msg.text)
                        : msg.text}
                    </div>

                    {/* FEE LEAD CAPTURE */}

                    {isBot && msg.isFeeQuery && (
                      <FeeLeadCaptureCard
                        defaultCourse={
                          msg.text?.includes('Python')
                            ? 'Python Full Stack Development'
                            : msg.text?.includes('Java')
                            ? 'Java Full Stack Development'
                            : msg.text?.includes('UI/UX')
                            ? 'UI/UX Design'
                            : msg.text?.includes('Marketing')
                            ? 'Digital Marketing & Growth'
                            : msg.text?.includes('Data')
                            ? 'Data Analytics & AI'
                            : 'MERN Stack Development'
                        }
                      />
                    )}

                    {/* SUGGESTED ACTIONS */}

                    {isBot &&
                      Array.isArray(msg.suggestedActions) &&
                      msg.suggestedActions.length > 0 && (

                        <div className="mt-2.5 flex flex-wrap gap-1.5">

                          {msg.suggestedActions.map((act, actIdx) => (

                            <button
                              key={actIdx}
                              type="button"
                              onClick={() => handleActionClick(act)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 hover:border-emerald-300 transition-all cursor-pointer shadow-2xs"
                            >

                              {act.action === 'whatsapp' && (
                                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                              )}

                              {act.action === 'call' && (
                                <Phone className="w-3.5 h-3.5 text-blue-600" />
                              )}

                              {act.action === 'enroll_modal' && (
                                <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                              )}

                              {act.action === 'route' && (
                                <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                              )}

                              <span>{act.label}</span>

                            </button>

                          ))}

                        </div>
                      )}

                    {/* RELATED QUESTIONS */}

                    {isBot &&
                      Array.isArray(msg.relatedQuestions) &&
                      msg.relatedQuestions.length > 0 && (

                        <div className="mt-3 p-2.5 rounded-xl bg-slate-100/80 border border-slate-200/60 w-full">

                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5 flex items-center gap-1">

                            <HelpCircle className="w-3 h-3 text-emerald-700" />

                            Related Questions:

                          </span>

                          <div className="space-y-1">

                            {msg.relatedQuestions.map(rq => (

                              <button
                                key={rq.id}
                                type="button"
                                onClick={() => handleSendMessage(rq.question)}
                                disabled={isLoading}
                                className="w-full text-left text-xs font-semibold text-emerald-800 hover:text-emerald-950 hover:bg-white px-2 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer disabled:opacity-50"
                              >

                                <span className="line-clamp-1">
                                  {rq.question}
                                </span>

                                <ArrowRight className="w-3 h-3 text-emerald-600 shrink-0 ml-1" />

                              </button>

                            ))}

                          </div>

                        </div>
                      )}

                    {/* TIMESTAMP */}

                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>

                  </div>

                  {!isBot && (
                    <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mb-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}

                </div>
              );
            })}

            {/* TYPING INDICATOR */}

            {isLoading && (

              <div className="flex items-center gap-2 text-slate-500 text-xs">

                <div className="w-7 h-7 rounded-full bg-[#033B32] text-lime-300 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>

                <div className="px-3 py-2 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1.5">

                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" />

                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />

                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />

                  <span className="text-[11px] font-medium text-slate-500 ml-1">
                    Searching knowledge base...
                  </span>

                </div>

              </div>
            )}

            <div ref={messagesEndRef} />

          </div>

          {/* AUTOCOMPLETE SUGGESTIONS */}

          {showSuggestions && suggestions.length > 0 && (

            <div
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              className="border-t border-slate-200 bg-white/95 backdrop-blur-md px-3 py-2 max-h-36 overflow-y-auto space-y-1 shadow-lg shrink-0 overscroll-contain"
              style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
            >

              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                Suggested Questions:
              </span>

              {suggestions.map(item => (

                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSendMessage(item.question)}
                  disabled={isLoading}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-800 hover:text-emerald-900 hover:bg-emerald-50 transition-colors flex items-center justify-between cursor-pointer disabled:opacity-50"
                >

                  <span className="line-clamp-1">
                    {item.question}
                  </span>

                  <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                    {item.category}
                  </span>

                </button>

              ))}

            </div>
          )}

          {/* INPUT BAR */}

          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >

            <input
              ref={inputRef}
              type="text"
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
              placeholder="Ask about courses, fees, placements, branches..."
              className="flex-1 min-w-0 bg-slate-100 border border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-900 placeholder:text-slate-400 px-3.5 py-2.5 rounded-xl text-xs outline-none transition-all shadow-inner"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className={`p-2.5 rounded-xl font-bold transition-all flex items-center justify-center cursor-pointer ${
                inputQuery.trim() && !isLoading
                  ? 'bg-[#033B32] hover:bg-[#022620] text-lime-400 shadow-md hover:scale-105 active:scale-95'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
              title="Send question"
            >

              <Send className="w-4 h-4" />

            </button>

          </form>

          {/* FOOTER */}

          <div className="bg-slate-50 py-1.5 px-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 shrink-0">

            <span>
              Powered by XentroX Knowledge Engine
            </span>

            <span className="font-mono text-emerald-700 font-bold">
              LEARN • BUILD • GROW
            </span>

          </div>

        </div>
      )}

    </>
  );
}
