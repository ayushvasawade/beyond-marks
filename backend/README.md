# Beyond Marks Backend

## Setup

1. Place your Firebase service account JSON in the backend folder and set the environment variable in `.env`:

```
FIREBASE_SERVICE_ACCOUNT_JSON={...your service account JSON as a string...}
FIREBASE_DATABASE_URL=https://your-project-id.firebaseio.com
PORT=5000
```

2. Install dependencies:
```
npm install
```

3. Start the server:
```
npm start
```

## Firebase Admin SDK Setup

The backend uses Firebase Admin SDK to securely manage user data in Firestore:

- `firebase-admin.js` - Initializes Firebase Admin SDK
- `config/firebase.js` - Legacy config (can be removed)
- User data is automatically saved to Firestore after signup

## Endpoints

### POST /api/auth/signup
Create a new user with email, password, name, and username.
**Sample body:**
```
{
  "email": "test@example.com",
  "password": "password123",
  "name": "John Doe",
  "username": "johndoe"
}
```

### POST /api/auth/login
Returns a message (login handled on frontend).

### GET /api/user/:uid
Fetch user profile (XP, level, badges) from Firestore.

### POST /api/user/xp
Update XP, level, and completed modules for a user.
**Sample body:**
```
{
  "uid": "userId123",
  "xp": 100,
  "level": 2,
  "completedModules": 1
}
```

### GET /api/dashboard
Returns a welcome message.

## Firestore User Data Structure

Users are stored in the `users` collection with the following structure:

```javascript
{
  email: "user@example.com",
  name: "John Doe",
  username: "johndoe",
  role: "student",
  createdAt: Date,
  xp: 0,
  level: 1,
  completedModules: 0,
  totalModules: 5,
  joinDate: "March 2024",
  preferences: {
    theme: "dark",
    language: "English"
  }
}
```

## Security

- Firebase Admin SDK uses service account credentials
- User data is securely stored in Firestore
- Frontend authentication remains unchanged
- Backend provides secure data management 