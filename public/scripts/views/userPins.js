const userPins = () => {
  const $createPinContainer = `<div id="pins-container">
  </div>`
  $($createPinContainer).appendTo('#main-container');


  const renderPins = function (obj) {
    obj.pins.forEach(($pin) => {
      $("#pins-container").append(createPinElement($pin));

      $(`#${$pin.id}`).click(function (event) {
        console.log("123");
        $.ajax({
            method: 'GET',
            url: `api/pins/${$pin.id}`,
          })
          .done(function (obj) {
            if (obj.auth) {
              render("expandedPins", true);
            } else {
              render("login", false);
            }
          })
          .fail(function () {
            //should either render pins or give a notification that logout failed
          });
      })
    })
  };



  const loadPins = function () {
    $.ajax({
        method: 'GET',
        url: `api/pins/owned`,
        cache: false,
        dataType: "json",
      })
      .done(function (obj) {
        renderPins(obj);
      })
      .fail(function () {
        console.log("something went wrong in loadPins ajax") // should return an error here
      });
  };

  loadPins();


  $('#logout-btn').click(function (event) {
    event.preventDefault();
    $.ajax({
        method: 'POST',
        data: {
          action: 'logout'
        },
        url: 'api/users/logout',
      })
      .done(function () {
        render("login")
      })
      .fail(function () {
        render("login") //should either render pins or give a notification that logout failed

      });
  })
};
