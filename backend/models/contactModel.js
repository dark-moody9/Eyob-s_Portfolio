const pool = require('../config/db');

const saveContact = async ({ fullName, email, phone, subject, message }) => {
  const result = await pool.query(
    `INSERT INTO contacts (full_name, email, phone, subject, message) 
     VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [fullName, email, phone, subject, message]
  );
  return result.rows[0];
};

const getAllContacts = async () => {
  const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
  return result.rows;
};

const deleteContact = async (id) => {
  const result = await pool.query('DELETE FROM contacts WHERE id = $1 RETURNING id', [id]);
  return result.rows[0];
};

module.exports = { saveContact, getAllContacts, deleteContact };