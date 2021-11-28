const login = () => {
  const $createArticle = `<article id="login-article">
  </article>`
  $($createArticle).appendTo('#main-container');

  const $login = loginElement();
  $("#login-article").append($login);

  const $navBar = navBar('loggedOut');
  $($navBar).appendTo('#nav-placeholder');
}
