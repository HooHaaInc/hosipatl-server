document.getElementById('button_logout').onclick = function(e) {
  var xml = new XMLHttpRequest();

  xml.onreadystatechange = function(){
    if (xml.readyState == 4 && xml.status == 200) {
      console.log("ok");
    }
  }

  xml.setRequestHeader("Content-type", "application/json")
  xml.open("GET", "/logout", true);
  xml.send();
}
