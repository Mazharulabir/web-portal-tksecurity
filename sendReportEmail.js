// sendReportEmail.js
// Node.js script to send daily report emails using nodemailer

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// TODO: Replace with your real email and app password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_EMAIL@gmail.com',
    pass: 'YOUR_APP_PASSWORD',
  },
});

// Helper to load report data (mocked for now)
function getReportData() {
  // In production, load from DB or file
  return {
    date: new Date().toLocaleDateString(),
    timecard: 'Sample timecard data',
    activity: 'Sample daily activity report',
  };
}

function sendDailyReport() {
  const report = getReportData();
  const mailOptions = {
    from: 'YOUR_EMAIL@gmail.com',
    to: 'mazharulabir241@gmail.com',
    subject: `Daily Report for ${report.date}`,
    text: `Time Card:\n${report.timecard}\n\nActivity Report:\n${report.activity}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error sending email:', error);
    }
    console.log('Email sent:', info.response);
  });
}

// Run the script	sendDailyReport();
