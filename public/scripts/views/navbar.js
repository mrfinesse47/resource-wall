const navBarView = (auth) => {
  const $navBar = navBar(auth);
  $($navBar).appendTo('#nav-placeholder');
}
