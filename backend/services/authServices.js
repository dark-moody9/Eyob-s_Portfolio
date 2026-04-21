const jwt = require('jsonwebtoken');
const { findUserByEmail, validatePassword, createUser } = require('../models/userModel');
require('dotenv').config();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const registerUser = async (email, password) => {
  const existing = await findUserByEmail(email);
  if (existing) throw new Error('User already exists');
  return await createUser(email, password);
};

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const isValid = await validatePassword(user, password);
  if (!isValid) return null;
  return {
    id: user.id,
    email: user.email,
    token: generateToken(user.id),
  };
};

module.exports = { registerUser, loginUser, generateToken };