const likeToggler = function (id, likes) {
  $(`#${id} .favorite`).click(function () {
    //here we can set a click handler for the heart

    if (likes.includes(id)) {
      $(this).addClass("fa-heart-o ");
      $(this).removeClass("fa-heart");

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
      $(this).addClass("fa-heart ");
      $(this).removeClass("fa-heart-o");

      likes.push(id);

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
  });
};
