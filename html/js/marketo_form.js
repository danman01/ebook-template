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
      //Mktoforms is an object we're grabbing from the script that's included from Marketo. Now this method is loadin' it
      MktoForms2.loadForm("//app-sjl.marketo.com", "142-FNO-891", 1765, function(form) {
        marketo_lightbox = MktoForms2.lightbox(form);

        marketo_submit_btn = $(".mktoForm .mktoButtonWrap.mktoCleanGray .mktoButton");
        marketo_submit_btn.text("Read the Ebook");

        marketo_lightbox.show();

        // On Success:
        form.onSuccess(function(values, followUpUrl){

          // track the conversion in GTM:
          dataLayer.push({'event':'Conversion'});
          var events = dataLayer.map(function(obj){return obj.event})
          console.log("data layer events:" + events.toString());

          // Track success in facebook, first waiting 5 secs:
          setTimeout(function(){
            window._fbq.push(['track', '6026805122947', {'value':'0.00','currency':'USD'}]);
            console.log("fbq push triggered");
          }, 5000);

          setCookie("signedup", "yes", 999);

          // Get the form's jQuery element and hide it...this turns out to not close the entire modal box and our appended text.
          // form.getFormElem().hide();
          // or...$('.mktoModalClose').click(); ?
          marketo_lightbox.modalCloseClicked();

          //return false to prevent the submission handler from taking the lead to the follow up url.
          return false;
        });
      });

    }, 15000); //Amount of time in Milliseconds till we see the popup
  }
});



