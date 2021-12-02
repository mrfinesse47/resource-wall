const createPinElement = (obj) => {
  let des = obj.description;
  let cont = obj.content;
  let rating = Math.round(obj.average_rating * 10) / 10;

  if (des.length > 50) {
    des = des.slice(0, 50) + "...";
  }
  if (cont.length > 150) {
    cont = cont.slice(0, 150) + "...";
  }

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

  //this will be pulled in and assembled from ajax
  //somehow the id will have to be dynamic for an onclick event
  return `<article class="pin" id="${obj.id}">
    <header class="image-container">
    <img src="${obj.thumbnail_url}"
    >
   </header>
    <footer>
    <div>
      <h3 class="title">${obj.title}</h3>
      <p class="description">
      ${des}
      </p>
      <p class="content">
      ${cont}
      </p>
      </div>
      <div class="tag-rating>
      <div class="info">

        <span class="rating">
         ${obj.name}
        ${starRating(rating)}
        </span>

        <span>

        <i class="fa fa-heart-o favorite " aria-hidden="true"></i>
        </span>
      </div>
      </div>
    </footer>
  </article>`;
};
