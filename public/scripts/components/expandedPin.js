const createExpandedPinElement = (obj) => {

  return `
  <article id="expanded-pin">
  <h3 class="title">
  ${obj.title}
  </h3>
  <header class="image-container">
    <img
      src="${obj.image}"
    />
  </header>
  <footer>
    <p class="description">
    ${obj.description}
    </p>
    <p class="content">
    ${obj.content}
    </p>
    <div class="info">
      <h5>
      ${obj.tag}
      </h5>
      <div class="rating">
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
        <i class="fa fa-star" aria-hidden="true"></i>
      </div>
    </div>
  </footer>
  </article>

  <div id="comment-section">
  <section class="new-comment">
  <form method="POST" action="/comments" id="comment-box">
    <div class="error"></div>
    <textarea name="comment" id="comment-box" placeholder="Somethiing to say?"></textarea>
    <div class="footer">
      <button type="submit" id="commentBtn">submit</button>
      <output name="counter" class="counter" for="comment-box">140</output>
    </div>
  </form>
  </section>
  </div>
  `;

};

// needs to be dynamic
