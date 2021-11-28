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
        url: 'users/login',
      })
      .done(function () {
        console.log("123123")
      })
      .fail(function () {
        alert("failed!")
      });
  })
}


// const email = $('#email').serialize();
// const password = $('#password').serialize();

// const logInForm = $('#login-form').serialize();
