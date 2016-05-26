var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(!req.session.email || !req.session.password){
    res.redirect('../login');
    return;
  }
  //TODO: SELECT FROM Pacientes
  var query = "SELECT me.id_Medico AS Id, pe.nombre AS Nombre, " +
  "pe.apellido_paterno AS 'Apellido Paterno', pe.apellido_materno AS 'Apellido Materno', " +
  "me.especialidad AS 'Especialidad', me.cedula_profesional AS 'Cedula Profesional' FROM Medico me INNER JOIN Persona pe " +
  "ON me.id_Persona = pe.id_Persona";
  req.app.mysql.query(query, function(err, rows, fields){
    var locals = {
      query: { rows: rows, fields: fields, id:"Id" },
      href: "/viewmedico",
      page_title: "Medicos"
    };
    res.render("table_view", locals, function(err, html){
      res.send(html);
    })
  })
});

module.exports = router;
