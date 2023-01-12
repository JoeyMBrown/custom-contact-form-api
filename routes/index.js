var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res, next) => {

  let name = req.body.Name;
  let email = req.body.Email;
  let subject = req.body.Subject;
  let message = req.body.Message;

  if (name.length < 1 || email.length < 1 || subject.length < 1 || message.length < 1) {
    res.status(403);
    res.json({ Message: "Bad Request."});
  } else {
    res.status(200);
    res.json({ Message: "Congratz Bro"});
  }
});

module.exports = router;
