const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // New email field
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  emailVerified: {type:Boolean, required:true, default:false},
  aadhaarVerifeid: {type:Boolean, required:true, default:false},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
