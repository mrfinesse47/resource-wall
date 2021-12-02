const likeToggler = function (id, likes, el) {
  if (likes.includes(id)) {
    $(el).addClass("fa-heart-o ");
    $(el).removeClass("fa-heart");

    likes = likes.filter((like) => like !== id);

    $.ajax({
      method: "POST",
      url: `api/pins/favorites/${id}/delete`,
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
    $(el).addClass("fa-heart ");
    $(el).removeClass("fa-heart-o");

    likes.push(id);

    // console.log($pin.id);
    // ${$pin.id}
    $.ajax({
      method: "POST",
      url: `api/pins/favorites/${id}`,
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
};

//going to do a server request here and then toggle its state
