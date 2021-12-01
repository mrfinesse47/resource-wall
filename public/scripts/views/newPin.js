const newPin = () => {
  const $createDiv = `<article id="modal-holder">
  </article>`;
  $($createDiv).appendTo("#main-container");

  const $newPin = createNewPinElement();
  $("#modal-holder").append($newPin);

  $("#create-pin").submit(function (event) {
    console.log("23123");
    event.preventDefault();
    $.ajax({
      method: "POST",
      data: $("#create-pin").serialize(),
      url: "api/pins",
    }).done(function (obj) {
      if (obj.auth) {
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

// $("#tweet-form").on('submit', function (event) {
//   event.preventDefault();
//   let data = $("#tweet-text").serialize();

//   console.log(data);

//   let myTweet = $("#tweet-text").val();

//   if (myTweet.length > 140) {

//     $(".error").text("Your tweet is too long!").slideDown();
//     return;
//   } else if (myTweet.length === 0) {
//     $(".error").text("Oops, its empty!").slideDown();
//     return;
//   }
//   $(".error").slideUp();

//   $.ajax({
//     method: 'POST',
//     data,
//     url: '/tweets',
//     success: function () {
//       loadTweets();
//       $('#tweet-text').val('');
//       $('.counter').text(140);
//     }
//   });

// });
