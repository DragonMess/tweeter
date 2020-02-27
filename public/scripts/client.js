$(document).ready(function() {

  const data = [
      {
        "user": {
          "name": "Newton",
          "avatars": "https://i.imgur.com/73hZDYK.png"
          ,
          "handle": "@SirIsaac"
        },
        "content": {
          "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1461116232227
      },
      {
        "user": {
          "name": "Descartes",
          "avatars": "https://i.imgur.com/nlhLi3I.png",
          "handle": "@rd" },
        "content": {
          "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
      }
    ]
  
    const renderTweets = function(tweets) {
        
      tweets.forEach(tweet => {
          const $tweet = createTweetElement(tweet);
          $('#tweets-container').prepend($tweet);
      });
  }
  
  
   function createTweetElement(tweet){
      let timestamp = tweet.created_at;
      
      let date = new Date(timestamp * 1000);
      // Hours part from the timestamp
      let hours = date.getHours();
      // Minutes part from the timestamp
      let minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      let seconds = "0" + date.getSeconds();
      
      // Will display time in 10:30:23 format
      let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);


      let $tweet = (`<article class="tweet">
      <header>
        <div>
          <div><img src=${tweet.user.avatars} alt="image"></div>
          <div class="user_name">${tweet.user.name}</div>
        </div>
        <div>${tweet.user.handle}</div>
      </header>
      <div class="tweet_text">${tweet.content.text}</div>
      <hr>
      <footer>
        <div>${formattedTime}</div>
        <div class="icons">
          <div class="flag">Flag</div>
          <div class="update">update</div>
          <div class="like">like</div>
        </div>
      </footer>
    </article>`);
    return $tweet;
   }

});