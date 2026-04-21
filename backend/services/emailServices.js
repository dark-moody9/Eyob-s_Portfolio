// services/emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Use port 465 with secure: true for a direct SSL connection
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for port 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, // Your 16-char App Password
    },
});

const sendContactEmail = async ({ fullName, email, phone, subject, message }) => {
    // Email to you (the admin)
    const adminMail = {
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.YOUR_EMAIL, // Where you want to receive messages
        subject: subject || `New message from ${fullName}`,
        text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nMessage: ${message}`,
        replyTo: email,
    };
    await transporter.sendMail(adminMail);

    // Optional: Auto-reply to the person who filled out the form
    const autoReply = {
        from: `"Your Name" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Thank you for contacting me!',
        text: `Hi ${fullName},\n\nThanks for your message. I'll get back to you soon.\n\nBest regards,\nYour Name`,
    };
    await transporter.sendMail(autoReply);
};

module.exports = { sendContactEmail };