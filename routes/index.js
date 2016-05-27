
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.email || !req.session.password)
    res.redirect('/login');
  else res.redirect('/tablepacientes');
});

module.exports = router;
