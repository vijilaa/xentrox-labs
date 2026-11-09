import React, { useState, useEffect } from 'react';
import {
  Bot,
  Search,
  Plus,
  RefreshCw,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  Sparkles,
  HelpCircle,
  Send,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileQuestion,
  Filter
} from 'lucide-react';
import {
  getChatbotUserQuestions,
  clearChatbotUserQuestions,
  getChatbotQuestions,
  addChatbotFaq,
  askChatbotQuestion
} from '../../services/api';
import localQuestions from '../../data/chatbotQuestions.json';

export default function ChatbotManagement() {
  const [userQuestions, setUserQuestions] = useState([]);
  const [faqs, setFaqs] = useState(localQuestions || []);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // all, answered, unanswered, frequent

  // Interactive tester state
  const [testQuery, setTestQuery] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [testLoading, setTestLoading] = useState(false);

  // Add FAQ Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newFaq, setNewFaq] = useState({
    category: 'Courses & Curriculum',
    question: '',
    keywords: '',
    alternateQuestions: '',
    answer: ''
  });
  const [addingFaq, setAddingFaq] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchChatbotData = async () => {
    setLoading(true);
    try {
      const [uqRes, faqRes] = await Promise.all([
        getChatbotUserQuestions().catch(() => ({ data: [] })),
        getChatbotQuestions().catch(() => ({ data: localQuestions }))
      ]);

      if (uqRes && uqRes.data) setUserQuestions(uqRes.data);
      if (faqRes && faqRes.data && faqRes.data.length > 0) setFaqs(faqRes.data);
    } catch (err) {
      console.error('Failed to load chatbot data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatbotData();
  }, []);

  const handleClearLogs = async () => {
    if (!window.confirm('Are you sure you want to clear the user questions log? This cannot be undone.')) {
      return;
    }
    try {
      await clearChatbotUserQuestions();
      setUserQuestions([]);
      setMessage({ type: 'success', text: 'User questions log cleared successfully.' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to clear log.' });
    }
  };

  const handleTestMatch = async (e) => {
    e.preventDefault();
    if (!testQuery.trim() || testLoading) return;

    setTestLoading(true);
    try {
      const res = await askChatbotQuestion(testQuery.trim(), 'admin_tester');
      setTestResult(res);
      fetchChatbotData(); // refresh logs to show tested query
    } catch (err) {
      setTestResult({
        success: false,
        answered: false,
        error: err.message
      });
    } finally {
      setTestLoading(false);
    }
  };

  const handleAddFaqSubmit = async (e) => {
    e.preventDefault();
    if (!newFaq.question.trim() || !newFaq.answer.trim()) return;

    setAddingFaq(true);
    try {
      await addChatbotFaq({
        category: newFaq.category,
        question: newFaq.question.trim(),
        keywords: newFaq.keywords.split(',').map((k) => k.trim()).filter(Boolean),
        alternateQuestions: newFaq.alternateQuestions.split('\n').map((a) => a.trim()).filter(Boolean),
        answer: newFaq.answer.trim()
      });

      setMessage({ type: 'success', text: 'New question added to knowledge base!' });
      setIsAddModalOpen(false);
      setNewFaq({
        category: 'Courses & Curriculum',
        question: '',
        keywords: '',
        alternateQuestions: '',
        answer: ''
      });
      fetchChatbotData();
      setTimeout(() => setMessage(null), 3500);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to add FAQ: ' + err.message });
    } finally {
      setAddingFaq(false);
    }
  };

  // Filter questions
  const filteredQuestions = userQuestions.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.matchedQuestion && item.matchedQuestion.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === 'answered') return item.answered === true;
    if (activeFilter === 'unanswered') return item.answered === false;
    if (activeFilter === 'frequent') return (item.frequency || 1) > 1;
    return true;
  });

  const totalQuestions = userQuestions.length;
  const answeredCount = userQuestions.filter((q) => q.answered === true).length;
  const unansweredCount = userQuestions.filter((q) => q.answered === false).length;
  const answerRate = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 100;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 bg-white dark:bg-slate-900 p-4 xs:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-lime-500 flex items-center justify-center text-white shadow-md shrink-0">
            <Bot className="w-5 h-5 xs:w-6 xs:h-6 text-lime-100" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              Chatbot Knowledge & Logs
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                Live JSON
              </span>
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
              User questions saved to <code className="font-mono text-emerald-700 bg-emerald-50 dark:bg-slate-800 px-1 py-0.5 rounded">userQuestions.json</code> and answers from <code className="font-mono text-emerald-700 bg-emerald-50 dark:bg-slate-800 px-1 py-0.5 rounded">chatbotQuestions.json</code>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={fetchChatbotData}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-bold text-white bg-[#033B32] hover:bg-[#022620] rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-lime-400" />
            <span>Add New FAQ</span>
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Questions In Knowledge Base
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{faqs.length}</span>
            <span className="text-xs font-semibold text-emerald-600">Active FAQs</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Questions Asked By Users
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{totalQuestions}</span>
            <span className="text-xs font-semibold text-lime-600">Logged to JSON</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Answer Success Rate
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-emerald-600">{answerRate}%</span>
            <span className="text-xs font-semibold text-slate-500">
              ({answeredCount} answered)
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Unanswered Queries
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-black text-amber-600">{unansweredCount}</span>
            <span className="text-xs font-semibold text-slate-500">Needs FAQ Review</span>
          </div>
        </div>
      </div>

      {/* Interactive Keyword Matcher Tester */}
      <div className="bg-gradient-to-r from-slate-900 to-[#033B32] text-white p-5 rounded-2xl shadow-lg border border-emerald-800/40">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-lime-400" />
          <h2 className="text-sm font-extrabold tracking-tight">Test Chatbot Keyword Matcher Live</h2>
        </div>
        <p className="text-xs text-emerald-200/80 mb-3">
          Type any prospective student question to test the keyword algorithm and see the matching score and answer.
        </p>

        <form onSubmit={handleTestMatch} className="flex gap-2">
          <input
            type="text"
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            placeholder="e.g. what is the mern course fee or where is the office..."
            className="flex-1 bg-white/10 border border-white/20 focus:border-lime-400 text-white placeholder:text-emerald-200/50 px-3.5 py-2.5 rounded-xl text-xs outline-none"
          />
          <button
            type="submit"
            disabled={!testQuery.trim() || testLoading}
            className="px-4 py-2.5 bg-lime-400 hover:bg-lime-300 text-[#022620] font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {testLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>Test Match</span>
          </button>
        </form>

        {testResult && (
          <div className="mt-4 p-3.5 bg-white/10 rounded-xl border border-white/15 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5">
                Status:{' '}
                {testResult.answered ? (
                  <span className="text-lime-300 font-extrabold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Matched Successfully
                  </span>
                ) : (
                  <span className="text-amber-300 font-bold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Fallback Triggered (No confident match)
                  </span>
                )}
              </span>
              <span className="font-mono text-lime-400 font-bold">
                Confidence: {Math.round((testResult.confidence || 0) * 100)}%
              </span>
            </div>

            {testResult.matchedQuestion && (
              <p className="text-emerald-100">
                <strong>Matched FAQ:</strong> {testResult.matchedQuestion}
              </p>
            )}

            {testResult.matchedKeywords && testResult.matchedKeywords.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-emerald-200">Keywords matched:</span>
                {testResult.matchedKeywords.map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-white/20 text-lime-300 font-mono text-[10px]">
                    {kw}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-2 p-2.5 bg-black/30 rounded-lg text-emerald-100/90 whitespace-pre-line text-[11px] leading-relaxed max-h-40 overflow-y-auto">
              {testResult.answer}
            </div>
          </div>
        )}
      </div>

      {/* Logged User Questions Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Table Filters & Search */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-lime-500 text-[#022620]'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              All ({totalQuestions})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('answered')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeFilter === 'answered'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Answered ({answeredCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('unanswered')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                activeFilter === 'unanswered'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Unanswered ({unansweredCount})
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search user questions..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
              />
            </div>

            {userQuestions.length > 0 && (
              <button
                type="button"
                onClick={handleClearLogs}
                title="Clear question history"
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Table Content */}
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <FileQuestion className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300">No questions logged matching this filter</p>
            <p className="text-xs text-slate-400 mt-1">
              Ask questions through the chatbot widget on the public website to see them appear here!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase tracking-wider font-bold text-[10px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5">User Asked Query</th>
                  <th className="p-3.5">Matched Knowledge Question</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Confidence</th>
                  <th className="p-3.5">Freq</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredQuestions.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white max-w-xs break-words">
                      "{q.query}"
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300 max-w-xs break-words">
                      {q.matchedQuestion || <span className="text-slate-400 italic">No match</span>}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {q.category || 'General'}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono font-bold">
                      {Math.round((q.confidence || 0) * 100)}%
                    </td>
                    <td className="p-3.5 font-mono text-slate-600 dark:text-slate-400">
                      {q.frequency || 1}
                    </td>
                    <td className="p-3.5">
                      {q.answered ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1 w-max">
                          <CheckCircle className="w-3 h-3" /> Answered
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 flex items-center gap-1 w-max">
                          <AlertCircle className="w-3 h-3" /> Missed
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-[11px] text-slate-400 whitespace-nowrap">
                      {new Date(q.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add New FAQ Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 xs:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-1">
              Add New Knowledge Base Question
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              This will be saved to <code className="font-mono text-emerald-700">chatbotQuestions.json</code> and become instantly available to website visitors.
            </p>

            <form onSubmit={handleAddFaqSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={newFaq.category}
                  onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                >
                  <option value="Courses & Curriculum">Courses & Curriculum</option>
                  <option value="Fees & Admissions">Fees & Admissions</option>
                  <option value="Placements & Career Support">Placements & Career Support</option>
                  <option value="Internships & Live Projects">Internships & Live Projects</option>
                  <option value="Locations & Contact">Locations & Contact</option>
                  <option value="Company & Overview">Company & Overview</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Question
                </label>
                <input
                  type="text"
                  required
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                  placeholder="e.g. What is the syllabus for React Native?"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={newFaq.keywords}
                  onChange={(e) => setNewFaq({ ...newFaq, keywords: e.target.value })}
                  placeholder="react native, mobile, ios, android, hybrid"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Professional Answer
                </label>
                <textarea
                  required
                  rows={4}
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                  placeholder="Provide a detailed, professional answer with bullet points..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addingFaq}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#033B32] hover:bg-[#022620] rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {addingFaq ? 'Saving...' : 'Save to Knowledge Base'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
