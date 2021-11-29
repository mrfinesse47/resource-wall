const signUp = () => {

  // creates then appends the sign-up box to the main-container
  const $createArticle = `<article id="signup-article">
  </article>`
  $($createArticle).appendTo('#main-container');
  const $signUp = signUpElement();
  $("#signup-article").append($signUp);

  // ajax call for form submission
  $('#sign-up-user').submit(function (event) {
    console.log(event);
    event.preventDefault();

    $.ajax({
        method: 'POST',
        data: $(this).serialize(),
        url: 'api/users/signup',
      })
      .done(function (obj) {
        console.log(obj)
        if (obj.auth) {
          render("pins", obj.auth);
        }
        if (!obj.auth) {
          render("login", obj.auth)
        }
      })
      .fail(function () {
        console.log("something went wrong in signup ajax") // should return an error here
      });
  })
};
