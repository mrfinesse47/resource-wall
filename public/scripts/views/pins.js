const pins = (obj) => {
  const $createPinContainer = `<div id="pins-container">
  </div>`;
  $($createPinContainer).appendTo("#main-container");

  determineLikes((likes) => {
    //brings back an array of pin ids
    obj.pins.forEach(($pin) => {
      $("#pins-container").append(createPinElement($pin));
      //renders the inital likes to the pins
      if (likes.includes($pin.id)) {
        //console.log("pin id", $pin.id, $pin.isFavorite);
        $(`#${$pin.id} .favorite`).removeClass("fa-heart-o");
        $(`#${$pin.id} .favorite`).addClass("fa-heart");
      } else {
        $(`#${$pin.id} .favorite`).removeClass("fa-heart");
        $(`#${$pin.id} .favorite`).addClass("fa-heart-o");
        $(`#${$pin.id} .favorite`).addClass("fa-heart-o");
      }

      likeToggler($pin.id, likes);

      $(`#${$pin.id} img`).click(function (event) {
        $.ajax({
          method: "GET",
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
      });
    });
  }, obj);

  // const loadPins = function () {
  //   $.ajax({
  //       method: 'GET',
  //       url: "api/pins",
  //       cache: false,
  //       dataType: "json",
  //     })
  //     .done(function (obj) {
  //       console.log(obj);
  //       renderPins(obj);
  //     })
  //     .fail(function () {
  //       console.log("something went wrong in loadPins ajax") // should return an error here
  //     });
  // };

  // loadPins();
};
