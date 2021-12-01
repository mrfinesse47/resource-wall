//the render function will read all the information from the database
//and then render it to main the nav bar will not get re rendered

const render = (view, obj) => {
  //first thing render does is empty the containers
  $("#login-article").remove();
  $("#navigation").remove();
  $("#pins-container").remove();
  $("#pin-container").remove();
  $("#signup-article").remove();
  $("#modal-holder").remove();

  navBarView(obj.auth);

  // then checks to see which page to render

  if (view === "pins") {
    console.log(obj);
    pins(obj);
  }

  // if (view === "userPins") {
  //   userPins(obj);
  // }

  if (view === "login") {
    login(obj);
  }

  if (view === "signUp") {
    signUp(obj);
  }

  if (view === "expandedPins") {
    expandedPins(obj);
  }

  // if (view === "favoritePins") {
  //   favoritePins(obj);
  // }

  if (view === "newPin") {
    newPin(obj);
  }

  //may not need you can just use the pins view

  if (view === "searchPins") {
    searchPins(obj);
  }
};
