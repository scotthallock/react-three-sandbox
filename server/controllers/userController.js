const User = require('../models/User');
const bcrypt = require('bcrypt');

const userController = {};

// Sign up a user
userController.createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      throw new Error('Must include username, email, and password');
    }
    if (await User.findOne({ username })) throw new Error('username is already taken');
    if (await User.findOne({ email })) throw new Error('email is already taken');

    const newUser = await User.create({ username, email, password: atob(password) });
    res.locals.userId = newUser._id;
    res.locals.username = newUser.username;
    next();
  } catch (err) {
    next(err);
  }
};

// Log a user in
userController.verifyUser = async (req, res, next) => {
  const { usernameOrEmail, password } = req.body;
  try {
    if (!usernameOrEmail || !password) {
      throw new Error('Request is missing one of the following fields: usernameOrEmail, password');
    }

    let foundUser;
    foundUser =
      (await User.findOne({ username: usernameOrEmail })) ||
      (await User.findOne({ email: usernameOrEmail }));

    if (!foundUser) throw new Error('User not found');

    if (await bcrypt.compare(atob(password), foundUser.password)) {
      res.locals.userId = foundUser._id;
      res.locals.username = foundUser.username;
      return next();
    } else {
      throw new Error('Password is not a match');
    }
  } catch (err) {
    next(err);
  }
};

// Save a scene to a user's account
userController.addScene = async (req, res, next) => {};

module.exports = userController;
