const searchPins = () => {
  const $createPinContainer = `<div id="pins-container">
  </div>`
  $($createPinContainer).appendTo('#main-container');


  // Move somewhere to reduce redundancy

  //and then it appends everything to the screen
  //maybe we do a foreach loop



  const renderPins = function (obj) {
    obj.pins.forEach(($pin) => {
      $("#pins-container").append(createPinElement($pin));

      $(`#${$pin.id}`).click(function (event) {
        $.ajax({
            method: 'GET',
            url: `api/pins/${$pin.id}`,
          })
          .done(function (obj) {
            console.log(obj)
            if (obj.auth) {
              render("searchPins", obj);
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
        url: "api/pins/search",
        cache: false,
        dataType: "json",
      })
      .done(function (obj) {
        console.log(obj);
        renderPins(obj);
      })
      .fail(function () {
        console.log("something went wrong in loadPins ajax") // should return an error here
      });
  };

  loadPins();



};
