
//This is required for the side menu to appear correctly: it emulates the late position:sticky attribute in a dumb way
$(window).on( "ready scroll", function() {
    if ($(window).scrollTop() > ($('header').height() + 25)) {
        $('nav > ol').css("position", "fixed");
        $('nav > ol').css("top", "25px");
    }
    else {
        $('nav > ol').css("position", "absolute");
        $('nav > ol').css("top", "0px");
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

//This is the main "On load" functions that are gonna happen. 
(function() {

    //In get chapter title on top in a dumb way, I know.
    var chapter = $('.content h1:nth-of-type(1)').html();
    var subchapter = $('.content aside:nth-of-type(1) h2:nth-of-type(1)').html();
    var heading;
    if (chapter != null) {
        heading = chapter;
    }
    else if (subchapter != null) {
        heading = subchapter;
    }
if (heading != null) {
    $('.title-container').append('<h2>' + heading + '</h2>'); 
    document.title = heading + " | MapR";
}

$( "nav > ol > li > a" ).each(function() {
    var z = $(this).attr("href");
    var xdf = z.match(/[1-9]+/);

    if (Math.floor(xdf) == Math.floor($(this).parent('li').prev('li').attr("chapter-number"))) {
        var finalNumber = 0.1 + parseFloat($(this).parent('li').prev('li').attr("chapter-number"));
        var finalNumber = Number((finalNumber).toFixed(1));
    }
    else {
        var finalNumber = parseFloat(xdf).toFixed(1);
    }
if (finalNumber != null && isNaN(finalNumber) == false) {
    $(this).parent('li').attr("chapter-number", finalNumber);
    $(this).parent('li').prepend(finalNumber + ": ");
}

});

//All links in the main content section are made target=_blank, as requested by Chris
$('.dynamic-text section a').attr("target", "_blank");

//This gives us smooth scrolling between anchors
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    var target = $(this.hash);
target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
if (target.length) {
    $('html,body').animate({
        scrollTop: target.offset().top
    }, 1000);
    return false;
}
}
});

//This labels p tags in asides, in case people use those instad of h3 or something else b4 the h2
$('aside h2').prev('p').addClass("aside-subtitle");

//This gives us a sense of what the active page is and will hide sections of the others
var path = window.location.pathname;
var page = path.split("/").pop();
var dft = $('a[href^="' + page + '"]').parent('li');
$(dft).addClass('active');
$('nav ol li').not(dft).addClass('not-active');


//activates the side nav!
$('nav').attr("id", "sidr");

// If the origin is local file system, we can't cookie and are likely in testing mode
var isLive=document.location.origin != "file://"
if (isLive==true) {
    //If cookie isn't present, go to register page. When redirect, set that cookie so you don't redirect again.
    var username=getCookie("visited");
    if (username=="") {
        console.log("not set");
        setCookie("visited", "yes", 999);
        window.location.replace("https://www.mapr.com/getting-started-apache-spark");
    } 
}

// run navTop
navTop();

// catch window resize events and ensure the sidebar is still displaying appropriately
$( window ).resize(function() {navTop();});

$('#menu-button').sidr({
    side: 'right',
    body: '.content',
    displace: false,
    onClose: function() {navTop();},
    onOpen: function() {navTop();}
});


//this adds in the blue box to "asides"
$('aside').prepend("<div></div>");
$('aside div').addClass("blue-thing");

})();
