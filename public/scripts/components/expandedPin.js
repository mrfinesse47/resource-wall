const createExpandedPinElement = (obj) => {
  const rating = Math.round(obj.pin.average_rating * 10) / 10;
  return `
  <article id="expanded-pin">
  <h3 class="title">
  ${obj.pin.title}
  </h3>
  <header class="image-container">
    <img
      src="${obj.pin.image}"
    />
  </header>
  <footer>
    <p class="description">
    ${obj.pin.description}
    </p>
    <p class="content">
    ${obj.pin.content}
    </p>
    <div class="info">
      <h5>
      ${obj.pin.tag}
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
