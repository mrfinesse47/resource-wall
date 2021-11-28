const signUp = () => {
  const $createArticle = `<article id="signup-article">
  </article>`
  $($createArticle).appendTo('#main-container');



  const $signUp = signUpElement();
  $("#signup-article").append($signUp);



  const $navBar = navBar('loggedOut');
  $($navBar).appendTo('#nav-placeholder');


  $('#signup-form').submit(function (event) {
    event.preventDefault();
    $.ajax({
        method: 'POST',
        data: $(this).serialize(),
        url: 'api/users/register',
      })
      .done(function (abc) {
        console.log(abc)
        render("pins")
      })
      .fail(function () {
        render("login")
      });
  })
};
