const login = () => {

  // creates login-box and appends it to main-container
  const $createArticle = `<article id="login-article">
  </article>`
  $($createArticle).appendTo('#main-container');

  // creates login-form and connects it to the login-box(article)
  const $login = loginElement();
  $("#login-article").append($login);

  // creates the navbar in the logged out state and appends it to the body
  const $navBar = navBar('loggedOut');
  $($navBar).appendTo('#nav-placeholder');

  // ajax call for submission of login form
  $('#login-form').submit(function (event) {
    console.log("123");
    event.preventDefault();
    $.ajax({
        method: 'POST',
        data: $(this).serialize(),
        url: 'api/users/login',
      })
      .done(function (abc) {
        console.log(abc)
        render("pins")
      })
      .fail(function () {
        // render("pins") // should re-render login once back end is hooked up
      });
  })
}
