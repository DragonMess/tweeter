$(document).ready(function() {

  // const data = [
  //     {
  //       "user": {
  //         "name": "Newton",
  //         "avatars": "https://i.imgur.com/73hZDYK.png"
  //         ,
  //         "handle": "@SirIsaac"
  //       },
  //       "content": {
  //         "text": "If I have seen further it is by standing on the shoulders of giants"
  //       },
  //       "created_at": 1461116232227
  //     },
  //     {
  //       "user": {
  //         "name": "Descartes",
  //         "avatars": "https://i.imgur.com/nlhLi3I.png",
  //         "handle": "@rd" },
  //       "content": {
  //         "text": "Je pense , donc je suis"
  //       },
  //       "created_at": 1461113959088
  //     }
  //   ]
  
  const renderTweets = function(tweets) {
      
      tweets.forEach(tweet => {
          const $tweet = createTweetElement(tweet);
          $('#tweets-container').prepend($tweet);
      });
  }
  
  function dateTime(unix_timestamp) { 
    let date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();
    
    // Will display time in 10:30:23 format
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  }

   function createTweetElement(tweet){

      let safeTxt = $("<p>").text(tweet.content.text).prop('outerHTML');
      let created = dateTime(tweet.created_at);
      
      let $tweet = (`<article class="tweet">
      <header>
        <div>
          <div><img src=${tweet.user.avatars} alt="image"></div>
          <div class="user_name">${tweet.user.name}</div>
        </div>
        <div>${tweet.user.handle}</div>
      </header>
      <div class="tweet_text">${safeTxt}</div>
      <hr>
      <footer>
        <div>${created}</div>
        <div class="icons">
          <div class="flag">Flag</div>
          <div class="update">update</div>
          <div class="like">like</div>
        </div>
      </footer>
    </article>`);
    return $tweet;
   }

   const handleTweetLoadErrors = function(jqXHR, textStatus, errorThrown) {
     console.log()
     $('.post-comments__errors')
         .addClass('has-errors')
         .append(`<span>Error: could not load comments - ${errorThrown}</span>`);
 };

  function loadTweets() { 
      $.ajax({
          method: 'GET',
          url: `http://localhost:8080/tweets`
      })
      .done(renderTweets)
      .fail(handleTweetLoadErrors);
  }
  loadTweets();

  
  let $datas;
  // prevent submit form
  $('#target').on('submit', function(event) {
    event.preventDefault();
    $datas = $( this ).serialize();

    let valueTxt = $("form").find("textarea").val();

    if (valueTxt.length === 0) {
      console.log('tweet empty');
    }else if(valueTxt.length > 10) {
      console.log('exceeds maximum message length');
    }else {
      $.ajax({ 
        method: 'POST',
        url:'/tweets',
        data:$datas
      })
      .done(loadTweets)
      .fail(handleTweetLoadErrors);

      //clear textarea & counter
      $("form").trigger("reset");
      $(".counter").text('');
    }     
  });
  //hide new tweet
  // add class arrow down to the image


  $("#arrow").on("click", () => {

    $(".new-tweet").slideToggle(400);
    $("textarea").focus();
    $("#arrow").addClass('arrow-Down');

  });
});