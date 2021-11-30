//the render function will read all the information from the database
//and then render it to main the nav bar will not get re rendered

const render = (view, obj) => {
  //first thing render does is empty the containers
  $('#login-article').remove();
  $('#navigation').remove();
  $('#pins-container').remove();
  $('#pin-container').remove();
  $('#signup-article').remove();
  $('#modal-holder').remove();

  navBarView(obj.auth);


  // then checks to see which page to render

  if ((view === "pins")) {
    pins();
  }

  if ((view === "userPins")) {
    userPins();
  }

  if ((view === "login")) {
    login();
  }

  if ((view === "signUp")) {
    signUp();
  }

  if ((view === "expandedPins")) {
    expandedPins(obj);
  }

  if ((view === "favoritePins")) {
    favoritePins();
  }

  if ((view === "newPin")) {
    newPin();
  }
};
