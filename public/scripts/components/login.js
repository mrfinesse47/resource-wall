const loginElement = () => {
  return `
  <form id="login-form" class="login-form">
  <p>Login</p>
  <div class="login-form">
    <input type="email" name="email" placeholder="Email">
  </div>

  <div class="login-form">
      <input type="password" name="password" placeholder="Password">
    </div>

  <div class="login-form">
      <button>Login</button>
      <a id="login-form" href="#">Cancel</a>
  </div>
</form>
`
}
