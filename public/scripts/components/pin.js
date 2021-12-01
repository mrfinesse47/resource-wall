const createPinElement = (obj) => {
  console.log(obj);
  let des = obj.description;
  let cont = obj.content;
  const rating = Math.round(obj.average_rating * 10) / 10;
  if (des.length > 50) {
    des = des.slice(0, 50) + "...";
  }
  if (cont.length > 150) {
    cont = cont.slice(0, 150) + "...";
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
        ${rating} / 5
        </span>

        <span>

        <i class="fa fa-heart-o favorite " aria-hidden="true"></i>
        </span>
      </div>
      </div>
    </footer>
  </article>`;
};
