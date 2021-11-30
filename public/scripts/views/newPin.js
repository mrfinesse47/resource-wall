const newPin = () => {
  const $createDiv = `<div id="modal-holder">
  </div>`
  $($createDiv).appendTo('#pre-main');

  const $newPin = createNewPinElement();
  $("#modal-holder").append($newPin);



}

// $("#submit-new-pin).submit(function (event) {
//     event.preventDefault();

//     $.ajax({
//       method: 'POST',
//       data: $(this).serialize(),
//       url: 'api/pins/',
//     })
//     .done(function (obj) {
//       console.log(obj)
//       if (obj.auth) {
//         render("pins", obj.auth);
//       }

//     })
//     .fail(function () {
//       // render("pins") // should re-render login once back end is hooked up
//     });
























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
