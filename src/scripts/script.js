System.import('app').catch(function(err){ console.error(err); });
(function(){
  var redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect != location.href) {
    history.replaceState (null, null, redirect);
  }
})();

$(document).ready (function() {
  $("#background-img").fadeIn (500);
  $("#app").fadeIn(1000);
});
