// Marketo lightbox
// things to note:
// does not appear when signedup cookie is set to 'yes'

// Function begins at load
// return jQuery control to $
jQuery( document ).ready(function( $ ) {
  //Declares the cookie as JS var
  var username = getCookie("visited");
  var signedup = getCookie('signedup');

  //If you haven't signed up for the form on the page...
  if (signedup != "yes") {

    if (username == "") {
      setCookie("visited", "yes", 999);
    }

    //On form render, let's add some nice little blurbs

    MktoForms2.onFormRender(function(form) {
      $('.mktoModalMain').prepend(
        '<div class="special-custom-popup-blurb"><h3>Like the Book?</h3><p>Fill out this form for uninterrupted reading.</p>'
        );
    });

    //And the form loads after a set amount of time to freak people out
    setTimeout(function() {

      $(window).on("scroll",function(){
        positionContent(); // defined in forms2.js, originally from external source
     })

      //Mktoforms is an object we're grabbing from the script that's included from Marketo. Now this method is loadin' it
      MktoForms2.loadForm("//app-sjl.marketo.com", "142-FNO-891", 1765, function(form) {

        // Global, incase we need it elsewhere
        marketo_lightbox = MktoForms2.lightbox(form);

        // Change submit btn text and add icon. Maybe there's a way to configure this on the Marketo side?
        var mkto_button = $(".mktoForm .mktoButtonWrap.mktoCleanGray .mktoButton");
        mkto_button.text("Read the Ebook");
        mkto_button.append("<i></i>");

        marketo_lightbox.show();

        // On form submit, we then check every interval for the RFDisplayFrame.
        // If ReachForce is on the page, we give it a higher zindex than marketo lightbox
        $(".mktoModalMain form").submit(function(){
          var rfDisplay = setInterval(function(){
            if($("#RFDisplayFrame").length > 0 && $("#RFDisplayFrame").is(":visible")){
              var mkto_modal_zindex = $(".mktoModal .mktoModalMask").css("z-index");
              var desired_zindex = parseInt(mkto_modal_zindex) + 10;
              $("#RFDisplayFrame").css("z-index", desired_zindex);
              clearInterval(rfDisplay);
            }
            if ($(".mktoModalMain form").length == 0) {
              clearInterval(rfDisplay);
            }
          }, 500);
        });

        // On Success:
        form.onSuccess(function(values, followUpUrl){

          // track the conversion in GTM:
          dataLayer.push({'event':'Conversion Popup'});

          setCookie("signedup", "yes", 999);

          // Get the form's jQuery element and hide it...this turns out to not close the entire modal box and our appended text.
          // form.getFormElem().hide();
          // or...$('.mktoModalClose').click(); ?

          // this one does the trick:
          marketo_lightbox.modalCloseClicked();

          // close the 'SmartForm' that can't close itself
          if ($("#RFLoadingFrame").length > 0) {
            $("#RFLoadingFrame").remove();
            $("#RFBlockFrame").remove();
          }
          //return false to prevent the submission handler from taking the lead to the follow up url.
          return false;
        });
      });

    }, 7000); //Amount of time in Milliseconds till we see the popup
  }
});



