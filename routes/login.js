
var express = require('express');
var router = express.Router();

/* GET login page.
  login.html debe incluir public/javascripts/login.js
  y no usar default submit() en el form
*/
router.get('/', function(req, res, next) {
  //when route has ":param", req.params.param is available
  if(req.session.email && req.session.password)
    res.redirect("/");
  else res.render('login');
});


router.post('/', function(req, res, next) {
  console.log(req.body);
  console.log(req.session.userid);
  if(req.body.email && req.body.password){
    console.log("ok");

    var sql = "SELECT id_usuario FROM Usuario WHERE nombre=? AND pasw=?";
    var wheres = [req.body.email, req.body.password];
    var query = req.app.mysql.format(sql, wheres);

    req.app.mysql.query(query, function(err, rows, fields){
      if(rows.length == 1){
        if(req.body.remember){
          req.session.cookie.maxAge = 3600000*24; //un dia
        }else req.session.cookie.expire = false;
        res.append("user_id", rows[0].id);
        req.session.user_id = rows[0].id;
        res.redirect("/");
      }else{
        res.status(406).render("login");
      }
    })

    req.session.email = req.body.email;
    req.session.password = req.body.password;




  }else{
    res.send("Error: email or password not found");
    res.render("login");
  }
});

module.exports = router;
