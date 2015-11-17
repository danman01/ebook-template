// This is required for the side menu to appear correctly: it emulates the late position:sticky attribute
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

(function(){

  // Setup header subtitle and document title
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
    var org_name = "MapR";
    // Uncomment the following to have a sub-title in the page header:
    // $('.title-container').append('<h2>' + heading + '</h2>'); 
    document.title = heading + " - " + org_name;
  }
  
  // Make all links in the main content section are made target=_blank
  $('.dynamic-text section a').attr("target", "_blank");

  // Smooth scrolling between anchors
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

  // Label <p> tags within <aside> as aside-subtitle
  $('aside h2').prev('p').addClass("aside-subtitle");

  // Add in the blue box to "asides"
  $('aside').prepend("<div></div>");
  $('aside div').addClass("blue-thing");

  // 
  // TOC specific code
  //

  // Display chapter numbers in the TOC
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

  // Add 'active' class to the LI corresponding to page we are on. Add not-active to all other TOC lis
  var path = window.location.pathname;
  var page = path.split("/").pop();
  var dft = $('a[href^="' + page + '"]').parent('li');
  $(dft).addClass('active');
  $('nav ol li').not(dft).addClass('not-active');

  // Run navTop
  navTop();

  // catch window resize events and ensure the sidebar is still displaying appropriately
  $( window ).resize(function() {navTop();});

  // Activates the side nav
  $('nav').attr("id", "sidr");

  $('#menu-button').sidr({
    side: 'right',
    body: '.content',
    displace: false,
    onClose: function() {navTop();},
    onOpen: function() {navTop();}
  });

  // Hide TOC when clicked outside of TOC; using external js library, ba-outside-events
  var toc = $('nav[data-type="toc"]');
  toc.bind('clickoutside', function (event) {
    if(toc.is(":visible")){
      $("#menu-button").click();
    }
  });

  //
  // END TOC specific code
  //
  
})();
