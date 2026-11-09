const express = require('express');
const router = express.Router();
const {
  getQuestions,
  askQuestion,
  logUserQuestion,
  getUserQuestions,
  clearUserQuestions,
  addNewFaq
} = require('../controllers/chatbotController');

// Public chatbot routes
router.get('/questions', getQuestions);
router.post('/ask', askQuestion);
router.post('/log-question', logUserQuestion);
router.get('/user-questions', getUserQuestions);

// Management routes
router.post('/questions', addNewFaq);
router.delete('/user-questions', clearUserQuestions);

module.exports = router;
