const loadPins = function (url, callback) {
  $.ajax({
    method: "GET",
    url,
    cache: false,
    dataType: "json",
  })
    .done(function (obj) {
      // console.log(obj);
      $.ajax({
        method: "GET",
        url: "/api/pins/favorites/",
        cache: false,
        dataType: "json",
      })
        .done(function (fav) {
          const favArr = [];
          fav.pins.forEach((pin) => {
            //  console.log(pin.id);
            favArr.push(pin.id);
          });
          obj.favs = favArr;
          // console.log(fav);
          callback(obj);
        })
        .fail(function () {
          console.log("something went wrong with loading favorites"); // should return an error here
        });
    })
    .fail(function () {
      console.log("something went wrong in loadPins ajax"); // should return an error here
    });
};
