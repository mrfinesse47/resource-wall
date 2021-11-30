const createNewPinElement = () => {
  return `


<form method="POST" action="/api/pins" id="create-pin" class="mb-3">
<p id="create-pin-title">Create Pin</p>

<div class="mb-3">
  <label for="create-title" class="form-label">Title</label>
  <input type="text" class="form-control" name="title" id="create-title" placeholder="Title">
</div>

<div class="mb-3">
  <label for="create-img" class="form-label">Thumbnail</label>
  <input type="url" class="form-control" id="create-img" placeholder="optional img url">
</div>
<div class="mb-3">
  <label for="create-description" class="form-label">Description</label>
  <input type="text" class="form-control" id="create-description" placeholder="Description goes here">
</div>

<div class="mb-3">
<label for="create-tag" class="form-label">Tag</label>
<input type="text" class="form-control" id="create-tag" placeholder="Put a Tag!">
</div>


<div class="mb-3">
  <label for="create-content" class="form-label">Content</label>
  <textarea class="form-control" id="create-content" rows="3"></textarea>
</div>

<div class="mb-3" id="create-box">
<button type="submit" id="createPinBtn">Create</button>
</div>

<div class="mb-3" id="cancel">
<button class="btn btn-link" id="cancel-redirect">cancel</button>
</div>

</form>
  `
}
