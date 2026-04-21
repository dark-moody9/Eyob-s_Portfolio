const pool = require('../config/db');

const createProject = async (project) => {
  const { title, description, image_url, live_url, repo_url } = project;
  const result = await pool.query(
    `INSERT INTO projects (title, description, image_url, live_url, repo_url) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [title, description, image_url, live_url, repo_url]
  );
  return result.rows[0];
};

const getAllProjects = async () => {
  const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
  return result.rows;
};

const updateProject = async (id, project) => {
  const { title, description, image_url, live_url, repo_url } = project;
  const result = await pool.query(
    `UPDATE projects SET title=$1, description=$2, image_url=$3, live_url=$4, repo_url=$5 
     WHERE id=$6 RETURNING *`,
    [title, description, image_url, live_url, repo_url, id]
  );
  return result.rows[0];
};

const deleteProject = async (id) => {
  const result = await pool.query('DELETE FROM projects WHERE id=$1 RETURNING id', [id]);
  return result.rows[0];
};

module.exports = { createProject, getAllProjects, updateProject, deleteProject };