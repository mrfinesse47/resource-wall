const signUp = () => {
  // creates then appends the sign-up box to the main-container
  const $createArticle = `<article id="signup-article">
  </article>`;
  $($createArticle).appendTo("#main-container");
  const $signUp = signUpElement();
  $("#signup-article").append($signUp);

  // ajax call for form submission
  $("#sign-up-user").submit(function (event) {
    console.log(event);
    event.preventDefault();

    $.ajax({
        method: "POST",
        data: $(this).serialize(),
        url: "api/users/signup",
      })
      .done(function (obj) {
        console.log(obj);
        if (obj.auth) {
          loadPins("api/pins", (obj) => render("pins", obj));
        }
        if (!obj.auth) {
          render("login", obj);
        }
      })
      .fail(function () {
        console.log("something went wrong in signup ajax"); // should return an error here
      });
  });

  $("#loginredirect").click(function (event) {
    event.preventDefault();
    $.ajax({
        method: "GET",
        url: "api/users/auth",
      })
      .done(function (obj) {
        if (!obj.auth) {
          render("login", obj);
        } else {
          loadPins("api/pins", (obj) => render("pins", obj));
        }
      })
      .fail(function () {
        console.log("something went wrong in signup redirect"); //should either render pins or give a notification that logout failed
      });
  });
};
