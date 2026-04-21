const express = require('express');
const router = express.Router();
const { addProject, getProjects, updateProjectById, deleteProjectById } = require('../controllers/projectController');
const { authenticate } = require('../middleware/authMiddleware');

// Public – anyone can view projects
router.get('/', getProjects);

// Admin only – create, update, delete
router.post('/', authenticate, addProject);
router.put('/:id', authenticate, updateProjectById);
router.delete('/:id', authenticate, deleteProjectById);

module.exports = router;