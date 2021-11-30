const expandedPins = () => {
  const $createExpandedPinContainer = `<div id="pin-container">
  </div>`
  $($createExpandedPinContainer).appendTo('#main-container');






  const renderPins = function (obj) {
    obj.pins.forEach(($pin) => {
      $("#pin-container").append(createPinElement($pin));

      $(`#${$pin.id}`).click(function (event) {
        console.log("123");
        $.ajax({
            method: 'GET',
            url: `api/pins/${$pin.id}`,
          })
          .done(function (obj) {
            if (obj.auth) {
              render("expandedPins", true);
            } else {
              render("login", false);
            }
          })
          .fail(function () {
            //should either render pins or give a notification that logout failed
          });
      })
    })
  };

  const $pin = createExpandedPinElement();
  //after generating the element
  $("#pin-container").append($pin);

  const $comment = createCommentElement();

  $("#comment-section").append($comment);
  $("#comment-section").append($comment);
  $("#comment-section").append($comment);
  $("#comment-section").append($comment);
  $("#comment-section").append($comment);
};
