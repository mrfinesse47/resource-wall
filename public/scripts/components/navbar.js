const navBar = (obj) => {
  if (obj.auth) {
    return `<nav id="navigation">
  <div class="container">
  <div class="nav-bar-items">
  <button type="button" class="nav-buttons" id="home"><i class="fa fa-thumb-tack" aria-hidden="true"></i></i>
  </button>

  <button type="button" class="nav-buttons" id="my-pins">My Pins
  </button>

  <button type="button" class="nav-buttons" id="my-favorites">Favorited
  </button>

  <button type="button" class="nav-buttons" id="pin-creation">Create Pin
  </button>


  <button type="button" class="nav-buttons" id="user-info">User Info
  </button>

  </div>
  <div class="nav-links"><div id="body">

  <form id="search-id">

  <button class="btn-search">
  <i class="fas fa-search"></i>
  </button>

  <input type="search" name="search" class="input-search" id="nav-search" placeholder="Type to Search...">

  </div>

</div>
  <button type="button" id="logout-btn">Log Out</button>
  </div>
  </div>
  </nav>`;
  } else {
    return `<nav id="navigation">
    <div class="container">
    <div id="nav-loggedout" class="nav-bar-items">
    <button type="button" class="nav-buttons" id="home"><i class="fas fa-thumbtack"></i>
    <h2 id="Title">PinQuest</h2>
    </button>
    </div>
    </div>
    </nav>`;
  }
};
