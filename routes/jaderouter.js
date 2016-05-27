var express = require('express');
var router = express.Router();

/* GET login page.
  login.html debe incluir public/javascripts/login.js
  y no usar default submit() en el form
*/
router.get('/', function(req, res, next) {
  //when route has ":param", req.params.param is available
  var view = req.baseUrl;
  var indexOfPoint = view.indexOf(".");
  view = view.slice(1, indexOfPoint);
  res.render(view);
});

module.exports = router;
