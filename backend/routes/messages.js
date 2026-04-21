const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { getMessages } = require('../controllers/messageController');

router.get('/', authenticate, getMessages);  // Only logged-in users can access

module.exports = router;