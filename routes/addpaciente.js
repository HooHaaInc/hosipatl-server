
var express = require('express');

var router = express.Router();

/* GET /addpaciente . */
router.get('/', function(req, res, next) {
  //if logged
  res.render('create_paciente');
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  var smn = true;
  req.app.mysql.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err){
       res.send(err);
       smn = false;
     }
    console.log('The solution is: ', rows[0].solution);
  });
  if(smn) res.redirect('..');
})

module.exports = router;
