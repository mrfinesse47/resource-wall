const expandedPins = (obj) => {
  const $createExpandedPinContainer = `<div id="pin-container">
  </div>`
  $($createExpandedPinContainer).appendTo('#main-container');


  const $pin = createExpandedPinElement(obj);
  $("#pin-container").append($pin);

  const $createDiv = `<div id="favorite-container"></div>`
  $($createDiv).appendTo('#expanded-pin-header');
  const $favoriteBtn = createFavoriteElement();
  $('#favorite-container').append($favoriteBtn);

  const $appendComment = (obj) => {
    $("#comment-section").append(createCommentElement(obj))
  }


  const renderComments = (obj) => {
    console.log(obj);
    obj.comments.forEach(($comment) => {
      $("#comment-section").append(createCommentElement($comment))
    })
  }

  renderComments(obj)

  $('#commentBtn').click(function (event) {
    event.preventDefault();
    $.ajax({
        method: 'POST',
        url: `api/pins/${obj.pin.id}/comments`
      })
      .done(function (obj) {
        console.log(obj, "321321312");
        if (obj.auth) {
          $appendComment(obj.comment);
        } else {
          render("login", obj)
        }

      })
      .fail(function () {
        // render("pins") // should re-render login once back end is hooked up
      });
  })

};
