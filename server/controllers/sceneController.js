const Scene = require('../models/Scene');
const fsp = require('fs').promises;
const path = require('path');

const sceneController = {};

const UPLOADS_DIRECTORY = path.join(__dirname, '../../uploads');

sceneController.getScenes = async (req, res, next) => {
  const { username } = req.query;
  try {
    if (!username) {
      throw new Error('Missing `username` query param in request');
    }
    // Don't send the string (huge string) back to the client
    const scenes = await Scene.find({ author: req.query.username }, '-image');
    res.locals.scenes = scenes;
    return next();
  } catch (err) {
    next(err);
  }
};

sceneController.getSceneById = async (req, res, next) => {
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

    console.log('saving the image to a temporary file....');

    const filepath = path.join(UPLOADS_DIRECTORY, `/${sceneId}.png`);
    await fsp.writeFile(filepath, image, { encoding: 'base64' });

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
      console.log(`Updated scene ${sceneId}`);
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
      console.log(`Saved a new scene ${sceneId}`);
      return next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = sceneController;
