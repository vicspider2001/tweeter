/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1706631449549
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1706717849549
  }
];

const createTweetElement = (tweet) => {
  const tweetElement = $(`<article id="tweet">
    <header class="user-info">
    <img src= ${tweet.user.avatars} class="imgStyling" alt="Image">
    <div class="user-info">
        <p class="userNameStyling">${tweet.user.name}</p>
        <p class="nameStyling">${tweet.user.handle}</p>
    </div>
    </header>
    <p class="tweet-content">${tweet.content.text}</p>
    <hr class="hrStyling"/>
    <footer>
        <div class="postCounts">
          <p> 10 days ago</p>
        </div>
        <div class="icon">
          <span><i class="fa fa-comment iconColor"></i></span>
          <span><i class="fa fa-retweet iconColor"></i></span>
          <span><i class="fa fa-heart iconColor"></i></span>
        </div>
        
    </footer>
    
  </article>`)
  return tweetElement;
}

$(document).ready(function() {

  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json", // Specify that you expect JSON response
      success: function(data) {
        for(const tweet of data) {
          const tweetElement = createTweetElement(tweet);
          //append it to container
          $("#dynamicTweets").append(tweetElement);
        }
      },
      error: function(error) {
        console.error("Error loading tweets:", error);
      }
    });
  };
  // Call the loadTweets function on page load
  loadTweets();


  //Form Submission
  const $textarea = $("textarea")
  $("form").on("submit", function(event) {
    const characters = 140;
    if($textarea.val().length > characters) {
      alert("What are you humming about!");
      
    }

    else if($textarea.val().length === 0) {
      alert("Humming characters limit exceeded!");
      
    } else {
      event.preventDefault();

      //Form Data needed for submission
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(), // Serialized form data (this)
        success: function(response) {
          console.log("Thanks for humming", response)
          
        },
        error: function(error) {
          console.log("An error has occured", error)
        }
      })
    };

    

    

  })

})
