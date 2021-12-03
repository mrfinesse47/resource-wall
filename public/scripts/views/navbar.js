const navBarView = (obj) => {
  const $navBar = navBar(obj);
  $($navBar).appendTo("#nav-placeholder");
  //appends the NavBar to the top of the screen

  if (obj.auth) {

    $("#my-pins").click(function (event) {
      event.preventDefault();
      $.ajax({
          method: "GET",
          url: "api/users/auth",
        })
        .done(function (obj) {
          if (obj.auth) {
            loadPins("/api/pins/owned", (obj) => render("pins", obj));
          } else {
            render("login", obj);
          }
        })
        .fail(function () {
          // render("pins") // should re-render login once back end is hooked up
        });
    });

    $("#pin-creation").click(function (event) {
      event.preventDefault();
      $.ajax({
          method: "GET",
          url: "api/users/auth",
        })
        .done(function (obj) {
          if (obj.auth) {
            render("newPin", obj);
          } else {
            render("login", obj);
          }
        })
        .fail(function () {
          // render("pins") // should re-render login once back end is hooked up
        });
    });

    $("#my-favorites").click(function (event) {
      event.preventDefault();
      $.ajax({
          method: "GET",
          url: "api/users/auth",
        })
        .done(function (obj) {
          if (obj.auth) {
            loadPins("api/pins/favorites", (obj) => render("pins", obj));
          } else {
            render("login", obj);
          }
        })
        .fail(function () {
          // render("pins") // should re-render login once back end is hooked up
        });
    });

    $("#home").click(function (event) {
      event.preventDefault();
      $.ajax({
          method: "GET",
          url: "api/users/auth",
        })
        .done(function (obj) {
          console.log(obj);
          if (obj.auth) {
            loadPins("api/pins", (obj) => render("pins", obj));
          } else {
            render("login", obj);
          }
        })
        .fail(function () {
          // render("pins") // should re-render login once back end is hooked up
        });
    });

    $("#user-info").click(function (event) {
      event.preventDefault();
      $.ajax({
          method: "GET",
          url: "api/users/info",
        })
        .done(function (obj) {
          console.log(obj, "123");
          if (obj.auth) {
            render("userProfile", obj)
          } else {
            render("login", obj);
          }
        })
        .fail(function () {
          // render("pins") // should re-render login once back end is hooked up
        });
    });


    // $("#search-id").submit(function (event) {
    //   event.preventDefault();
    //   console.log($(this).serialize(), "its in here");
    //   $.ajax({
    //       method: "POST",
    //       data: $(this).serialize(),
    //       url: "api/pins/search",
    //     })
    //     .done(function (obj) {
    //       if (obj.auth) {
    //         render("pins", obj);
    //       } else {
    //         render("login", obj);
    //       }
    //     })
    //     .fail(function () {
    //       // render("pins") // should re-render login once back end is hooked up
    //     });
    // });

    const input = document.querySelector('input[type="search"]');
    input.onsearch = () => {
      console.log($(input).serialize(), "inside search");
      $.ajax({
          method: "POST",
          data: $(input).serialize(),
          url: "api/pins/search",
        })
        .done(function (obj) {
          console.log(obj);
          if (obj.auth) {
            render("pins", obj);
          } else {
            render("login", obj);
          }
        })
        .fail(function () {
          console.log("search failed");
        });
    };

    $("#logout-btn").click(function (event) {
      event.preventDefault();
      $.ajax({
          method: "POST",
          url: "api/users/logout",
        })
        .done(function (obj) {
          if (!obj.auth) {
            render("login", obj);
          }
        })
        .fail(function () {
          //should either render pins or give a notification that logout failed
        });
    });
  }
};
