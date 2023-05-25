const mongoose = require('mongoose');

const sceneSchema = new mongoose.Schema({
  sceneId: { type: String, unique: true },
  scene: {},
  sceneName: String,
  lights: {},
  models: {},
  image: String,
  author: String, // the username
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Scene', sceneSchema);
