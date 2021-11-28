const signUp = () => {

  // creates then appends the sign-up box to the main-container
  const $createArticle = `<article id="signup-article">
  </article>`
  $($createArticle).appendTo('#main-container');
  const $signUp = signUpElement();
  $("#signup-article").append($signUp);


  // creates then appends the navbar in the logged out state
  const $navBar = navBar('loggedOut');
  $($navBar).appendTo('#nav-placeholder');

  // ajax call for form submission
  $('#signup-form').submit(function (event) {
    event.preventDefault();
    $.ajax({
        method: 'POST',
        data: $(this).serialize(),
        url: 'api/users/register',
      })
      .done(function (abc) {
        render("login")
      })
      .fail(function () {
        render("login") // should return an error here
      });
  })
};
