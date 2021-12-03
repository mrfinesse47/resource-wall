const newPin = () => {
  const $createDiv = `<article id="modal-holder">
  </article>`;
  $($createDiv).appendTo("#main-container");
  //creating containers to hold components

  const $newPin = createNewPinElement();
  $("#modal-holder").append($newPin);


  $("#create-pin-title").append(createErrorElement());
  $("#error-msg").hide();


  $("#create-pin").submit(function (event) {

    event.preventDefault();
    $.ajax({
      method: "POST",
      data: $("#create-pin").serialize(),
      url: "api/pins",
    }).done(function (obj) {
      if (obj.auth && obj.formError) {
        errorHandler(obj.message);
      } else {
        loadPins("api/pins", (obj) => render("pins", obj));
      }
    });
  });

  $("#cancel-redirect").click(function (event) {
    event.preventDefault();
    $.ajax({
        method: "GET",
        url: "api/users/auth",
      })
      .done(function (obj) {

        if (!obj.auth) {
          render("login", obj);
        } else {
          loadPins("api/pins", (obj) => render("pins", obj));
        }
      })
      .fail(function () {
        console.log("something went wrong in signup redirect"); //should either render pins or give a notification that logout failed
      });
  });
};
