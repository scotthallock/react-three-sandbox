const Scene = require('../models/Scene');

const sceneController = {};

sceneController.getAllScenes = async (req, res) => {
  console.log('get all scenes');
  try {
    const allScenes = await Scene.find({});
    return res.json(allScenes);
  } catch (err) {
    console.err(err);
    res.status(400).json({ err: { message: err.message } });
  }
};

sceneController.getSceneById = async (req, res) => {
  console.log('get scene by id');
  try {
    const scene = Scene.findOne({ sceneId: req.params.id });
    if (!scene) throw new Error(`Did not find scene with id ${eq.params.id} in database.`);
    return res.json(scene);
  } catch (err) {
    console.err(err);
    res.status(400).json({ err: { message: err.message } });
  }
};

sceneController.saveScene = async (req, res) => {
  console.log('save scene');
  try {
    const { sceneId, scene, lights, models } = req.body;
    if (!sceneId || !scene || !lights || !models) {
      throw new Error(
        'Request body is missing one of the following properties: sceneId, scene, lights, model'
      );
    }
    const newScene = await Scene.create({ sceneId, scene, lights, models });
    return res.status(201).json({ message: 'successfully saved new scene', scene: newScene });
  } catch (err) {
    console.err(err);
    res.status(400).json({ err: { message: err.message } });
  }
};

module.exports = sceneController;
