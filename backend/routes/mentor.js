import express from 'express';
import { 
  sendMessage, 
  getChatHistory, 
  updateMood,
  getMentorSuggestions
} from '../controllers/mentorController.js';

const router = express.Router();

// Chat routes
router.post('/chat', sendMessage);
router.get('/chat', getChatHistory);
router.post('/mood', updateMood);
router.get('/suggestions', getMentorSuggestions);

export default router; 