const createPinElement = () => {
  return ` <article class="pin">
    <header class="image-container">
      <img
        src="https://cdn.pixabay.com/photo/2016/03/27/18/54/technology-1283624_1280.jpg"
        alt=""
      />
    </header>
    <footer>
      <h5 class="title">Title</h5>
      <p class="description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
        corrupti!
      </p>
      <div class="info">
        <h5>Tag</h5>
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