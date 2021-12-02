const determineLikes = function (callback, obj) {
  $.ajax({
    method: "GET",
    url: "api/pins/favorites",
    cache: false,
    dataType: "json",
  })
    .done(function (likesObj) {
      // console.log(obj);

      //   console.log("likes:", obj);

      if (!likesObj.auth) {
        return render("login", obj);
      }

      const likes = [];

      likesObj.pins.forEach((like) => {
        likes.push(like.id);
      });

      callback(likes, obj);
    })
    .fail(function () {
      console.log("something went wrong in loadPins ajax"); // should return an error here
    });
};
