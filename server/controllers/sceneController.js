const Scene = require('../models/Scene');
// const fsp = require('fs').promises;
// const path = require('path');

const sceneController = {};

sceneController.getAllScenes = async (req, res) => {
  console.log('get all scenes');
  try {
    const allScenes = await Scene.find({});
    return res.json(allScenes);
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(400).json({ err: { message: err.message } });
  }
};

sceneController.saveScene = async (req, res) => {
  console.log('save scene');
  try {
    const { sceneId, scene, lights, models, image } = req.body;
    if (!sceneId || !scene || !lights || !models || !image) {
      throw new Error(
        'Request body is missing one of the following properties: sceneId, scene, lights, model, image'
      );
    }

    const savedScene = await Scene.findOne({ sceneId });

    // console.log('saving the image to a temporary file....');
    // await fsp.writeFile(path.join(__dirname, '../../files/image.txt'), image);

    if (savedScene) {
      // Update the saved scene
      savedScene.scene = scene;
      savedScene.lights = lights;
      savedScene.models = models;
      savedScene.image = image;
      savedScene.createdAt = Date.now();
      await savedScene.save();
      return res.status(201).json({ message: 'successfully updated scene', scene: savedScene });
    } else {
      // Save a new scene
      const newScene = await Scene.create({ sceneId, scene, lights, models });
      return res.status(200).json({ message: 'successfully saved new scene', scene: newScene });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ err: { message: err.message } });
  }
};

module.exports = sceneController;
