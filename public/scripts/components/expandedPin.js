const createExpandedPinElement = (obj) => {
  //console.log("the obj id is:", obj.pin.id);
  const rating = Math.round(obj.pin.average_rating * 10) / 10;

  let starRating = (rating) => {
    console.log(rating);
    if (rating === 5) {
      return `
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>`
    } else if (rating > 4) {
      return `
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>`
    } else if (rating > 3) {
      return `
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>`
    } else if (rating > 2) {
      return `
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>`
    } else if (rating > 1) {
      return `
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>`
    } else if (rating >= 0) {
      return `
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>`
    }

  }


  return `
  <article id="expanded-pin">
  <header class="image-container" id="expanded-pin-header">
  <h3 class="title">
  ${obj.pin.title}
  </h3>
  <div class="title-like">
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
      ${starRating(rating)}
       </p>
      </div>
    </div>
  </footer>
<div id="user-rating">
  <div>
  Rate this pin!
  </div>
  <div class="rating">
    <span><input type="radio" name="rating" id="str5" value="5"><label for="str5">&#10038;</label></span>
    <span><input type="radio" name="rating" id="str4" value="4"><label for="str4">&#10038;</label></span>
    <span><input type="radio" name="rating" id="str3" value="3"><label for="str3">&#10038;</label></span>
    <span><input type="radio" name="rating" id="str2" value="2"><label for="str2">&#10038;</label></span>
    <span><input type="radio" name="rating" id="str1" value="1"><label for="str1">&#10038;</label></span>
  </div>
</div>
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
