const createExpandedPinElement = (obj) => {

  const rating = Math.round(obj.pin.average_rating * 10) / 10;

  let starRating = (rating) => {

    if (rating === 5) {
      return `
      <span class="fa fa-star checked fa-lg"></span>
      <span class="fa fa-star checked fa-lg"></span>
      <span class="fa fa-star checked fa-lg"></span>
      <span class="fa fa-star checked fa-lg"></span>
      <span class="fa fa-star checked fa-lg"></span>`;
    } else if (rating > 4) {
      return `
      <span class="fa fa-star checked a-lg"></span>
      <span class="fa fa-star checked a-lg"></span>
      <span class="fa fa-star checked a-lg"></span>
      <span class="fa fa-star checked a-lg"></span>
      <span class="fa fa-star a-lg"></span>`;
    } else if (rating > 3) {
      return `
      <span class="fa fa-star checked fa-lg"></span>
      <span class="fa fa-star checked fa-lg"></span>
      <span class="fa fa-star checked fa-lg"></span>
      <span class="fa fa-star fa-lg"></span>
      <span class="fa fa-star fa-lg" ></span>`;
    } else if (rating > 2) {
      return `
      <span class="fa fa-star checked fa-lg"></span>
      <span class="fa fa-star checked fa-lg"></span>
      <span class="fa fa-star fa-lg"></span>
      <span class="fa fa-star fa-lg"></span>
      <span class="fa fa-star fa-lg"></span>`;
    } else if (rating > 1) {
      return `
      <span class="fa fa-star  fa-lgchecked fa-lg"></span>
      <span class="fa fa-star fa-lg"></span>
      <span class="fa fa-star fa-lg"></span>
      <span class="fa fa-star fa-lg"></span>
      <span class="fa fa-star fa-lg"></span>`;
    } else if (rating >= 0) {
      return `
      <span class="fa fa-star fa-lg"></span>
      <span class="fa fa-star fa-lg"></span>
      <span class="fa fa-star fa-lg"></span>
      <span class="fa fa-star fa-lg"></span>
      <span class="fa fa-star fa-lg"></span>`;
    }
  };

  return `
  <div class="expanded-pin-wrapper" id=${obj.pin.id}>
  <article id="expanded-pin" >
  <header class="image-container" id="expanded-pin-header">
  <h3 class="title">
  ${obj.pin.title}
  </h3>
  <span class="title-like" >
  <i class="fa fa-heart-o favorite fa-lg" aria-hidden="true"></i>
  </span>
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
      ${starRating(rating)}
       </p>
      </div>
    </div>
    <div id="user-rating">
    <label for="rating" class="form-label">
    Rate this pin!
    </label>


      <div class="rating">
      <span class="fa fa-star 1 fa-lg"></span>
      <span class="fa fa-star 2 fa-lg"></span>
      <span class="fa fa-star 3 fa-lg"></span>
      <span class="fa fa-star 4 fa-lg"></span>
      <span class="fa fa-star 5 fa-lg"></span>
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
  </div>
  `;
};

// rendered dynamically
