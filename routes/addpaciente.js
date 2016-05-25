var express = require('express');
var router = express.Router();

/* GET /addpaciente . */
router.get('/', function(req, res, next) {
  //if logged
  res.render('create_paciente');
});


router.post('/', function(req, res, next) {
  var sql = "INSERT INTO persona (nombre,apellido_paterno,apellido_materno,tipo) VALUES (?,?,?,?)";
  var wheres = [req.body.nombre, req.body.apellidopaterno,req.body.apellidomaterno,'paciente'];
  var query1 = req.app.mysql.format(sql, wheres);
  console.log(query1);
  req.app.mysql.query(query1, function(err2, rows2, fields2){
    var sql2 = "SELECT id_Persona FROM persona WHERE nombre=? AND apellido_paterno=? AND apellido_materno=?";
    var val = [req.body.nombre, req.body.apellidopaterno,req.body.apellidomaterno];
    var query2 = req.app.mysql.format(sql2, val);
    console.log(query2);
    req.app.mysql.query(query2, function(err3, rows3, fields3){
        if(rows3.length == 1){
          var sql3 = "INSERT INTO paciente (id_Persona,entidad_serv_salud,eps) VALUES (?,?,?)";
          var valu = [rows3[0].id_Persona, req.body.ess,req.body.eps];
          var query3 = req.app.mysql.format(sql3, valu);
          console.log(query3);
          req.app.mysql.query(query3, function(err4, rows4, fields4){
          });
        }
    });
  });
  res.redirect("/");
});

/*router.post('/', function(req, res, next) {
  console.log(req.body);
  var smn = true;
  req.app.mysql.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err){
       res.send(err);
       smn = false;
     }
    console.log('The solution is: ', rows[0].solution);
  });
  if(smn) res.redirect('..');
});*/
module.exports = router;
