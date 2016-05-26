var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {

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
      "FROM Hospitalizacion h " +
      "INNER JOIN Servicio s ON h.id_Servicio = h.id_Servicio " +
      "LEFT OUTER JOIN Paciente p ON p.id_Paciente = s.id_Paciente " +
      "LEFT OUTER JOIN Persona pe ON pe.id_Persona = p.id_Persona " +
      "LEFT OUTER JOIN Medico m ON s.id_Medico = m.id_Medico " +
      "LEFT OUTER JOIN Persona pm ON pm.id_Persona = m.id_Persona " +
      "LEFT OUTER JOIN Sala sa ON h.id_Sala = sa.id_Sala " +
      "LEFT OUTER JOIN Cama c ON h.id_Cama = c.id_Cama " +
      "WHERE h.id_Hospitalizacion = ?";
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
        nombre: rows[0].nombre,
        apellido_paterno: rows[0].apellido_paterno,
        apellido_materno: rows[0].apellido_materno,
        mnombre: rows[0].mnombre,
        mapellido_paterno: rows[0].mapellido_paterno,
        mapellido_materno: rows[0].mapellido_materno,
        fecha_ingreso: rows[0].fecha_ingreso,
        fecha_salida: rows[0].fecha_salida,
        tipo_hospitalizacion: rows[0].tipo_hospitalizacion,
        tipo_pago: rows[0].tipo_pago,
        id_Cama: rows[0].id_Cama,
        nombre_sala: rows[0].nombre_sala,
        id: req.params.id
      }
      res.render("view_hospitalizacion", locals, function(err, html){
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
  var sql = "DELETE FROM Hospitalizacion WHERE id_Hospitalizacion = ?";
  var query = req.app.mysql.format(sql, [req.body.id]);
  req.app.mysql.query(query, function(err, result){
    if(err)
      res.render('error', {
        message: err.message,
        error: err
      });
    else{
      console.log(result);
      res.redirect("/");
    }
  });
});

module.exports = router;
