
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //when route has ":param", req.params.param is available
  if(req.session.email && req.session.password)
    res.redirect("/");
  else res.render('login');
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  if(req.body.email && req.body.password){
    req.session.email = req.body.email;
    req.session.password = req.body.password;
    res.redirect("/");

  }else res.send("Error: email or password not found");
});

module.exports = router;
