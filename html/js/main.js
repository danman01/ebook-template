
//This is required for the side menu to appear correctly
$(window).on( "ready scroll", function() {
  if ($(window).scrollTop() > ($('header').height() + 25)) {
    $('nav ol').css("position", "fixed");
    $('nav ol').css("top", "25px");
  }
  else {
    $('nav ol').css("position", "absolute");
    $('nav ol').css("top", "0px");
  }
});

//This makes sure sidebar menu is correct height from top of document
function navTop() {
    $('nav').css("top", ($('header').height() + 60))
}

//functions for manipulating cookies
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
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

$(document).ready(function() {
$('nav').attr("id", "sidr");
//If cookie isn't present, go to register page. When redirect, set that cookie so you don't redirect again.
/*var username=getCookie("visited");
    if (username=="") {
        console.log("not set");
        setCookie("visited", "yes", 999);
        window.location.replace("https://www.mapr.com/getting-started-apache-spark");
    } */

  navTop();
  $('#menu-button').sidr({
      side: 'right',
      body: '.content',
      displace: false,
      onClose: function() {navTop();},
      onOpen: function() {navTop();}
    });
});

//This is the main "On load" functions
 (function() {
  //this adds in the blue box to "asides"
  $('aside').prepend("<div></div>");
  $('aside div').addClass("blue-thing");
// This creates line numbers on code
    var pre = document.getElementsByTagName('pre'),
        pl = pre.length;
    for (var i = 0; i < pl; i++) {
        pre[i].innerHTML = '<span class="line-number"></span>' + pre[i].innerHTML + '<span class="cl"></span>';
        var num = pre[i].innerHTML.split(/\n/).length;
        for (var j = 0; j < num; j++) {
            var line_num = pre[i].getElementsByTagName('span')[0];
            line_num.innerHTML += '<span>' + (j + 1) + '</span>';
        }
    }
})();
