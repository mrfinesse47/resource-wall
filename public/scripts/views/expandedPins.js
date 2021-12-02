const expandedPins = (obj) => {
  const $createExpandedPinContainer = `<div id="pin-container">
  </div>`;
  $($createExpandedPinContainer).appendTo("#main-container");

  const $pin = createExpandedPinElement(obj);
  $("#pin-container").append($pin);

  console.log(obj, "expanedpins");

  const $appendComment = (obj) => {
    $("#comment-prepend").prepend(createCommentElement(obj.comment));
  };

  const renderComments = (obj) => {
    console.log(obj);
    obj.comments.forEach(($comment) => {
      $("#comment-prepend").prepend(createCommentElement($comment));
    });
  };

  // if (obj.isFavorite) {
  //   $(`#${$pin.id} .favorite`).removeClass("fa-heart-o");
  //   $(`#${$pin.id} .favorite`).addClass("fa-heart");
  // }

  determineLikes((likes) => {
    console.log(obj.pin.id);
    console.log(likes);

    if (likes.includes(obj.pin.id)) {
      //console.log("pin id", $pin.id, $pin.isFavorite);
      $(`#${obj.pin.id} .favorite`).removeClass("fa-heart-o");
      $(`#${obj.pin.id} .favorite`).addClass("fa-heart");
    } else {
      $(`#${obj.pin.id} .favorite`).removeClass("fa-heart");
      $(`#${obj.pin.id} .favorite`).addClass("fa-heart-o");
    }

    likeToggler(obj.pin.id, likes);

    renderComments(obj);

    $(".rating input:radio").attr("checked", false);
    $(".rating input").click(function () {
      $(".rating span").removeClass("checked");
      $(this).parent().addClass("checked");
    });

    $("input:radio").change(function () {
      const userRating = $(this).serialize();
      console.log(userRating, "userRating");
      $.ajax({
        method: "POST",
        data: userRating,
        url: `api/pins/${obj.pin.id}/rating`,
      })
        .done(function (obj) {
          if (!obj.auth) {
            render("login", obj);
          }
        })
        .fail(function () {
          // render("pins") // should re-render login once back end is hooked up
        });
    });

    $("#comment").submit(function (event) {
      event.preventDefault();
      $.ajax({
        method: "POST",
        data: $(this).serialize(),
        url: `api/pins/${obj.pin.id}/comments`,
      })
        .done(function (obj) {
          if (obj.auth) {
            $appendComment(obj);
          } else {
            render("login", obj);
          }
        })
        .fail(function () {
          // render("pins") // should re-render login once back end is hooked up
        });
    });
  }, obj);
};
