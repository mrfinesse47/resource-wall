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
  <button class="btn btn-link" id="register">Register</button>
  </div>
</form>
`
}
