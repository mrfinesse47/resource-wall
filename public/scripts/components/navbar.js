const navBar = (auth) => {
  if (auth) {
    return `<nav id="navigation">
  <div class="container">
  <div class="nav-bar-items">
  <button type="button" id="home"><i class="fas fa-thumbtack"></i>
  </button>

  <button type="button" id="my-pins">My pins
  </button>

  <button type="button" id="my-favorites">Favorited
  </button>

  <button type="button" id="pin-creation">Create Pin
  </button>

  <span>
  <form id="search-bar">
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
    <div class="nav-bar-items">
    <button type="button" id="home"><i class="fas fa-thumbtack"></i>
    </button>
    </div>
    </div>
    </nav>`
  }
}
