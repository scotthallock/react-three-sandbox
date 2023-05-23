const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  cookieId: { type: String, required: true, unique: true },
  createAt: { type: Date, expires: 300, default: Date.now },
});

module.exports = mongoose.model('Session', sessionSchema);
