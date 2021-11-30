const expandedPins = (obj) => {
  const $createExpandedPinContainer = `<div id="pin-container">
  </div>`
  $($createExpandedPinContainer).appendTo('#main-container');




  const $pin = createExpandedPinElement(obj);
  //after generating the element
  $("#pin-container").append($pin);

  const $comment = createCommentElement();

  $("#comment-section").append($comment);
  $("#comment-section").append($comment);
  $("#comment-section").append($comment);
  $("#comment-section").append($comment);
  $("#comment-section").append($comment);
};
