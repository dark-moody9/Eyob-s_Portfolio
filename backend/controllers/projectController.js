const { createProject, getAllProjects, updateProject, deleteProject } = require('../models/projectModel');

const addProject = async (req, res) => {
  const { title, description, image_url, live_url, repo_url } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }
  try {
    const project = await createProject({ title, description, image_url, live_url, repo_url });
    res.status(201).json({ success: true, project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add project' });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

const updateProjectById = async (req, res) => {
  const { id } = req.params;
  const { title, description, image_url, live_url, repo_url } = req.body;
  try {
    const updated = await updateProject(id, { title, description, image_url, live_url, repo_url });
    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ success: true, project: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update project' });
  }
};

const deleteProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteProject(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

module.exports = { addProject, getProjects, updateProjectById, deleteProjectById };