const expandedPins = (obj) => {
  const $createExpandedPinContainer = `<div id="pin-container">
  </div>`
  $($createExpandedPinContainer).appendTo('#main-container');


  const $pin = createExpandedPinElement(obj);
  $("#pin-container").append($pin);

  const $createDiv = `<div class="favorite-container"></div>`
  $($createDiv).appendTo('#expanded-pin-header');
  const $favoriteBtn = createFavoriteElement();
  $('#favorite-container').append($favoriteBtn);

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
        if (obj.auth) {
          render("expandedPins", obj);
        } else {
          render("login", obj)
        }

      })
      .fail(function () {
        // render("pins") // should re-render login once back end is hooked up
      });
  })

};
