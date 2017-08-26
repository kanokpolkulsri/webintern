var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<h1>hello</h1>')
});

router.post('/login', function(req, res, next) {
  // console.log(req.body.username)
  req.db.get('users').find({username: req.body.username,password: req.body.password}).then(docs => {
    if(docs.length > 0) {
      req.session.username = docs[0].username;
      req.session.admin = true;
      res.redirect('/');
    }
    else {
      res.redirect('/login');
    }
  });
});

module.exports = router;
