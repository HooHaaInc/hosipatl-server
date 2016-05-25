var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  //TODO: SELECT FROM Pacientes
  //recetas, servicios, expediente, hospitalizacion,
  /*var sql = "SELECT p.id_Persona, p.id_Paciente, p.entidad_serv_salud, p.eps, " +
      "pe.nombre, pe.apellido_paterno, pe.apellido_materno, pe.tipo, " +
      "e.id_registro, e.diagnostico, e.fecha_registro, " +
      "h.id_Hospitalizacion, h.id_Cama, h.fecha_ingreso, h.fecha_salida, h.tipo_hospitalizacion, " +
      "m.id_Medico, m.id_Persona AS Medico_id_Persona, m.especialidad, m.cedula_profesional, " +
      "sa.id_Sala, sa.id_Medico AS Sala_id_Medico, sa.id_Hab AS Sala_id_Hab, sa.nombre_sala, sa.numero_camas, " +
      "c.id_Cama, c.id_Hab AS Cama_id_Hab, c.tipo, c.descripcion, " +
      "r.id_receta, r.fecha, r.diagnostico, " +
      "s.id_Servicio, s.tipo_servicio, s.tipo_pago, s.fecha_servicio " +
      "FROM Paciente p " +
      "INNER JOIN Persona pe ON p.id_Persona = pe.id_Persona " +
      "LEFT OUTER JOIN expediente e ON p.id_Paciente = e.id_Paciente " +
      "LEFT OUTER JOIN Hospitalizacion h ON p.id_Paciente = h.id_Paciente " +
      "LEFT OUTER JOIN receta r ON p.id_Paciente = r.id_Paciente " +
      "LEFT OUTER JOIN Servicio s ON p.id_Paciente = s.id_Paciente " +
      "LEFT OUTER JOIN Medico m ON h.id_Medico = m.id_Medico " +
      "LEFT OUTER JOIN Sala sa ON h.id_Sala = sa.id_Sala " +
      "LEFT OUTER JOIN Cama c ON h.id_Cama = c.id_Cama " +
      "WHERE p.id_Paciente = ?";*/
  var sql = "SELECT id_persona, especialidad, cedula_profesional from Medico WHERE id_Medico = ?";
  var query = req.app.mysql.format(sql, [req.params.id | 1]);
  console.log(req.params.id);
  req.app.mysql.query(query, function(err, rows, fields){
    if(err){
      res.render('error', {
        message: err.message,
        error: err
      });
    }else
      res.render("table_view", {query: {rows: rows, fields: fields}}, function(err, html){
        if(err)
          res.render('error', {
            message: err.message,
            error: err
          });
        else res.send(html);
      })
  })
});

module.exports = router;
