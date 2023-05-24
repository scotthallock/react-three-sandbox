require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const sceneController = require('./server/controllers/sceneController');
const userController = require('./server/controllers/userController');

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
app.use(express.static('dist'));
app.get('/', (req, res) => res.sendFile('dist/index.html'));

// Just a test route
app.get('/api/hello', (req, res) => res.json({ greeting: 'hello' }));

// Get all of the user's scenes
app.get('/api/scene', sceneController.getAllScenes);

// Get a particular scene
app.get('/api/scene/:id', sceneController.getSceneById);

// Save a scene
app.post('/api/scene', sceneController.saveScene);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
