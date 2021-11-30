const createCommentElement = (obj) => {
  console.log(obj, "123");
  return `
  <article class="comment" id="comment-list">
  <header class="comment-header">
    <div class="name">
      <h6 class="FirstName">
        ${obj.first_name} ${obj.last_name}
    </div>
  </header>
  <p class="comment-text">
   ${obj.comment}
  </p>
  <hr class="comment-line"/>
  <footer class="comment-footer">
    <p class="comment-time">
      ${obj.created_at}
    </p>
  </footer>
  </article>`

}
