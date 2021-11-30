const navBarView = (auth) => {
  const $navBar = navBar(auth);
  $($navBar).appendTo('#nav-placeholder');


  $('#my-pins').click(function (event) {
    event.preventDefault();
    $.ajax({
        method: 'GET',
        url: "api/users/auth"
      })
      .done(function (obj) {

        if (obj.auth) {
          render("userPins", obj);
        } else {
          render("login", obj)
        }

      })
      .fail(function () {
        // render("pins") // should re-render login once back end is hooked up
      });
  })



  $('#pin-creation').click(function (event) {
    event.preventDefault();
    $.ajax({
        method: 'GET',
        url: "api/users/auth"
      })
      .done(function (obj) {
        if (obj.auth) {
          render("newPin", obj);
        } else {
          render("login", obj)
        }

      })
      .fail(function () {
        // render("pins") // should re-render login once back end is hooked up
      });
  })


  $('#my-favorites').click(function (event) {
    event.preventDefault();
    $.ajax({
        method: 'GET',
        url: "api/users/auth"
      })
      .done(function (obj) {

        if (obj.auth) {
          render("favoritePins", obj);
        } else {
          render("login", obj)
        }

      })
      .fail(function () {
        // render("pins") // should re-render login once back end is hooked up
      });
  })



  $('#home').click(function (event) {
    event.preventDefault();
    $.ajax({
        method: 'GET',
        url: "api/users/auth"
      })
      .done(function (obj) {
        console.log(obj);
        if (obj.auth) {
          render("pins", obj);
        } else {
          render("login", obj)
        }

      })
      .fail(function () {
        // render("pins") // should re-render login once back end is hooked up
      });
  })


  if (auth) {

    const input = document.querySelector('input[type="search"]');
    input.onsearch = () => {
      console.log($(input.value).serialize(), "inside search");
      $.ajax({
          method: 'POST',
          data: $(input.value).serialize(),
          url: "api/pins/search"
        })
        .done(function (obj) {
          console.log(obj);
          if (obj.auth) {
            render("pins", obj);
          } else {
            render("login", obj)
          }

        })
        .fail(function () {
          console.log("search failed")
        });

    };



    $('#logout-btn').click(function (event) {
      event.preventDefault();
      $.ajax({
          method: 'POST',
          url: 'api/users/logout',
        })
        .done(function (obj) {

          if (!obj.auth) {
            render("login", obj);
          }
        })
        .fail(function () {

          //should either render pins or give a notification that logout failed
        });
    })
  }

}
