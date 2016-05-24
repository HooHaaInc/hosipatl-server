
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.email || !req.session.password)
    res.redirect('../login');
  else res.render("index");
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  if(req.body.email && req.body.password){
    req.session.email = req.body.email;
    req.session.password = req.body.password;
    res.render("index");

  }else res.send("Error: email or password not found");
});

module.exports = router;
