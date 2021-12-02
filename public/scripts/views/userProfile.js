const userProfile = (obj) => {

  const $createArticle = `<article id="profile-article">
  </article>`;
  $($createArticle).appendTo("#main-container");

  const $profile = createUserProfileElement(obj);
  $("#profile-article").append($profile);


  $("#edit-user-info").submit(function (event) {

    event.preventDefault();

    $.ajax({
        method: "POST",
        data: $(this).serialize(),
        url: "api/users/edit",
      })
      .done(function (obj) {
        // console.log(obj, "123123123");
        if (obj.auth) {
          $.ajax({
              method: "GET",
              url: "api/users/info",
            })
            .done(function (obj) {
              console.log(obj, "123");
              if (obj.auth && !obj.formError) {
                render("userProfile", obj)
              } else {
                errorHandler(obj.message);
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
