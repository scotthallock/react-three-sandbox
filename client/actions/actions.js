/**
 * Here are the functions that make HTTP requests to the server.
 */

export const sayHello = async () => {
  console.log('HERE');
  try {
    const response = await fetch('/api/hello');
    const data = await response.json();
    console.log('sayhello');
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

// The scene is defined by 4 pieces of state: sceneId, scene, lights, models
export const saveScene = async ({ sceneId, sceneName, username, scene, lights, models }) => {
  try {
    const canvas = document.querySelector('canvas');
    console.log('SNAPSHOT: ', canvas.offsetWidth, canvas.offsetHeight);
    const pngData = canvas.toDataURL('image/png');
    const base64Data = pngData.replace(/^data:image\/png;base64,/, '');

    const response = await fetch('/api/scene', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sceneId,
        sceneName,
        username,
        scene,
        lights,
        models,
        image: base64Data,
      }),
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
    return data;
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
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getScenesByUser = async (username) => {
  try {
    const response = await fetch(`/api/scene/?username=${username}`);
    const data = await response.json();
    console.log('### SCENES FROM USER ###');
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const signup = async ({ username, email, password }) => {
  try {
    const response = await fetch(`api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password: btoa(password),
      }),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export const login = async ({ usernameOrEmail, password }) => {
  try {
    const response = await fetch(`api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usernameOrEmail,
        password: btoa(password),
      }),
    });
    return await response.json();
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
