const createCommentElement = (obj) => {
  let creation = obj.created_at.replace('T', ' ');
  let final = creation.split(('.')[0]);

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
      ${final[0]}
    </p>
  </footer>
  </article>`;
};
