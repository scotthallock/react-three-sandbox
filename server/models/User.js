const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unqiue: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  const { password } = this;
  const hashedPassword = await bcrypt.hash(password, 10);
  this.password = hashedPassword;
  next();
});

module.exports = mongoose.model('User', userSchema);
