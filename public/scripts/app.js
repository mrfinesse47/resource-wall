// Client facing scripts here
$(document).ready(function () {
  Window.allEventListeners = {}; //created to track all the event listeners globally on the window object

  //render("signUp", false);

  $.ajax({
      method: "GET",
      url: "api/users/auth",
      dataType: "json",
      cache: false,
    })
    .done(function (obj) {
      if (obj.auth) {
        console.log("123123123123");
        render("pins", true);
      } else {
        render("signUp", false);
      }
    })
    .fail(function () {
      console.log("something went wrong with server connection ajax"); // should return an error here
    });
});
