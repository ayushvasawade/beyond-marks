import { admin, db } from '../config/firebase.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Middleware to verify Firebase token
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Initialize Gemini AI
const initializeGemini = () => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key not found');
  }
  return new GoogleGenerativeAI(apiKey);
};

// Send message to AI mentor
export const sendMessage = async (req, res) => {
  try {
    await verifyToken(req, res, async () => {
      const { message, mood } = req.body;
      const { uid } = req.user;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Fetch user profile from Firestore
      const userDoc = await db.collection('users').doc(uid).get();
      const userData = userDoc.exists ? userDoc.data() : { name: 'Student', xp: 0, level: 1, completedModules: 0, last_mood: 'neutral' };

      // Fetch recent chat history from Firestore (last 10 messages)
      const chatSnap = await db.collection('users').doc(uid).collection('mentorChat').orderBy('timestamp', 'desc').limit(10).get();
      const recentMessages = chatSnap.docs.map(doc => doc.data()).reverse();

      // Prepare context for AI
      const userContext = {
        name: userData?.name || 'Student',
        xp: userData?.xp || 0,
        level: userData?.level || 1,
        completedModules: userData?.completedModules || 0,
        lastMood: userData?.last_mood || 'neutral',
        currentMood: mood || 'neutral'
      };

      // Create improved AI prompt
      const prompt = createMentorPrompt(userContext, recentMessages, message);

      try {
        const gemini = initializeGemini();
        const model = gemini.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const aiResponse = result.response.text();

        // Save user message and AI response to Firestore
        const userMessageRef = db.collection('users').doc(uid).collection('mentorChat').doc();
        const aiMessageRef = db.collection('users').doc(uid).collection('mentorChat').doc();
        const now = new Date().toISOString();
        await userMessageRef.set({
          id: userMessageRef.id,
          role: 'user',
          message,
          timestamp: now,
          mood: mood || 'neutral'
        });
        await aiMessageRef.set({
          id: aiMessageRef.id,
          role: 'ai',
          message: aiResponse,
          timestamp: new Date().toISOString()
        });

        res.json({
          message: 'Message sent successfully',
          aiResponse,
          userMessageId: userMessageRef.id,
          aiMessageId: aiMessageRef.id
        });
      } catch (aiError) {
        console.error('AI Error:', aiError);
        res.status(500).json({ error: 'AI mentor is currently unavailable.' });
      }
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// Get chat history
export const getChatHistory = async (req, res) => {
  try {
    await verifyToken(req, res, async () => {
      const { uid } = req.user;
      const { limit = 50 } = req.query;
      const chatSnap = await db.collection('users').doc(uid).collection('mentorChat').orderBy('timestamp', 'desc').limit(Number(limit)).get();
      const messages = chatSnap.docs.map(doc => doc.data()).reverse();
      res.json({ messages });
    });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
};

// Update user mood
export const updateMood = async (req, res) => {
  try {
    await verifyToken(req, res, async () => {
      const { mood } = req.body;
      const { uid } = req.user;
      if (!mood || !['happy', 'neutral', 'frustrated', 'confused', 'excited'].includes(mood)) {
        return res.status(400).json({ error: 'Valid mood is required' });
      }
      await db.collection('users').doc(uid).set({ last_mood: mood }, { merge: true });
      res.json({ message: 'Mood updated successfully', mood });
    });
  } catch (error) {
    console.error('Error updating mood:', error);
    res.status(500).json({ error: 'Failed to update mood' });
  }
};

// Get personalized suggestions
export const getMentorSuggestions = async (req, res) => {
  try {
    await verifyToken(req, res, async () => {
      const { uid } = req.user;
      const userDoc = await db.collection('users').doc(uid).get();
      const userData = userDoc.exists ? userDoc.data() : {};
      const suggestions = generatePersonalizedSuggestions(userData);
      res.json({ suggestions });
    });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
};

// Helper function to create mentor prompt (improved)
const createMentorPrompt = (userContext, recentMessages, currentMessage) => {
  const context = `
You are a supportive, patient AI mentor for a learning platform called BeyondMarks. 

Student Profile:
- Name: ${userContext.name}
- XP Level: ${userContext.level} (${userContext.xp} XP)
- Completed Modules: ${userContext.completedModules}
- Current Mood: ${userContext.currentMood}
- Previous Mood: ${userContext.lastMood}

Recent Conversation Context:
${recentMessages.map(msg => `${msg.role}: ${msg.message}`).join('\n')}

Current Message: ${currentMessage}

When answering, always:
1. First, explain the underlying theory or concept related to the student's question in simple, clear terms, using analogies or examples if helpful.
2. Then, provide a step-by-step solution or suggestion.
3. Use a warm, supportive, and educational tone.
4. Keep responses under 200 words.
5. Encourage the student to ask follow-up questions if they need more help.
`;
  return context;
};

// Helper function to generate fallback responses
const generateFallbackResponse = (userContext, message) => {
  const fallbackResponses = [
    `Hey ${userContext.name}! I can see you're working hard on your learning journey. ${message.includes('?') ? 'That\'s a great question!' : 'I\'m here to help!'} Let\'s tackle this together. What specific part are you finding challenging?`,
    
    `I understand how you feel, ${userContext.name}. Learning can be tough sometimes, but you\'re making great progress at level ${userContext.level}! Can you tell me more about what\'s on your mind?`,
    
    `Thanks for reaching out, ${userContext.name}! I\'m here to support you. ${message.includes('stuck') || message.includes('confused') ? 'It\'s totally normal to feel stuck sometimes.' : ''} What would be most helpful for you right now?`,
    
    `You\'re doing amazing, ${userContext.name}! With ${userContext.xp} XP, you\'ve come a long way. ${message.includes('help') ? 'I\'d love to help you with that!' : 'How can I support you today?'}`
  ];

  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
};

// Helper function to generate personalized suggestions
const generatePersonalizedSuggestions = (userData) => {
  const suggestions = [];

  if (userData?.xp < 100) {
    suggestions.push({
      type: 'encouragement',
      title: 'You\'re just getting started!',
      message: 'Every expert was once a beginner. Take it one step at a time.',
      icon: '🌟'
    });
  }

  if (userData?.last_mood === 'frustrated') {
    suggestions.push({
      type: 'support',
      title: 'Feeling stuck?',
      message: 'Try taking a short break, then come back with fresh eyes.',
      icon: '☕'
    });
  }

  if (userData?.completedModules > 0) {
    suggestions.push({
      type: 'celebration',
      title: 'Great progress!',
      message: `You've completed ${userData.completedModules} modules. Keep going!`,
      icon: '🎉'
    });
  }

  suggestions.push({
    type: 'general',
    title: 'Need help?',
    message: 'Ask me anything about your learning journey!',
    icon: '💬'
  });

  return suggestions;
}; 