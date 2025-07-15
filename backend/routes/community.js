import express from 'express';
import { 
  createDoubt, 
  getDoubts, 
  replyToDoubt, 
  reactToReply,
  connectWithUser,
  getConnections,
  markDoubtResolved,
  getUnansweredDoubts,
  getTopContributors
} from '../controllers/communityController.js';

const router = express.Router();

// Doubt routes
router.post('/doubts', createDoubt);
router.get('/doubts', getDoubts);
router.get('/doubts/unanswered', getUnansweredDoubts);
router.post('/doubts/:doubtId/replies', replyToDoubt);
router.post('/doubts/:doubtId/resolve', markDoubtResolved);

// Reply reactions
router.post('/replies/:replyId/react', reactToReply);

// User connections
router.post('/connect/:userId', connectWithUser);
router.get('/connections', getConnections);
router.get('/top-contributors', getTopContributors);

export default router; 