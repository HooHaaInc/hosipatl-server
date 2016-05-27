var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
  if(!req.session.email || !req.session.password){
    res.redirect('../login');
    return;
  }
  var sql = "SELECT me.id_Persona, me.id_Medico, me.especialidad, me.cedula_profesional, "+
            "pe.nombre, pe.apellido_paterno, pe.apellido_materno, pe.tipo " +
            "FROM Medico me INNER JOIN Persona pe ON me.id_Persona = pe.id_Persona " +
            "WHERE me.id_Medico = ?";
  console.log("ID:" + req.params.id);
  var query = req.app.mysql.format(sql, [req.params.id || 1]);
  console.log(req.params.id);
  req.app.mysql.query(query, function(err, rows, fields){
    if(err || rows.length == 0){
      res.render('error', {
        message: err ? err.message : "no rows",
        error: err
      });
    }else{
      var locals = {
        id_Medico: rows[0].id_Medico,
        id_Persona: rows[0].id_Persona,
        nombre: rows[0].nombre,
        apellido_paterno: rows[0].apellido_paterno,
        apellido_materno: rows[0].apellido_materno,
        especialidad: rows[0].especialidad,
        cedula_profesional: rows[0].cedula_profesional,
        idp: rows[0].id_Persona,
        idm: rows[0].id_Medico
      }
      res.render("view_medico", locals, function(err, html){
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

router.delete("/", function(req, res, next){
  if(!req.session.email || !req.session.password){
    res.redirect('../login');
    return;
  }
  var sql1 = "DELETE FROM Medico WHERE id_Medico = ?";
  var sql2 = "DELETE FROM Persona WHERE id_Persona = ?";
  var q1 = req.app.mysql.format(sql1,req.body.idm);
  var q2 = req.app.mysql.format(sql2, req.body.idp);
  console.log(q1+ "\n"+q2);
  req.app.mysql.query(q1+"; "+q2, function(err, result1){
    if (!err){
      /*req.app.mysql.query(q2, function(err, result2){
          if(!err){
            res.send(result2);
          }else{
            console.log(err);
          }
      });*/
      res.send(result1);
    }else{
      console.log(err);
    }
  });
});

module.exports = router;
