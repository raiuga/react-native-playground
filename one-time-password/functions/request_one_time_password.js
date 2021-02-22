const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = (req, res) => {

  // Verify if user provided a phone
  if(!req.body.phone) {
    return res.send(422).send({ error: 'You must provide a phone number.' });
  }

  // Format phone number (sanitize)
  const phone = String(req.body.phone).replace('/[^\d]/g', '');

  // Retrieve user by uid (which is phone number)
  admin.auth().getUser(phone)
    .then(user => {
      const code = Math.floor((Math.random() * 8999 + 1000));

      // Send message
      twilio.messages.create({
        body: `Your code is ${code}`,
        to: phone,
        from: '+19892640821'
      }, (err) => {
        if(err) { return res.send(422).send({ error: err }); }

        admin.database().ref(`users/${phone}`)
          .update({ code, codeValid: true }, () => {
            res.send({ success: true });
          });
      })
    })
    .catch(err => {
      return res.send(422).send({ error: err });
    })

};
