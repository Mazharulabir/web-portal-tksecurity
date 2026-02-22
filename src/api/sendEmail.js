// src/api/sendEmail.js
// Simple Node.js Express API endpoint to send emails from the frontend

import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// TODO: Replace with your real email and app password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
  user: 'mazharulabir241@gmail.com',
  pass: 'rfpu obfn egmq svtt',
},
});

app.post('/send-activity-report', async (req, res) => {
  const { dateTime, companyArea, report } = req.body;
  const mailOptions = {
    from: 'mazharulabir241@gmail.com',
    to: 'mazharulabir241@gmail.com',
    subject: `New Daily Activity Report (${dateTime})`,
    text: `Location: ${companyArea}\nDate & Time: ${dateTime}\n\nReport:\n${report}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => console.log(`Email API running on port ${PORT}`));
