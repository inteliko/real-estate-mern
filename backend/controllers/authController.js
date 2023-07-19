const authController = require('express').Router();
const userModel = require('../models/user'); // Renamed the variable here
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
authController.post('/register', async (req, res) => {
  try {
    const isExisting = await userModel.findOne({ email: req.body.email });
    if (isExisting) {
      throw new Error('Email already registered');
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const newUser = await userModel.create({ ...req.body, password: hashedPassword });

    const { password, ...others } = newUser._doc;
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '4h',
    });

    return res.status(201).json({ others, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Login
authController.post('/login', async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (!existingUser) {
      throw new Error('Wrong Credentials');
    }

    const comparePass = await bcrypt.compare(req.body.password, existingUser.password);

    if (!comparePass) {
      throw new Error('Wrong Credentials');
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '4h' });
    const { password, ...others } = existingUser._doc;

    return res.status(200).json({ others, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = authController;
