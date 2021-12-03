const createNewPinElement = () => {
  return `


<form method="POST" action="/api/pins" id="create-pin" class="mb-3">
<p id="create-pin-title">Create Pin</p>

<div class="mb-3">
  <label for="create-title" class="form-label">Title</label>
  <input type="text" class="form-control" id="create-title" name="title" placeholder="Title">
</div>


<div class="mb-3">
  <label for="create-description" class="form-label">Description</label>
  <input type="text" class="form-control" id="create-description" name="description" placeholder="Description goes here">
</div>

<div class="mb-3">
<label for="select-tag" class="form-label">Choose a tag</label>
<select class="form-select" name="tag" id="select-tag" aria-label="Default select example">
  <option value="1">Computer Science</option>
  <option value="2">Biology</option>
  <option value="3">Chemistry</option>
  <option value="4">Physics</option>
  <option value="5">English</option>
  <option value="6">Geography</option>
  <option value="7">History</option>
  <option value="8">Psychology</option>
  <option value="9">Philosophy </option>
  <option value="10">Art</option>
</select>
</div>

<div class="mb-3">
  <label for="create-content" class="form-label">Content</label>
  <textarea class="form-control" id="create-content" name="content" rows="3"></textarea>
</div>

<div class="mb-3" id="create-box">
<button type="submit" id="createPinBtn">Create</button>
</div>

<div class="mb-3" id="cancel">
<button class="btn btn-link" id="cancel-redirect">cancel</button>
</div>

</form>
  `;
};


// <div class="mb-3">
// <label for="create-tag" class="form-label">Tag</label>
// <input type="text" class="form-control" id="create-tag" name="tag" placeholder="Put a Tag!">
// </div>
