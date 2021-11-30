const favoritePins = () => {
  const $createPinContainer = `<div id="pins-container">
  </div>`
  $($createPinContainer).appendTo('#main-container');


  const renderPins = function (obj) {
    obj.pins.forEach(($pin) => {
      $("#pins-container").append(createPinElement($pin));

      $(`#${$pin.id}`).click(function (event) {
        $.ajax({
            method: 'GET',
            url: `api/pins/${$pin.id}`,
          })
          .done(function (obj) {
            console.log(obj);
            if (obj.auth) {
              render("expandedPins", obj);
            } else {
              render("login", obj);
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
        url: `api/pins/favorites`,
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



};
