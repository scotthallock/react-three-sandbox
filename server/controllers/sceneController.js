const Scene = require('../models/Scene');
// const fsp = require('fs').promises;
// const path = require('path');

const sceneController = {};

sceneController.getScenes = async (req, res, next) => {
  const { username } = req.query;
  try {
    if (!username) {
      throw new Error('Missing `username` query param in request');
    }
    const scenes = await Scene.find({ author: req.query.username });
    res.locals.scenes = scenes;
    return next();
  } catch (err) {
    next(err);
  }
};

sceneController.getSceneById = async (req, res, next) => {
  console.log('get scene by id');
  try {
    const scene = Scene.findOne({ sceneId: req.params.id });
    if (!scene) throw new Error(`Did not find scene with id ${eq.params.id} in database.`);
    res.locals.scene = scene;
    return next();
  } catch (err) {
    next(err);
  }
};

sceneController.saveScene = async (req, res, next) => {
  try {
    const { sceneId, sceneName, username, scene, lights, models, image } = req.body;
    if (!sceneId || !sceneName || !username || !scene || !lights || !models || !image) {
      throw new Error(
        'Request body is missing one of the following properties: sceneId, scene, lights, model, image'
      );
    }

    // console.log('saving the image to a temporary file....');
    // await fsp.writeFile(path.join(__dirname, '../../files/image.txt'), image);

    console.log(sceneId);
    const savedScene = await Scene.findOne({ sceneId });

    if (savedScene) {
      // Update the saved scene
      savedScene.scene = scene;
      savedScene.sceneName = sceneName;
      savedScene.lights = lights;
      savedScene.models = models;
      savedScene.image = image;
      savedScene.updatedAt = Date.now();
      await savedScene.save();
      console.log('UPDATED A SCENE');
      res.locals.sceneId = sceneId;
      return next();
    } else {
      // Save a new scene
      const newScene = await Scene.create({
        sceneId,
        sceneName,
        author: username,
        scene,
        lights,
        models,
      });
      console.log('SAVED A NEW SCENE');
      return next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = sceneController;
