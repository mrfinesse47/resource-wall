const expandedPins = (obj) => {
  const $createExpandedPinContainer = `<div id="pin-container">
  </div>`
  $($createExpandedPinContainer).appendTo('#main-container');



  const $pin = createExpandedPinElement(obj);
  $("#pin-container").append($pin);

  const renderComments = (obj) => {
    console.log(obj);
    obj.comments.forEach(($comment) => {
      $("#comment-section").append(createCommentElement($comment))
    })
  }
  renderComments(obj)
};
