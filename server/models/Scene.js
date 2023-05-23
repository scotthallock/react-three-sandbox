const mongoose = require('mongoose');

const sceneSchema = new mongoose.Schema({
  sceneId: { type: String, unique: true },
  scene: {},
  lights: {},
  models: {},
  image: String,
});

module.exports = mongoose.model('Scene', sceneSchema);
