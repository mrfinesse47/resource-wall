const createExpandedPinElement = (obj) => {
  //console.log("the obj id is:", obj.pin.id);
  const rating = Math.round(obj.pin.average_rating * 10) / 10;
  return `
  <article id="expanded-pin">
  <header class="image-container" id="expanded-pin-header">
  <h3 class="title">
  ${obj.pin.title}
  </h3>
  <div class="title-like" id=${obj.pin.id}>
  <i class="fa fa-heart-o favorite " aria-hidden="true"></i>
  </div>
    <img
      src="${obj.pin.thumbnail_url}"
    />
    <section id="content-body">
    <p class="description">
    ${obj.pin.description}
    </p>
    <p class="content">
    ${obj.pin.content}
    </p>
    </section>
    </header>
  <footer>
    <div class="info">
      <h5>
      ${obj.pin.name}
      </h5>
      <div class="rating">
       <p id="average-rating">
      Rating: ${rating} / 5
       </p>
      </div>
    </div>
  </footer>
  </article>

  <div id="comment-section">
  <section class="new-comment">
  <form method="POST" action="api/pins/${obj.pin.id}/comments" id="comment">
    <div class="error"></div>
    <textarea name="comment" id="comment-box" placeholder="Something to say?" required></textarea>
    <div class="footer">
      <button type="submit" id="commentBtn">Comment</button>
      <output name="counter" class="counter" for="comment-box"></output>
    </div>
  </form>
  </section>
  <div id="comment-prepend">
  </div>
  </div>
  `;
};

// needs to be dynamic
