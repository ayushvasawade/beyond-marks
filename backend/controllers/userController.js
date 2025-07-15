import { db } from '../config/firebase.js';

// GET /api/user/:uid
export const getUserProfile = async (req, res) => {
  const { uid } = req.params;
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(userDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Sample updateXP POST body:
// {
//   "uid": "userId123",
//   "xp": 100,
//   "level": 2,
//   "completedModules": 1
// }
export const updateXP = async (req, res) => {
  const { uid, xp, level, completedModules } = req.body;
  try {
    const userRef = db.collection('users').doc(uid);
    const updateData = { 
      xp: xp || 0, 
      level: level || 1,
      completedModules: completedModules || 0,
      updatedAt: new Date()
    };
    await userRef.set(updateData, { merge: true });
    res.json({ message: 'XP and level updated', data: updateData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 

// POST /api/user/profile
export const saveUserProfile = async (req, res) => {
  const { uid, name, username, email } = req.body;
  if (!uid || !name || !username || !email) {
    return res.status(400).json({ error: 'uid, name, username, and email are required' });
  }
  try {
    const userRef = db.collection('users').doc(uid);
    // Fetch existing data to preserve fields
    const userDoc = await userRef.get();
    const existing = userDoc.exists ? userDoc.data() : {};
    await userRef.set({
      name,
      username,
      email,
      role: existing.role || "student",
      createdAt: existing.createdAt || new Date(),
      xp: existing.xp || 0,
      level: existing.level || 1,
      completedModules: existing.completedModules || 0,
      totalModules: existing.totalModules || 5,
      joinDate: existing.joinDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      preferences: existing.preferences || { theme: "dark", language: "English" }
    }, { merge: true });
    res.json({ message: 'User profile saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 