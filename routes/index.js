var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // if(req.session.username) {
    res.render('index', { title: 'Express' , admin_session: req.session.admin});
  // } else {
  //   res.redirect('/login')
  // }
});

module.exports = router;
