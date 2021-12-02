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

    //need to check with network to see if user already has input a rating
    //if they do we just set this to a fixed rating

    userRatings(obj);

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

function userRatings(expandedPin) {
  $.ajax({
    method: "GET",
    url: `api/pins/${expandedPin.pin.id}/rating`,
  })
    .done(function (obj) {
      if (obj.auth) {
        console.log(obj);
        if (obj.rating) {
          //if it already has a rating by the user
          $(".form-label").text("Your Rating");
          // console.log(obj.rating.rating);
          for (let i = 1; i <= obj.rating.rating; i++) {
            $(`.fa-star.${i}`).addClass("checked");
          }
        } else {
          //if it does not have a reting by the user
          for (let i = 1; i <= 5; i++) {
            $(`.fa-star.${i}`).hover(
              function () {
                $(this).css("cursor", "pointer");
                $(this).addClass("checked");
                for (let j = 1; j < i; j++) {
                  $(`.fa-star.${j}`).addClass("checked");
                }
              },
              function () {
                $(this).removeClass("checked");
                for (let j = 1; j < i; j++) {
                  $(`.fa-star.${j}`).removeClass("checked");
                }
              }
            );
            $(`.fa-star.${i}`).click(() => {
              //if not already rated send rating
              alert(`clicked ${i}`);

              const rating = i;

              $.ajax({
                method: "POST",
                data: { rating },
                url: `api/pins/${expandedPin.pin.id}/rating`,
              })
                .done(function (obj) {
                  if (obj.auth) {
                    // $appendComment(obj);
                    $(".form-label").text("Your rating");
                    //remove event listeners
                    console.log(obj.result.rating);
                    for (let i = 1; i <= 5; i++) {
                      $(`.fa-star.${i}`).off("mouseenter mouseleave");
                      $(`.fa-star.${i}`).off("click");
                      $(`.fa-star.${i}`).css("cursor", "auto");
                    }
                    for (let i = 1; i <= obj.result.rating; i++) {
                      $(this).addClass("checked");

                      $(`.fa-star.${i}`).addClass("checked");
                    }
                  } else {
                    render("login", obj);
                  }
                })
                .fail(function () {
                  // render("pins") // should re-render login once back end is hooked up
                });

              //will have  to remove click handlers

              // $('.pippo').off('click')
            });
          }
        }
      } else {
        render("login", obj);
      }
    })
    .fail(function () {
      // render("pins") // should re-render login once back end is hooked up
    });
}
