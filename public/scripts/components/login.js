const loginElement = () => {
  return `
  <form method="POST" action="/api/users/login" id="login-form" class="login-form">
  <p id="login-title">Log In</p>
  <div class="login-form">
    <input id="email" type="email" name="email" placeholder="Email">
  </div>

  <div class="login-form">
      <input id="password" type="password" name="password" placeholder="Password">
    </div>

  <div class="login-form" id="login-box">
      <button id="loginbtn">Login</button>
  </div>

  <div class="login-form" id="sign-up-redirect">
  <button id="register">Register</button>
  </div>
</form>
`
}
// needs to be dynamic


// <button type="button" name="computer_science" class="btn btn-group-sm">Computer Science</button>
// <button type="button" name="chemistry" class="btn btn-group-sm">Chemistry</button>
// <button type="button" name="philosophy" class="btn btn-group-sm">Philosophy</button>
// <button type="button" name="art" class="btn btn-group-sm">Art</button>
// <button type="button" name="physics" class="btn btn-group-sm">Physics</button>
// <button type="button" name="biology" class="btn btn-group-sm">Biology</button>
{
  /* <button type="button" name="english" class="btn btn-group-sm">English</button> */
}
