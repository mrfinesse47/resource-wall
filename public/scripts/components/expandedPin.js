const createExpandedPinElement = () => {

  return `
  <article id="expanded-pin">
  <header class="image-container">
    <img
      src="https://cdn.pixabay.com/photo/2016/03/27/18/54/technology-1283624_1280.jpg"
      alt=""
    />
  </header>
  <footer>
    <h3 class="title">Title</h3>
    <p class="description">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti! Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
      corrupti!Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
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
  </article>

  <div id="comment-section">
  <section class="new-comment">
  <form method="POST" action="/comments" id="comment-box">
    <div class="error"></div>
    <textarea name="comment" id="comment-box" placeholder="comment?"></textarea>
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
