const innerPins = () => {
  const $createPinContainer = `<div id="pins-container">
  </div>`
  $($createPinContainer).appendTo('#main-container');

  const $navBar = navBar('loggedIn');
  $($navBar).appendTo('#nav-placeholder');
  // Move somewhere to reduce redundancy

  //and then it appends everything to the screen
  //maybe we do a foreach loop


  //you would call AJAX here and send it into the createpin element with the ID and whatnot
  const $pin = createPinElement();
  //after generating the element
  $("#pins-container").append($pin);

  //we have to bind a click listener onto the new item after it is appended
  $("#12345").click(function () {
    alert("12345 clicked");
  });

  //we can append as many as we want.
  $("#pins-container").append($pin);
  $("#pins-container").append($pin);
  $("#pins-container").append($pin);
  $("#pins-container").append($pin);
  $("#pins-container").append($pin);
  $("#pins-container").append($pin);
  $("#pins-container").append($pin);
  $("#pins-container").append($pin);
};
