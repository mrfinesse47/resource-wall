const createPinElement = (obj) => {
  console.log(obj);
  //this will be pulled in and assembled from ajax
  //somehow the id will have to be dynamic for an onclick event
  return ` <article class="pin" id="${obj.id}">
    <header class="image-container">

    </header>
    <footer>
      <h3 class="title">${obj.title}</h3>
      <p class="description">
      ${obj.description}
      </p>
      <p class="content">
      ${obj.content}
      </p>
      <div class="info">
        <h5>${obj.tag}</h5>
        <div class="rating">
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
        </div>
      </div>
    </footer>
  </article>`;
};



// needs to be dynamic
