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




// <div class="card" id="${obj.id} style=" width: 18rem">
//     <img class="card-img-top" src="..." alt="Card image cap" />
//     <div class="card-body">
//       <h5 class="card-title">{obj.title}</h5>
//       <p class="description">
//         ${obj.description}
//       </p>
//       <p class="card-text">
//         ${obj.content}
//       </p>
//       <div class="rating">
//       </div>
//     </div>
//   </div>
