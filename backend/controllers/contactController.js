const { sendContactEmail } = require('../services/emailServices');
const { saveContact, getAllContacts, deleteContact } = require('../models/contactModel');

const submitContactForm = async (req, res) => {
  const { fullName, email, phone, subject, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: 'Full name, email, and message are required.' });
  }

  try {
    // Save to database
   // const saved = await saveContact({ fullName, email, phone, subject, message });
    // Send email notifications
    await sendContactEmail({ fullName, email, phone, subject, message });
    res.status(200).json({ success: true, message: 'Message sent and saved', id: saved.id });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to process your message. Please try again later.' });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await getAllContacts();
    res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteContact(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
};

module.exports = { submitContactForm, getMessages, deleteMessage };