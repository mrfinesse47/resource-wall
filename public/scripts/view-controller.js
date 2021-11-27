//the render function will read all the information from the database
//and then render it to main the nav bar will not get re rendered

const render = () => {
  $("#pins-container").empty();
  const $pin = createPinElement();
  $("#pins-container").append($pin);
  $("#pins-container").append($pin);
  $("#pins-container").append($pin);
  $("#pins-container").append($pin);
  $("#pins-container").append($pin);
  $("#pins-container").append($pin);
  $("#pins-container").append($pin);
  $("#pins-container").append($pin);
};
