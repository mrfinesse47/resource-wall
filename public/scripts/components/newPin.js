const createNewPinElement = () => {
  return `

  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#createPinModal">
    <i class="fas fa-plus-circle"></i>
  </button>

  <div class="modal fade" id="createPinModal" tabindex="-1" role="dialog" aria-labelledby="createPinModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createPinModalLabel">Create a Pin</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

        <form method="POST" action="/api/users/newpin" id="newpin-form" class="newpin-form">
        <p class="form-entry">Title</p>
        <div class="newpin-form"">
          <input id=" pin-title" type="text" name="title" placeholder="example Title">
        </div>

        <p class="form-entry">URL</p>
        <div class="newpin-form">
          <input id="pin-url" type="url" name="URL" placeholder="Pin URL">
        </div>
        <p class="form-entry">IMG URL(If You Have One)</p>
        <div class="newpin-form"">
            <input id=" pin-image-url" type="url" name="Image URL" placeholder="Img URL">
        </div>

        <p class="form-entry">Description</p>
        <div class="newpin-form"">
        <input id=" pin-description" type="text" name="description" placeholder="Describe this Pin!">
        </div>
        <p class="form-entry">Content</p>
        <div class="newpin-form"">
        <input id=" pin-content" type="text" name="content" placeholder="Your thoughts go here!">
        </div>
        <p class="form-entry">Tags</p>
        <div class="newpin-form"">
        <input id=" pin-content" type="text" name="tag" placeholder="tag!">
        </div>


        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" id="submit-new-pin" class="btn btn-primary">Create</button>
        </div>
      </div>
    </div>
  </div>
  `
}
