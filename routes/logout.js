
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //when route has ":param", req.params.param is available
  req.session.destroy(function(err) {
    if(err){
      console.log(err);
      res.send(err);
    }else{
      console.log("session destroyed");
      res.redirect("/");
    }
  })
});



module.exports = router;
