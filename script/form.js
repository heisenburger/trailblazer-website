domready(function() {
  'use strict';

  // Super simple regex test (if the browser doesn't do this natively)
  var testEmail = function(email) {
    var re = /^.*@.*/;
    return re.test(email);
  };

  var form = document.getElementById('registration-form');

  form.onsubmit = function() {
    var txtEmail    = document.getElementById('email');
    var ctaSection  = document.getElementById('cta-section');

    if (testEmail(txtEmail.value)) {
      ctaSection.classList.remove('form-success');
      ctaSection.classList.remove('form-error');

      // Let's get this person signed up, quick smart! Request: GO!
      superagent
        .post(form.action)
        .send({ email: txtEmail.value })
        .end(function(response) {
          if (response.ok) {
            //
            // (•_•)
            //
            // ( •_•)>⌐■-■
            //
            // (⌐■_■)
            //
            // YEEEEEEEEEEEEEEEEEEAAAAAAAAAAAAAAHHHHHHHHHHHHHHHH!
            //
            // Let's show the visitor their approximate place in the queue.
            ctaSection.classList.add('form-success');
            document.getElementById('queue-length').innerHTML = response.body.position;

          } else {
            // Oops - something might have gone wrong.
            // Let's find out what that is.
            if (response.status === 400) {
              // Huh. Looks like they've probably signed up already.
              //
              // ¯\_(ツ)_/¯
              //
              // For all of you prying eyes out there scouring my code, yes.
              // This is an error response being interpreted and displayed as a
              // success.
              ctaSection.classList.add('form-success');
              document.getElementById('queue-length').innerHTML = "many";
            } else {
              // Fishy. The email address they used looks suspicious.
              //
              // ಠ_ಠ
              ctaSection.classList.add('form-error');
            }
          }
        });
    } else {
      ctaSection.classList.add('form-error');
    }

    return false;
  };

});
