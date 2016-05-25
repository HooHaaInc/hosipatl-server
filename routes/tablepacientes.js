var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  //TODO: SELECT FROM Pacientes
  var query = "SELECT pa.id_Paciente AS Id, pe.nombre AS Nombre, " +
  "pe.apellido_paterno AS 'Apellido Paterno', pe.apellido_materno AS 'Apellido Materno', " +
  "pa.entidad_serv_salud AS 'Entidad de Servicio de Saludo', pa.eps AS EPS FROM Paciente pa INNER JOIN Persona pe " +
  "ON pa.id_Persona = pe.id_Persona";
  req.app.mysql.query(query, function(err, rows, fields){
    if(err){
      res.render('error', {
        message: err.message,
        error: err
      });
      return;
    }
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
