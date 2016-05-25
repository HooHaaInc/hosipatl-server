document.getElementById('button_login').onclick = function() {

  var email = document.getElementById('input_email').value;
  var passw = document.getElementById('input_password').value;
  var remember = document.getElementById('checkbox_remember').value;


  var xml = new XMLHttpRequest();

  xml.onreadystatechange = function(){
    if (xml.readyState == 4 && xml.status == 200) {
      xml.responseText;
    }
  }

  xml.setRequestHeader("Content-type", "application/json")
  xml.open("POST", "/login", true);
  xml.send(JSON.stringify({email: email, password: password, remember: remember}));
}
