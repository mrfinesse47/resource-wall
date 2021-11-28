// Client facing scripts here
$(document).ready(function () {
  Window.allEventListeners = {}; //created to track all the event listeners globally on the window object
  render("pins");

  const logIn = function () {
    $.ajax({
      method: 'GET',
      url: "/login",
      data: $("logIn").serialize(),
      dataType: "json",
      success: function (data) {


      }

    });
  };

});
