const twilio = require('twilio');

// Twilio account
const { accountSid, authToken } = require('./accounts/twilioAccount.json');

module.exports = new twilio.Twilio(accountSid, authToken);
