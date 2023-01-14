var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res, next) => {
  let { body } = req;

  let name = body.name;
  let email = body.email;
  let subject = body.subject;
  let message = body.message;

  const emailToSend = {
    name: name,
    email: email,
    subject: subject,
    message: message
  }

  if (name.length < 1 || email.length < 1 || subject.length < 1 || message.length < 1) {
    res.status(403);
    res.json({ message: "Bad Request."});
  } else {
    res.status(200);
    res.json({ message: "Thank you for reaching out.  I'm looking forward to connecting!"});
  }
});

module.exports = router;
