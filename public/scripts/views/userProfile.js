const userProfile = (obj) => {

  const $createArticle = `<article id="profile-article">
  </article>`;
  $($createArticle).appendTo("#main-container");

  const $profile = createUserProfileElement(obj);
  $("#profile-article").append($profile);

  //Appends error message component, then hides it by default on page load
  $("#edit-here").append(createErrorElement());
  $("#error-msg").hide();


  $("#edit-user-info").submit(function (event) {

    event.preventDefault();

    $.ajax({
        method: "POST",
        data: $(this).serialize(),
        url: "api/users/edit",
      })
      .done(function (obj) {
        if (obj.auth && obj.formError) {
          errorHandler(obj.message);
        } else {
          $.ajax({
              method: "GET",
              url: "api/users/info",
            })
            .done(function (obj) {
              if (obj.auth) {
                render("userProfile", obj)
              }
            })
            .fail(function () {
              // render("pins") // should re-render login once back end is hooked up
            });
        }
        if (!obj.auth) {
          render("login", obj);
        }
      })
      .fail(function () {
        console.log("something went wrong in signup ajax"); // should return an error here
      });
  });


}
