const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // New email field
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
