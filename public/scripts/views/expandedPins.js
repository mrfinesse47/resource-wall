const expandedPins = () => {
  const $createExpandedPinContainer = `<div id="pin-container">
  </div>`
  $($createExpandedPinContainer).appendTo('#main-container');

  const $navBar = navBar('loggedIn');
  $($navBar).appendTo('#nav-placeholder');



  const $pin = createExpandedPinElement();
  //after generating the element
  $("#pin-container").append($pin);

  const $comment = createCommentElement();
  $("#comment-section").append($comment);
};
