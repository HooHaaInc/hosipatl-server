
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //when route has ":param", req.params.param is available
  if(req.session.email && req.session.password)
    res.redirect("..");
  else res.render('login');
});



module.exports = router;
