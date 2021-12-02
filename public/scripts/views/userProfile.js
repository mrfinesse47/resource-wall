const userProfile = (obj) => {

  const $createArticle = `<article id="profile-article">
  </article>`;
  $($createArticle).appendTo("#main-container");

  const $profile = createUserProfileElement();
  $("#profile-article").append($profile);


  $("#edit-user-info").submit(function (event) {

    event.preventDefault();

    $.ajax({
        method: "POST",
        data: $(this).serialize(),
        url: "api/users/edit",
      })
      .done(function (obj) {
        console.log(obj);
        if (obj.auth) {
          render("userProfile", obj)
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
