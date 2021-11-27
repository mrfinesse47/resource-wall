const pins = () => {
  $("#pins-container").empty();

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

  //we have to track all even listeners

  Window.allEventListeners.pins = ["#12345"]; //this would be a whole list of ids, the same would happen for other components

  //here we can remove event listeners, using the jquery off() function

  $(Window.allEventListeners.pins[0]).off();

  console.log(Window.allEventListeners.pins[0]);
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
