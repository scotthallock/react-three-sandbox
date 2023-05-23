/**
 * Here are the functions that make HTTP requests to the server.
 */

export const sayHello = async () => {
  try {
    const response = await fetch('/api/hello');
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

// The scene is defined by 4 pieces of state: sceneId, scene, lights, models
export const saveScene = async ({ sceneId, scene, lights, models }) => {
  try {
    const response = await fetch('/api/scene', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sceneId, scene, lights, models }),
    });

    const data = await response.json();

    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

export const getAllScenes = async () => {
  try {
    const response = await fetch('/api/scene');
    const data = await response.json();
    console.log('### ALL SCENES ###');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

export const getSceneById = async (id) => {
  try {
    const response = await fetch(`/api/scene/${id}`);
    const data = await response.json();
    console.log('### SCENE BY ID ###');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

// For now, get it working with one user
// Then later we can add user authentication
// Where the user data is in a cookie

// GET /api/scene - get a list of all the user's scenes ---> getAllScenes
// GET /api/scene/:id - get a scene with the id -----> getScene
// POST /api/scene - create a new scene -----> saveScene (logic to see if this scene exists)
// PUT /api/scene - update a scene -----> saveScene
// DELETE /api/scene - delete a scene -----> deleteScene

// GET /username/profile
// GET /username/scense
