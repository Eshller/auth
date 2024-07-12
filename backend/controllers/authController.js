const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;

  try {
    // Validate input
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: 'Username, password, and email are required.' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Check if user or email already exists
    let user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({
          message: 'Username already exists. Please choose a different one.',
        });
    }

    let existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({
          message: 'Email already exists. Please choose a different one.',
        });
    }

    // Create new user
    user = new User({
      username,
      password,
      email,
      firstName,
      lastName,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create and return JWT token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { register, login };
