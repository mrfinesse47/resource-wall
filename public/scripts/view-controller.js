//the render function will read all the information from the database
//and then render it to main the nav bar will not get re rendered

const render = (view, auth) => {
  //first thing render does is empty the containers
  $('#login-article').remove();
  $('#navigation').remove();
  $('#pins-container').remove();


  navBarView(auth);


  // then checks to see which page to render

  if ((view === "pins")) {
    pins();
  }

  if ((view === "login")) {
    login();
  }

  if ((view === "signUp")) {
    signUp();
  }

  if ((view === "userPins")) {
    userPins();
  }

  if ((view === "expandedPins")) {
    expandedPins();
  }
};
