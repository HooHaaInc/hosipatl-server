var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  //TODO: SELECT FROM Pacientes
  req.app.mysql.query("SELECT * FROM Usuario", function(err, rows, fields){
    var locals = {
      query: { rows: rows, fields: fields, id: "id_Paciente" },
      href: "/viewpaciente",
      page_title: "Pacientes"
    };
    res.render("table_view", locals, function(err, html){
      res.send(html);
    });
  });
});

module.exports = router;
