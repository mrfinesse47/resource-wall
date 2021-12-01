const userProfile = (obj) => {

  const $createArticle = `<article id="profile-article">
  </article>`;
  $($createArticle).appendTo("#main-container");

  const $profile = createUserProfileElement();
  $("#profile-article").append($profile);
}
