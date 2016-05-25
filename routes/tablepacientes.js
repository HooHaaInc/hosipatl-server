var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  //TODO: SELECT FROM Pacientes
  req.app.mysql.query("SELECT * FROM Usuario", function(err, rows, fields){
    res.render("table_pacientes", {query: {rows: rows, fields: fields}}, function(err, html){
      res.send(html);
    })
  })
});

module.exports = router;
