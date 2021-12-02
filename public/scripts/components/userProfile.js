const createUserProfileElement = (obj) => {
  console.log(obj.userInfo)
  return `
<header id="profile-header">
  <h3>${obj.userInfo.first_name} ${obj.userInfo.last_name}</h3>
</header>

<section class="user-info">
  <p id="user-email">Email: ${obj.userInfo.email}</p>
</section>

<div>
  <form method="POST" action="api/users/edit" id="edit-user-info" class="edit-info">
    <h5 class="edit-info">Edit Your Info</h5>

    <div class="edit-info">
      <label for="edit-first-name" class="edit-info">First Name</label>
      <input type="text" class="form-control" name="FirstName" id="edit-first-name" placeholder="${obj.userInfo.first_name}">
    </div>

    <div class="edit-info">
      <label for="edit-last-name" class="edit-info">Last Name</label>
      <input type="text" class="form-control" name="LastName" id="edit-last-name" placeholder="${obj.userInfo.last_name}">
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
