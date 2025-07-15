import express from 'express';
import { getUserProfile, updateXP, saveUserProfile } from '../controllers/userController.js';
const router = express.Router();

router.get('/:uid', getUserProfile);
router.post('/xp', updateXP);
router.post('/profile', saveUserProfile);

export default router; 