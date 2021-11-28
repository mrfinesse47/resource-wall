const login = () => {
  const $createArticle = `<article id="login-article">
  </article>`
  $($createArticle).appendTo('#main-container');

  const $login = loginElement();
  $("#login-article").append($login);

  const $navBar = navBar('loggedOut');
  $($navBar).appendTo('#nav-placeholder');

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
        render("pins")
      });
  })
}
