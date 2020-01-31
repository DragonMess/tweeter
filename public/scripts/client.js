//Use (and do all your DOM work in) jQuery's document ready function
$(document).ready(function() {



  //data temporaire to test
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac"
      },
      content: {
        text:
          "If I have seen further it is by standing on the shoulders of giants"
      },
      created_at: 1461116232227
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd"
      },
      content: {
        text: "Je pense , donc je suis"
      },
      created_at: 1461113959088
    }
  ];



  // create element with template literals or template strings
  // https://wesbos.com/template-strings-html/
  const createTweetElement = function(tweet) {

    //tearea value => html element <p> and after convert to text with .prop('outerHTML')
    // can be insert in html by user 
    // a script like <script>$('body').empty()</script>
    let safeTxt = $("<p>").text(tweet.content.text).prop('outerHTML');

    let safe = 
    console.log('$safeTxt', safeTxt)
    // let sfd = $safeTxt.outerHTML;
    let $tweet = `
  <section> 
<article id="articleTweet">
<header>
  <span>
    <div class="Avatar">
    <img src='${tweet.user.avatars}'>
    </div>
    <div class="nameUser">
    ${tweet.user.name}
    </div>
  </span>
  <span class="handle">
  ${tweet.user.handle}
  </span>
</header>
<div>
  
  ${safeTxt}
  
  <hr />
</div>
<footer>
  <span class="date">
    10 days ago
  </span>

  <div class="comments">
    <span id="flag">Flag</span>
    <span id="update">Update</span>
    <span id="likes">Like</span>
  </div>
</footer>
</section>
`;


    return $tweet;
  };

  //render itmes with a loop of tweets

  //take the tweets from get req
  const renderTweets = function(tweets) {
    console.log("tweets", tweets);

    //create a container to the tweets
    let $tweetsContainer = $(".tweetContainer");

    //strings(HTML)  for all Tweets
    let $allTweets = "";
    // loops through tweets
    for (tweet of tweets) {
      // put all Tweets in a variable
      // allTweets = allTweets + createTweetElement(tweet)
      $allTweets += createTweetElement(tweet);
    }
    // takes return value and appends it to the tweets container
    $tweetsContainer.append($allTweets);
  };

  const newTweet = function(data) {
    return createTweetElement(data.pop());
  };

  const handleTweetLoadErrors = function(jqXHR, textStatus, errorThrown) {
    $(".post-Tweet__errors")
      .addClass("has-errors")
      .append("<span>Error: could not load Tweet</span>");
  };
  // ============GET====================

  $.ajax({
    method: "GET",
    url: `http://localhost:8080/tweets`
  })
    .done(renderTweets)
    //.done(function(data){renderTweets(data)})
    .fail(handleTweetLoadErrors);

  const getLastTweet = function() {
    $.ajax({
      method: "GET",
      url: `http://localhost:8080/tweets`
    })
      .done(data => $(".tweetContainer").prepend(newTweet(data)))
      .fail(handleTweetLoadErrors);
  };

  // ============POST====================
  let tweetEmpty;
  let tweetBig;
  $("#idForm").submit(function(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.

    let form = $(this);
    let url = form.attr("action");
    let valueTxt = form.find("textarea").val();

    if (valueTxt === "") {
      
        $(".TweetEmpty").slideToggle(400);
        setTimeout(function(){
          $(".TweetEmpty").slideToggle(400)}, 3000);
      // tweetEmpty = "This Tweeter is empty";
    } else if (valueTxt.length > 140) {
      // tweetBig = "You have more than 140 characters";
      $(".BigTweet").slideToggle(400);
      setTimeout(function(){
        $(".BigTweet").slideToggle(400)}, 3000);
    } else {
      $.ajax({
        type: "POST",
        url: url,
        data: form.serialize() // serializes the form's elements.
      })
        .done(getLastTweet)
        .fail(handleTweetLoadErrors);
    }
  });

  // ============Scroll down page====================

  $("#btn1").on("click", () => {
    $(".new-tweet_form").slideToggle(400);
    $(".textarea").focus();
  });

  // $("#btn1").onclick(
  //   function() {
  //     $(this).removeClass("hide");
  //   },
    // function() {
    //   $(this).removeClass("hover");
    // }
  // );


  // $("#btn1").on("click", () => {
  //   // window.scrollTo(0,document.body.article.scrollHeight);
  //   // window.scrollTo(500, 0);
  //   $("#articleTweet").slideToggle(400);
  //   // console.log(this); //The this keyword here refers to something else!
  // });
});
