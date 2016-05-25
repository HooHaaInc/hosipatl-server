var express = require('express');
var router = express.Router();

/* GET /addpaciente . */
router.get('/', function(req, res, next) {
  //if logged
  var q = "SELECT pe.id_Persona, pa.id_Paciente, pe.nombre FROM Paciente pa INNER JOIN Persona pe ON pa.id_Persona = pe.id_Persona";
  var q1 = "SELECT pe.id_Persona, me.id_Medico, pe.nombre FROM Medico me INNER JOIN Persona pe ON me.id_Persona = pe.id_Persona";
  var q2 = "SELECT id_Cama, id_Hab FROM Cama";
  var q3 = "SELECT id_Sala, nombre_sala, id_Hab FROM Sala";
  req.app.mysql.query(q+"; "+q1+"; "+q2+"; "+q3, function(err, results){
    if(err){
      res.render('error', {
        message: err.message,
        error: err
      });
      return;
    }

    console.log(results);

    res.render("create_hospitalizacion", results, function(err, html){
      res.send(html);
    })
  });

  //res.render('create_hospitalizacion');

});


router.post('/', function(req, res, next) {
  console.log(req.body);
  var datos = {
    nombre: req.body.nombre,
    apellido_paterno: req.body.apellidopaterno,
    apellido_materno: req.body.apellidomaterno,
    tipo: "doctor"
  };
  var sql = 'INSERT INTO Persona SET ?';
  var query = req.app.mysql.format(sql, datos);
  console.log("query: ", query);
  var smn = true;
  req.app.mysql.query(query, function(err, result) {
    if(err){
      res.render('error', {
        message: err.message,
        error: err
      });
      return;
    }
    console.log('The solution is: ', result);
    var datos = {
      id_Persona: result.insertId,
      especialidad: req.body.esp,
      cedula_profesional: req.body.cedula
    };
    var sql = 'INSERT INTO Medico SET ?';
    var query = req.app.mysql.format(sql, datos);
    req.app.mysql.query(query, function(err, result) {
      if(err){
        res.render('error', {
          message: err.message,
          error: err
        });

        //TODO: borrar registro en persona porque no se pudo insertar paciente

      }else{
        console.log("ea: ", result);
        res.redirect("/");
      }
    })
  });
})


module.exports = router;
