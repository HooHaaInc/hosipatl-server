var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  //TODO: SELECT FROM Pacientes
  //recetas, servicios, expediente, hospitalizacion,
  req.app.mysql.query("SELECT * FROM Paciente JOIN blabla", function(err, rows, fields){
    res.render("table_pacientes", {query: {rows: rows, fields: fields}}, function(err, html){
      res.send(html);
    })
  })
});

module.exports = router;
