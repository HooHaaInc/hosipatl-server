var express = require('express');
var router = express.Router();
var id;
var id_persona;
var pre;

router.get('/:id', function(req, res, next){
    var sql = "SELECT pa.id_Persona, pa.id_Paciente, pa.entidad_serv_salud, pa.eps, "+
              "pe.nombre, pe.apellido_paterno, pe.apellido_materno, pe.tipo " +
              "FROM Paciente pa INNER JOIN Persona pe ON pa.id_Persona = pe.id_Persona " +
              "WHERE pa.id_Paciente = ?";
    id = req.params.id;
    console.log("ID edit paciente "+id);
    var query = req.app.mysql.format(sql, [req.params.id || 1]);
    req.app.mysql.query(query, function(err, rows, fields){
      if(err || rows.length == 0){
        res.render('error', {
          message: err ? err.message : "no rows",
          error: err
        });
      }else{
          var locals = {
            id_persona: rows[0].id_Persona,
            nombre: rows[0].nombre,
            apellido_paterno: rows[0].apellido_paterno,
            apellido_materno: rows[0].apellido_materno,
            entidad_serv_salud: rows[0].entidad_serv_salud,
            eps: rows[0].eps
          }
          pre = locals;
          id_persona = rows[0].id_Persona;
          console.log(id_persona);
          res.render("editpaciente", locals, function(err, html){
            if(err)
              res.render('error', {
                message: err.message,
                error: err
              });
            else res.send(html);
          });
      }
    });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  var datos = {
    nombre: req.body.nombre,
    apellido_paterno: req.body.apellidopaterno,
    apellido_materno: req.body.apellidomaterno,
    tipo: "paciente"
  };
  var sql = 'UPDATE Persona SET ? WHERE id_Persona = '+id_persona;

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
      id_Persona: id_persona,
      entidad_serv_salud: req.body.ess,
      eps: req.body.eps ? true : false
    };
    var sql = 'UPDATE Paciente SET ? WHERE id_Paciente = '+id;
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
