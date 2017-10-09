var express = require('express');
var router = express.Router();
var monk = require('monk');

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

/* news */
router.post('/deletenews', function(req, res, next){
    req.db.get('news').remove({_id: monk.id(req.body._id)}).then(docs => {
      res.send(docs);
    });
});

router.get('/shownews', function(req, res, next){
  req.db.get('news').find({}).then(docs => {
    res.send(docs);
  });
});

router.post('/addnews', function(req, res, next){
  if(req.session.admin && parseInt(req.body.year)) {
    req.db.get('news').find({name: req.body.name}).then(docs => {
      if(docs.length === 0) {
        req.db.get('news').insert({name: req.body.name, link: req.body.link, year: parseInt(req.body.year), date: new Date()}).then(docs => {
          if(docs) {
            res.send({ok: 1});
          } else {
            res.send({ok: 0});
          }
        })
      } else {
        res.send({ok: 0});
      }
    });
  } else {
    res.send({ok: 0})
  }
});

/*places*/
router.post('/deleteplaces', function(req, res, next){
    req.db.get('places').remove({_id: monk.id(req.body._id)}).then(docs => {
      res.send(docs);
    });
});

router.get('/showplaces', function(req, res, next){
  req.db.get('places').find({}).then(docs => {
    res.send(docs);
  });
});

router.post('/addplaces', function(req, res, next){
  if(req.session.admin && parseInt(req.body.year)) {
    req.db.get('places').find({name: req.body.name}).then(docs => {
      if(docs.length === 0) {
        req.db.get('places').insert({name: req.body.name, link: req.body.link, year: parseInt(req.body.year), date: new Date()}).then(docs => {
          if(docs) {
            res.send({ok: 1});
          } else {
            res.send({ok: 0});
          }
        })
      } else {
        res.send({ok: 0});
      }
    });
  } else {
    res.send({ok: 0})
  }
});
module.exports = router;
