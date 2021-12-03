// Client facing scripts here
$(document).ready(function () {
  Window.allEventListeners = {}; //created to track all the event listeners globally on the window object


  $.ajax({
      method: "GET",
      url: "api/users/auth",
      dataType: "json",
      cache: false,
    })
    .done(function (obj) {
      if (obj.auth) {
        loadPins("api/pins", (obj) => render("pins", obj));
      } else {
        render("signUp", obj);
      }
    })
    .fail(function () {
      console.log("something went wrong with server connection ajax"); // should return an error here
    });



});
