const express = require('express');
const router = express.Router();
const { submitContactForm, getMessages, deleteMessage } = require('../controllers/contactController');
const { authenticate } = require('../middleware/authMiddleware');

// Public route
router.post('/', submitContactForm);

// Admin only routes
router.get('/', authenticate, getMessages);
router.delete('/:id', authenticate, deleteMessage);

module.exports = router;