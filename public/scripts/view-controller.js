const render = (view, obj) => {
  //first thing render does is empty the containers
  $("#login-article").remove();
  $("#navigation").remove();
  $("#pins-container").remove();
  $("#pin-container").remove();
  $("#signup-article").remove();
  $("#modal-holder").remove();
  $("#profile-article").remove();
  $("#nothing-here").remove();
  navBarView(obj);

  // then checks to see which page to render

  if (view === "pins") {
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

  if (view === "userProfile") {
    userProfile(obj);
  }

  // if (view === "searchPins") {
  //   searchPins(obj);
  // }
};
