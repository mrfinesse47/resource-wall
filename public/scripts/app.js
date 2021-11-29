// Client facing scripts here
$(document).ready(function () {
  Window.allEventListeners = {}; //created to track all the event listeners globally on the window object

  $.ajax({
      method: 'GET',
      url: "api/users/auth",
      dataType: "json",
    })
    .done(function (obj) {
      if (obj.auth) {
        render("pins", true);
      } else {
        render("login", false);
      }
    })
    .fail(function () {
      console.log("something went wrong with server connection ajax") // should return an error here
    })
});
