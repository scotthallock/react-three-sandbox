require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const sceneController = require('./server/controllers/sceneController');
const userController = require('./server/controllers/userController');
const cookieController = require('./server/controllers/cookieController');
const sessionController = require('./server/controllers/sessionController');

const app = express();

const { PORT = 3000, MONGO_URI } = process.env;

if (!MONGO_URI) {
  throw new Error('MONGO_URI environment variable is not defined. Cannot connect to database.');
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ez3d',
  })
  .then(() => console.log('✅ Connected to Mongo DB'))
  .catch((err) => console.log(err));

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());
app.use(express.static('dist'));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// This is just a test route
app.get('/api/hello', (req, res) => {
  console.log('saying hello back to the client');
  res.json({ greeting: 'hello' });
});

app.get('/api/scene', sceneController.getScenes, (req, res) => res.json(res.locals.scenes));

app.get('/api/scene/:id', sceneController.getSceneById, (req, res) => res.json(res.locals.scene));

app.post('/api/scene', sceneController.saveScene, (req, res) =>
  res.status(201).json({ message: 'successfully updated scene', sceneId: res.locals.sceneId })
);

app.post(
  '/api/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) =>
    res.json({
      message: 'successfully logged in',
      username: res.locals.username,
    })
);

app.post(
  '/api/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) =>
    res.json({
      message: 'successfully signed up',
      username: res.locals.username,
    })
);

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));

// Global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ err: { message: err.message } });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
