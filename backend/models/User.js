const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  squad: { type: Number, required: true, min: 1, max: 10 },
  batch: { type: Number, required: true, enum: [1, 2] }
});

module.exports = mongoose.model('User', userSchema);
