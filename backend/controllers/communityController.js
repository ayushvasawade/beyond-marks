import { admin, db } from '../config/firebase.js';

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

// Create a new doubt
export const createDoubt = async (req, res) => {
  try {
    await verifyToken(req, res, async () => {
      const { title, body, tags, screenshot } = req.body;
      const { uid } = req.user;

      if (!title || !body) {
        return res.status(400).json({ error: 'Title and body are required' });
      }

      // Fetch user info for author
      const userDoc = await db.collection('users').doc(uid).get();
      const userData = userDoc.exists ? userDoc.data() : {};
      
      // Better fallback logic
      const name = userData.name || userData.username || userData.email || 'Anonymous';
      const username = userData.username || userData.name || userData.email || 'user';

      const doubtRef = db.collection('doubts').doc();
      const doubtData = {
        uid,
        title,
        body,
        tags: tags || [],
        screenshot: screenshot || null,
        created_at: new Date().toISOString(),
        resolved: false,
        replies: [],
        reactions: {
          thanks: 0,
          helpful: 0,
          same_doubt: 0
        },
        author: {
          uid,
          name: name,
          username: username
        }
      };
      await doubtRef.set(doubtData);
      res.status(201).json({ 
        message: 'Doubt created successfully', 
        doubtId: doubtRef.id,
        doubt: { ...doubtData, id: doubtRef.id }
      });
    });
  } catch (error) {
    console.error('Error creating doubt:', error);
    res.status(500).json({ error: 'Failed to create doubt' });
  }
};

// Get all doubts with optional filtering
export const getDoubts = async (req, res) => {
  try {
    await verifyToken(req, res, async () => {
      const { filter, tag } = req.query;
      let query = db.collection('doubts');
      if (filter === 'unresolved') {
        query = query.where('resolved', '==', false);
      }
      if (tag) {
        query = query.where('tags', 'array-contains', tag);
      }
      const snapshot = await query.orderBy('created_at', 'desc').get();
      const doubts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json({ doubts });
    });
  } catch (error) {
    console.error('Error fetching doubts:', error);
    res.status(500).json({ error: 'Failed to fetch doubts' });
  }
};

// Reply to a doubt
export const replyToDoubt = async (req, res) => {
  try {
    await verifyToken(req, res, async () => {
      const { doubtId } = req.params;
      const { message } = req.body;
      const { uid } = req.user;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }
      
      // Fetch user info for reply
      const userDoc = await db.collection('users').doc(uid).get();
      const userData = userDoc.exists ? userDoc.data() : {};
      const name = userData.name || userData.username || userData.email || 'Anonymous';
      const username = userData.username || userData.name || userData.email || 'user';
      
      const replyData = {
        uid,
        message,
        created_at: new Date().toISOString(),
        author: {
          uid,
          name: name,
          username: username
        },
        reactions: {
          thanks: 0,
          helpful: 0
        }
      };
      const doubtRef = db.collection('doubts').doc(doubtId);
      await doubtRef.update({
        replies: admin.firestore.FieldValue.arrayUnion(replyData)
      });
      // Increment total_replies_helped for the user
      const userRef = db.collection('users').doc(uid);
      await userRef.set({
        total_replies_helped: admin.firestore.FieldValue.increment(1)
      }, { merge: true });
      res.json({ message: 'Reply added successfully', reply: replyData });
    });
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ error: 'Failed to add reply' });
  }
};

// React to a reply (simplified: just acknowledge for now)
export const reactToReply = async (req, res) => {
  try {
    await verifyToken(req, res, async () => {
      const { replyId } = req.params;
      const { reactionType } = req.body;
      if (!['thanks', 'helpful', 'same_doubt'].includes(reactionType)) {
        return res.status(400).json({ error: 'Invalid reaction type' });
      }
      // TODO: Implement reaction update logic in Firestore
      res.json({ message: 'Reaction added successfully', reactionType });
    });
  } catch (error) {
    console.error('Error adding reaction:', error);
    res.status(500).json({ error: 'Failed to add reaction' });
  }
};

// Connect with another user
export const connectWithUser = async (req, res) => {
  try {
    await verifyToken(req, res, async () => {
      const { userId } = req.params;
      const { uid } = req.user;
      if (uid === userId) {
        return res.status(400).json({ error: 'Cannot connect with yourself' });
      }
      // Add userId to current user's connections
      const userRef = db.collection('users').doc(uid);
      await userRef.set({
        connections: admin.firestore.FieldValue.arrayUnion(userId)
      }, { merge: true });
      res.json({ message: 'Connection established successfully', connectedUserId: userId });
    });
  } catch (error) {
    console.error('Error connecting users:', error);
    res.status(500).json({ error: 'Failed to establish connection' });
  }
};

// Get user's connections
export const getConnections = async (req, res) => {
  try {
    await verifyToken(req, res, async () => {
      const { uid } = req.user;
      const userDoc = await db.collection('users').doc(uid).get();
      const userData = userDoc.exists ? userDoc.data() : {};
      const connectionIds = userData.connections || [];
      if (!connectionIds.length) return res.json({ connections: [] });
      const connectionsSnap = await db.collection('users').where(admin.firestore.FieldPath.documentId(), 'in', connectionIds).get();
      const connections = connectionsSnap.docs.map(doc => ({
        uid: doc.id,
        name: doc.data().name,
        username: doc.data().username,
        total_replies_helped: doc.data().total_replies_helped || 0
      }));
      res.json({ connections });
    });
  } catch (error) {
    console.error('Error fetching connections:', error);
    res.status(500).json({ error: 'Failed to fetch connections' });
  }
};

// Mark doubt as resolved
export const markDoubtResolved = async (req, res) => {
  try {
    await verifyToken(req, res, async () => {
      const { doubtId } = req.params;
      const { uid } = req.user;
      const doubtRef = db.collection('doubts').doc(doubtId);
      await doubtRef.update({ resolved: true });
      res.json({ message: 'Doubt marked as resolved successfully', doubtId });
    });
  } catch (error) {
    console.error('Error marking doubt resolved:', error);
    res.status(500).json({ error: 'Failed to mark doubt as resolved' });
  }
}; 

// Get unanswered doubts (doubts with no replies)
export const getUnansweredDoubts = async (req, res) => {
  try {
    await verifyToken(req, res, async () => {
      const snapshot = await db.collection('doubts').where('replies', '==', []).get();
      const doubts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json({ doubts });
    });
  } catch (error) {
    console.error('Error fetching unanswered doubts:', error);
    res.status(500).json({ error: 'Failed to fetch unanswered doubts' });
  }
}; 

// Get top contributors
export const getTopContributors = async (req, res) => {
  try {
    const usersSnap = await db.collection('users').orderBy('total_replies_helped', 'desc').limit(10).get();
    const users = usersSnap.docs.map(doc => ({
      uid: doc.id,
      name: doc.data().name,
      username: doc.data().username,
      total_replies_helped: doc.data().total_replies_helped || 0
    }));
    res.json({ topContributors: users });
  } catch (error) {
    console.error('Error fetching top contributors:', error);
    res.status(500).json({ error: 'Failed to fetch top contributors' });
  }
}; 