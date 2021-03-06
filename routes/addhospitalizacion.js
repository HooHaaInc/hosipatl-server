var express = require('express');
var router = express.Router();

var camas = {};

/* GET /addpaciente . */
router.get('/', function(req, res, next) {
  //if logged
  if(!req.session.email || !req.session.password){
    res.redirect('../login');
    return;
  }
  var q = "SELECT pe.id_Persona, pa.id_Paciente, pe.nombre FROM Paciente pa INNER JOIN Persona pe ON pa.id_Persona = pe.id_Persona";
  var q1 = "SELECT pe.id_Persona, me.id_Medico, pe.nombre FROM Medico me INNER JOIN Persona pe ON me.id_Persona = pe.id_Persona";
  var q2 = "SELECT c.id_Cama, c.id_Hab, s.id_Sala, s.nombre_sala FROM Cama c INNER JOIN Sala s ON c.id_Hab= s.id_Hab";
  var q3 = "SELECT * FROM Hospitalizacion h INNER JOIN Servicio s " +
      "ON h.id_Servicio = s.id_Servicio " +
      "WHERE id_Hospitalizacion = " + (req.query.id || -1);
  req.app.mysql.query(q+"; "+q1+"; "+q2+"; "+q3, function(err, results){
    if(err){
      res.render('error', {
        message: err.message,
        error: err
      });
      return;
    }

    console.log(results);
    for(var i=0; i<results[2].length; i++)
      camas[results[2][i].id_Cama] = results[2][i].id_Sala;

    res.render("create_hospitalizacion", {results: results}, function(err, html){
      if(err){
        res.render('error', {
          message: err.message,
          error: err
        });
        return;
      }
      res.send(html);
    })
  });

});


router.post('/', function(req, res, next) {
  if(!req.session.email || !req.session.password){
    res.redirect('../login');
    return;
  }
  if(req.body._method == "put"){
    put(req, res, next);
    return;
  }
  console.log("body: ", req.body);
  var datos = {
    id_Paciente: req.body.paciente,
    id_Medico: req.body.medico,
    tipo_servicio: "hospitalizacion",
    tipo_pago: req.body.tipo_pago,
    fecha_servicio: new Date().toISOString().slice(0, 19).replace('T', ' ')
  };
  var sql = 'INSERT INTO Servicio SET ?';
  var query = req.app.mysql.format(sql, datos);
  console.log("query: ", query);
  var smn = true;
  req.app.mysql.query(query, function(err, result) {
    if(err){
      res.render('error', {
        message: err.message,
        error: err
      });
    }else{
      console.log("ea: ", result);
      datos = {
        id_Servicio: result.insertId,
        id_Sala: camas[req.body.cama],
        id_Cama: req.body.cama,
        fecha_ingreso: req.body.fecha_ingreso,
        fecha_salida: req.body.fecha_salida || null,
        tipo_hospitalizacion: 1
      }
      sql = 'INSERT INTO Hospitalizacion SET ?';
      query = req.app.mysql.format(sql, datos);
      req.app.mysql.query(query, function(err, newresult) {
        if(err){
          var del = "DELETE FROM Servicio WHERE id_Servicio="+result.insertId;
          req.app.mysql.query(del, function(err, result) {
            if(err){
              res.render('error', {
                message: "rekt",
                error: err
              });
            }
          });
          res.render('error', {
            message: err.message,
            error: err
          });
        }else{
          console.log("yey");
          res.redirect("/");
        }
      });
    }
  });
});


function put(req, res, next) {
  console.log("body: ", req.body);
  var datos = {
    id_Paciente: req.body.paciente,
    id_Medico: req.body.medico,
    tipo_pago: req.body.tipo_pago,
    id_Sala: camas[req.body.cama],
    id_Cama: req.body.cama,
    fecha_ingreso: req.body.fecha_ingreso,
    fecha_salida: req.body.fecha_salida,
    tipo_hospitalizacion: 1
  };
  var sql = 'UPDATE Servicio s JOIN Hospitalizacion h ON s.id_Servicio = h.id_Servicio SET ? WHERE h.id_Servicio = ' + req.body.id;
  var query = req.app.mysql.format(sql, datos);
  console.log("query: ", query);
  var smn = true;
  req.app.mysql.query(query, function(err, result) {
    if(err){
      res.render('error', {
        message: err.message,
        error: err
      });
    }else{
      console.log("ea: ", result);
      res.redirect("/");
    }
  });
}


module.exports = router;
