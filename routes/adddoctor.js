var express = require('express');

var router = express.Router();

/* GET /addpaciente . */
router.get('/', function(req, res, next) {
  //if logged
  res.render('create_doctor');
});
router.post('/', function(req, res, next) {
  var consult = "SELECT id_Persona FROM persona WHERE nombre=? AND apellido_paterno=? AND apellido_materno=? AND tipo=?"
  var wher = [req.body.nombre, req.body.apellidopaterno,req.body.apellidomaterno,'medico'];
  var query0 = req.app.mysql.format(consult, wher);
  req.app.mysql.query(query0, function(err, rows, fields){
    if(rows.length == 0){
      var sql = "INSERT INTO persona (nombre,apellido_paterno,apellido_materno,tipo) VALUES (?,?,?,?)";
      var wheres = [req.body.nombre, req.body.apellidopaterno,req.body.apellidomaterno,'medico'];
      var query1 = req.app.mysql.format(sql, wheres);
      console.log(query1);
      req.app.mysql.query(query1, function(err2, rows2, fields2){
        var sql2 = "SELECT id_Persona FROM persona WHERE nombre=? AND apellido_paterno=? AND apellido_materno=?";
        var val = [req.body.nombre, req.body.apellidopaterno,req.body.apellidomaterno];
        var query2 = req.app.mysql.format(sql2, val);
        console.log(query2);
        req.app.mysql.query(query2, function(err3, rows3, fields3){
            if(rows3.length == 1){
              var sql3 = "INSERT INTO medico (id_Persona,especialidad,cedula_profesional) VALUES (?,?,?)";
              var valu = [rows3[0].id_Persona, req.body.esp,req.body.cedula];
              var query3 = req.app.mysql.format(sql3, valu);
              console.log(query3);
              req.app.mysql.query(query3, function(err4, rows4, fields4){
              });
            }
        });
      });
    }
  });
  res.redirect("/");
});


module.exports = router;
