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
      }

      $(`#${$pin.id} .favorite`).click(function () {
        //here we can set a click handler for the heart
        //in order to set favorites

        //need to determine if it is liked

        if (likes.includes($pin.id)) {
          $(this).addClass("fa-heart-o ");
          $(this).removeClass("fa-heart");

          likes = likes.filter((like) => like !== $pin.id);

          $.ajax({
            method: "POST",
            url: `api/pins/favorites/${$pin.id}/delete`,
          })
            .done(function (obj) {
              // console.log(obj);
              if (!obj.auth) {
                render("login", obj);
              }
            })
            .fail(function () {
              //should either render pins or give a notification that logout failed
            });
        } else {
          $(this).addClass("fa-heart ");
          $(this).removeClass("fa-heart-o");

          likes.push($pin.id);

          // console.log($pin.id);
          // ${$pin.id}
          $.ajax({
            method: "POST",
            url: `api/pins/favorites/${$pin.id}`,
          })
            .done(function (obj) {
              // console.log(obj);
              if (!obj.auth) {
                // render("expandedPins", obj);
                render("login", obj);
              }
            })
            .fail(function () {
              //should either render pins or give a notification that logout failed
            });
        }
        //going to do a server request here and then toggle its state
      });

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
