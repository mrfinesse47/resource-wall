const signUpElement = () => {
  return `
  <form class="sign-in-form">
  <p id="login-title">Log In</p>
  <div class="login-form">
    <input type="email" name="email" placeholder="Email">
  </div>

  <div class="login-form">
      <input type="password" name="password" placeholder="Password">
    </div>

  <div class="login-form" id="login-box">
      <button id="loginbtn">Login</button>
  </div>
</form>
`
}
