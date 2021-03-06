const login = (obj) => {
  // creates login-box and appends it to main-container
  const $createArticle = `<article id="login-article">
  </article>`;
  $($createArticle).appendTo("#main-container");



  // creates login-form and connects it to the login-box(article)
  const $login = loginElement();
  $("#login-article").append($login);

  $("#login-title").append(createErrorElement());
  $("#error-msg").hide();


  // ajax call for submission of login form
  $("#login-form").submit(function (event) {
    event.preventDefault();
    $.ajax({
        method: "POST",
        data: $(this).serialize(),
        url: "api/users/login",
      })
      .done(function (obj) {
        console.log(obj);
        if (obj.auth) {
          loadPins("api/pins", (obj) => render("pins", obj));
        } else {
          errorHandler(obj.message);

        }
      })
      .fail(function () {
        console.log("something went wrong in login") // should re-render login once back end is hooked up
      });
  });

  $("#register").click(function (event) {
    event.preventDefault();
    $.ajax({
        method: "GET",
        url: "api/users/auth",
      })
      .done(function (obj) {
        if (!obj.auth) {
          render("signUp", obj);
        }
      })
      .fail(function () {
        console.log("something went wrong in signup redirect"); //should either render pins or give a notification that logout failed
      });
  });
};
