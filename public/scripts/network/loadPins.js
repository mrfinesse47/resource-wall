const loadPins = function (url, callback) {
  $.ajax({
      method: "GET",
      url,
      cache: false,
      dataType: "json",
    })
    .done(function (obj) {


      if (!obj.auth) {
        return render("login", obj);
      }

      callback(obj);
    })
    .fail(function () {
      console.log("something went wrong in loadPins ajax"); // should return an error here
    });
};
