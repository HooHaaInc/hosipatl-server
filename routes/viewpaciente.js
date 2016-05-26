var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
  if(!req.session.email || !req.session.password){
    res.redirect('../login');
    return;
  }
  console.log(req.params.id);
  //TODO: SELECT FROM Pacientes
  //recetas, servicios, expediente, hospitalizacion,
  var sql = "SELECT p.id_Persona, p.id_Paciente, p.entidad_serv_salud, p.eps, " +
      "pe.nombre, pe.apellido_paterno, pe.apellido_materno, pe.tipo, " +
      "h.id_Hospitalizacion, h.id_Cama, h.fecha_ingreso, h.fecha_salida, h.tipo_hospitalizacion, " +
      "m.id_Medico, m.id_Persona AS mid_Persona, m.especialidad, m.cedula_profesional, " +
      "pm.nombre AS mnombre, pm.apellido_paterno AS mapellido_paterno, pm.apellido_materno AS mapellido_materno, " +
      "sa.id_Sala, sa.id_Medico AS Sala_id_Medico, sa.id_Hab AS Sala_id_Hab, sa.nombre_sala, sa.numero_camas, " +
      "c.id_Cama, c.id_Hab AS cid_Hab, c.tipo, c.descripcion, " +
      "s.id_Servicio, s.tipo_servicio, s.tipo_pago, s.fecha_servicio " +
      "FROM Paciente p " +
      "INNER JOIN Persona pe ON p.id_Persona = pe.id_Persona " +
      "LEFT OUTER JOIN Servicio s ON p.id_Paciente = s.id_Paciente " +
      "LEFT OUTER JOIN Hospitalizacion h ON h.id_Servicio = s.id_Servicio " +
      "LEFT OUTER JOIN Medico m ON s.id_Medico = m.id_Medico " +
      "LEFT OUTER JOIN Persona pm ON pm.id_Persona = m.id_Persona " +
      "LEFT OUTER JOIN Sala sa ON h.id_Sala = sa.id_Sala " +
      "LEFT OUTER JOIN Cama c ON h.id_Cama = c.id_Cama " +
      "WHERE p.id_Paciente = ?";
  var query = req.app.mysql.format(sql, [req.params.id || 1]);
  req.app.mysql.query(query, function(err, rows, fields){
    console.log("rows: ", rows);
    if(err || rows.length == 0){
      res.render('error', {
        message: err ? err.message : "no rows",
        error: err
      });
    }else{
      var locals = {
        id_Paciente: rows[0].id_Paciente,
        id_Persona: rows[0].id_Persona,
        nombre: rows[0].nombre,
        apellido_paterno: rows[0].apellido_paterno,
        apellido_materno: rows[0].apellido_materno,
        entidad_serv_salud: rows[0].entidad_serv_salud,
        eps: rows[0].eps ? "si" : "no",
        idp: rows[0].id_Persona,
        idpa: rows[0].id_Paciente,
        rows: rows
      }
      res.render("view_paciente", locals, function(err, html){
        if(err)
          res.render('error', {
            message: err.message,
            error: err
          });
        else res.send(html);
      })
    }
  })
});

router.delete("/", function(req, res, next) {
  if(!req.session.email || !req.session.password){
    res.redirect('../login');
    return;
  }
  var sql1 = "DELETE FROM Paciente WHERE id_Paciente = ?";
  var sql2 = "DELETE FROM Persona WHERE id_Persona = ?";
  var q1 = req.app.mysql.format(sql1,req.body.idpa);
  var q2 = req.app.mysql.format(sql2, req.body.idp);
  console.log(q1+ "\n"+q2);
  req.app.mysql.query(q1+"; "+q2, function(err, result1){
    if (!err){
      res.send(result1);
    }else{
      console.log(err);
    }
  });
});

module.exports = router;
