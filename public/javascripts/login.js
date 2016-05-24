function onsubmit() {
  var xml = new XMLHttpRequest();

  xml.onreadystatechange = function(){
    if (xml.readyState == 4 && xml.status == 200) {
      xml.setRequestHeader
    }
  }

  xml.setRequestHeader("Content-type", "application/json")
  xml.open("GET", "/login", true);
  xml.send(JSON.stringify({"msg":"login pls"}));
}
