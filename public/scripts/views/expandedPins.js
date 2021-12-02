const expandedPins = (obj) => {
  const $createExpandedPinContainer = `<div id="pin-container">
  </div>`;
  $($createExpandedPinContainer).appendTo("#main-container");

  const $pin = createExpandedPinElement(obj);
  $("#pin-container").append($pin);

  console.log(obj, "expanedpins");

  if (obj.isFavorite) {
    $(`#${$pin.id} .favorite`).removeClass("fa-heart-o");
    $(`#${$pin.id} .favorite`).addClass("fa-heart");
  }

  $(`#${$pin.id} .favorite`).click(function () {
    //here we can set a click handler for the heart
    //in order to set favorites
    //alert("clicked heart");
    $(this).addClass("fa-heart ");
    $(this).removeClass("fa-heart-o");
    // ${$pin.id}
    $.ajax({
        method: "POST",
        url: `api/pins/favorites/${$pin.id}`,
      })
      .done(function (obj) {
        console.log(obj);
        if (obj.auth) {
          // render("expandedPins", obj);
        } else {
          render("login", obj);
        }
      })
      .fail(function () {
        //should either render pins or give a notification that logout failed
      });
  });

  // const $createDiv = `<div id="favorite-container"></div>`;
  // $($createDiv).appendTo("#expanded-pin-header");
  // const $favoriteBtn = createFavoriteElement();
  // $("#favorite-container").append($favoriteBtn);

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


  $(".rating input:radio").attr("checked", false);
  $('.rating input').click(function () {
    $(".rating span").removeClass('checked');
    $(this).parent().addClass('checked');
  });

  $('input:radio').change(
    function () {
      const userRating = this.value;
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
        });;
    });

};
