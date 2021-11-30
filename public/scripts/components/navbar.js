const navBar = (auth) => {
  if (auth) {
    return `<nav id="navigation">
  <div class="container">
  <div class="nav-bar-items">
  <button type="button" id="home">Home
  </button>
  <button type="button" id="my-pins">My pins</button>
  <form id="search-bar">
  <span>
  <input type="search" id="query" placeholder="Search">
  <button>Search</button>
  </span>
  </form>
  </div>
  <div class="nav-links">
  <button type="button" id="logout-btn">Log Out</button>
  </div>
  </div>
  </nav>`
  } else {
    return `<nav id="navigation">
    <div class="container">
      <div>
        <span id="home">
          <p>HOME</p>
        </span>
      </div>
      <div class="nav-links">
      </div>
    </div>
  </nav>`
  }
}
