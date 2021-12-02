const createCommentElement = (obj) => {

  console.log(timeago.format(obj.created_at));
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
      ${$.timeago(obj.created_at)}
    </p>
  </footer>
  </article>`;
};
