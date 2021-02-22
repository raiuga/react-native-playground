const admin = require('firebase-admin');

module.exports = (req, res) => {
  // Verify if user provided a phone
  if (!req.body.phone) {
    return res.status(422).send({ error: 'Bad Input' });
  }

  // Format phone number (sanitize)
  const phone = String(req.body.phone).replace('/[^\d]/g', '');

  // Create new user account using that phone number
  admin.auth().createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }));
};
