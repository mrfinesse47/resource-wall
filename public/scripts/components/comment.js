const createCommentElement = (comment) => {
  console.log(comment);
  return `
  <article class="comment" id="comment-list">
  <header class="comment-header">
    <div class="name">
      <h6 class="FirstName">
        ${first_name} ${last_name}
    </div>
  </header>
  <p class="comment-text">
   ${comment.comment}
  </p>
  <hr class="comment-line"/>
  <footer class="comment-footer">
    <p class="comment-time">
      ${comment.created_at}
    </p>
  </footer>
  </article>`

}
