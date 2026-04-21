const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
    [email, hashedPassword]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const validatePassword = async (user, password) => {
  return await bcrypt.compare(password, user.password_hash);
};

module.exports = { createUser, findUserByEmail, validatePassword };