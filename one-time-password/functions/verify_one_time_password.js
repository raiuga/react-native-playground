const admin = require('firebase-admin');

module.exports = (req, res) => {
  // Verify if user provided a phone and a code
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: 'Phone and code must be provided' });
  }

  // Format phone number (sanitize)
  const phone = String(req.body.phone).replace('/[^\d]/g', '');
  const code = parseInt(req.body.code);

  // Compare input code with the generated one
  admin.auth().getUser(phone)
    .then(() => {
      const ref = admin.database().ref(`users/${phone}`);
      ref.on('value', snapshot => {
        ref.off();
        const user = snapshot.val();

        if(user.code !== code || !user.codeValid) {
          return res.status(422).send({ error: 'Code not valid' });
        }

        // Mark code as invalid from now on
        ref.update({ codeValid: false });

        // Generate a JWT to be used in requests from now on
        admin.auth().createCustomToken(phone)
          .then(token => res.send({ token }))
          .catch(err => res.status(422).send({ error: err }));
      });
    })
    .catch(err => res.status(422).send({ error: err }));

};
