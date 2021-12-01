const createUserProfileElement = () => {

  return `
<header id="profile-header">
  <h3>Firstname Lastname</h3>
</header>

<section class="user-info">
  <p id="user-email">email goes here</p>
</section>

<div>
  <form method="POST" action="api/users/user_id/edit" id="edit-user-info" class="edit-info">
    <h5 class="edit-info">Edit Your Info</h5>

    <div class="edit-info">
      <label for="edit-first-name" class="edit-info">First Name</label>
      <input type="text" class="form-control" name="first_name" id="edit-first-name" placeholder="First Name">
    </div>

    <div class="edit-info">
      <label for="edit-last-name" class="edit-info">Last Name</label>
      <input type="text" class="form-control" name="last_name" id="edit-last-name" placeholder="Last Name">
    </div>

    <div class="edit-info">
      <label for="edit-email" class="edit-info">Email</label>
      <input type="email" class="form-control" name="email" id="edit-email" placeholder="email@example.com">
    </div>

    <div class="edit-info">
      <label for="edit-password" class="edit-info">Password</label>
      <input type="password" class="form-control" name="password" id="edit-password">
    </div>

    <div class="edit-info" id="edit-box">
      <button type="submit" id="edit-profile-btn">Edit</button>
    </div>

  </form>
</div>
  `
}