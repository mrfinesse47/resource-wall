const login = () => {

  // creates login-box and appends it to main-container
  const $createArticle = `<article id="login-article">
  </article>`
  $($createArticle).appendTo('#main-container');

  // creates login-form and connects it to the login-box(article)
  const $login = loginElement();
  $("#login-article").append($login);

  // creates the navbar in the logged out state and appends it to the body


  // ajax call for submission of login form
  $('#login-form').submit(function (event) {
    event.preventDefault();
    $.ajax({
        method: 'POST',
        data: $(this).serialize(),
        url: 'api/users/login',
      })
      .done(function (obj) {
        console.log(obj)
        if (obj.auth) {
          render("pins", obj);
        }

      })
      .fail(function () {
        // render("pins") // should re-render login once back end is hooked up
      });
  })


  $('#register').click(function (event) {
    event.preventDefault();
    $.ajax({
        method: 'GET',
      })
      .done(function (obj) {
        render("login")
        if (!obj.auth) {
          render("signUp", obj.auth)
        }
      })
      .fail(function () {
        console.log("something went wrong in signup redirect") //should either render pins or give a notification that logout failed

      });
  })
}
