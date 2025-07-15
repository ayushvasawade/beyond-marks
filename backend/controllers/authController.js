import { admin, db } from '../config/firebase.js';

// Function to save user data to Firestore
async function saveUserToFirestore(user, additionalData = {}) {
  try {
    const userRef = db.collection('users').doc(user.uid);
    const userData = {
      email: user.email,
      name: additionalData.name || user.displayName || "",
      username: additionalData.username || user.displayName || "",
      role: "student",
      createdAt: new Date(),
      xp: 0,
      level: 1,
      completedModules: 0,
      totalModules: 5,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      preferences: {
        theme: "dark",
        language: "English"
      },
      ...additionalData
    };
    await userRef.set(userData, { merge: true });
    return userData;
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
    throw error;
  }
}

// Sample signup POST body:
// {
//   "email": "test@example.com",
//   "password": "password123",
//   "name": "John Doe",
//   "username": "johndoe"
// }
export const signup = async (req, res) => {
  const { email, password, name, username } = req.body;
  try {
    const userRecord = await admin.auth().createUser({ 
      email, 
      password,
      displayName: username || name
    });
    
    // Save user data to Firestore
    await saveUserToFirestore(userRecord, { name, username });
    
    res.status(201).json({ 
      message: 'User created successfully', 
      uid: userRecord.uid 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = (req, res) => {
  // Login handled on frontend with Firebase SDK
  res.json({ message: 'Login handled on frontend. Use Firebase client SDK.' });
}; 