//This makes sure sidebar menu is correct height from top of document
function navTop() {
  $('nav').css("top", ($('header').height() + 60))
}

//functions for manipulating cookies
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  var exdays = exdays || 999;
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return "";
}


