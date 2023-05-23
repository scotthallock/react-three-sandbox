const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;

// This is just temporary storage before we create a database to store the scenes
// There is a dummy scene
const allScenes = { 12345: { sceneId: 12345, scene: {}, lights: {}, models: {} } };

// Parse json in requests where Content-Type header matches json
app.use(express.json());

// Serve app production bundle
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});

// Test route
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello' });
});

// Get all of the user's scenes
app.get('/api/scene', (req, res) => {
  console.log('GET /api/scene', Date.now());
  res.json(allScenes);
});

// Get a particular scene
app.get('/api/scene/:id', (req, res) => {
  const { id } = req.params;
  console.log('GET /api/scene', Date.now());
  console.log('getting the scene with id:', id);
  res.json(allScenes[id] || { err: { message: `Scene with id ${id} was not found` } });
});

// Save a scene
app.post('/api/scene', (req, res) => {
  console.log('POST /api/scene', Date.now());
  const { sceneId, scene, lights, models } = req.body;
  if (!sceneId || !scene || !lights || !models) {
    return console.error(
      'Request body is missing one of the following properties: sceneId, scene, lights, model'
    );
  }
  allScenes[sceneId] = { scene, lights, models };
  res.status(201).json({ message: 'successfully saved new scene' });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
