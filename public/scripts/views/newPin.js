// event listener for submit
$("#tweet-form").on('submit', function (event) {
  event.preventDefault();
  let data = $("#tweet-text").serialize();

  console.log(data);

  let myTweet = $("#tweet-text").val();

  if (myTweet.length > 140) {

    $(".error").text("Your tweet is too long!").slideDown();
    return;
  } else if (myTweet.length === 0) {
    $(".error").text("Oops, its empty!").slideDown();
    return;
  }
  $(".error").slideUp();

  $.ajax({
    method: 'POST',
    data,
    url: '/tweets',
    success: function () {
      loadTweets();
      $('#tweet-text').val('');
      $('.counter').text(140);
    }
  });

});
