const { registerUser, loginUser } = require('../services/authServices');

const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }
  try {
    const newUser = await registerUser(email, password);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (error) {
    if (error.message === 'User already exists') {
      return res.status(409).json({ error: 'Email already registered.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  try {
    const result = await loginUser(email, password);
    if (!result) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    res.json({
      success: true,
      message: 'Login successful',
      token: result.token,
      user: { id: result.id, email: result.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = { register, login };