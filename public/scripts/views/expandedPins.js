const expandedPins = (obj) => {
  const $createExpandedPinContainer = `<div id="pin-container">
  </div>`;
  $($createExpandedPinContainer).appendTo("#main-container");

  const $pin = createExpandedPinElement(obj);
  $("#pin-container").append($pin);

  const $createDiv = `<div id="favorite-container"></div>`;
  $($createDiv).appendTo("#expanded-pin-header");
  const $favoriteBtn = createFavoriteElement();
  $("#favorite-container").append($favoriteBtn);

  const $appendComment = (obj) => {
    $("#comment-prepend").prepend(createCommentElement(obj.comment));
  };

  const renderComments = (obj) => {
    console.log(obj);
    obj.comments.forEach(($comment) => {
      $("#comment-prepend").prepend(createCommentElement($comment));
    });
  };

  renderComments(obj);

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
};
