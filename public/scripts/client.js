/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = (tweet) => {
  const result = timeago.format(tweet.created_at);
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
          <p>(${result})</p>
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
      dataType: "json", // Specifies a JSON response
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
  const characters = 140;
  $("form").on("submit", function(event) {
    if($textarea.val().length > characters) {
      alert("Humming characters limit exceeded!");
      return false // prevents opening of the tweets url
    }
    else if($textarea.val().length === 0) {
      alert("What are you humming about!");
      return false // prevents opening of the tweets url
      
    } else {
        event.preventDefault();
        //Form Data needed for submission
        $.ajax({
          url: "/tweets",
          method: "POST",
          data: $(this).serialize(), // Serialized form data (this)
         
          success: function(response) {
            console.log("Thanks for humming", response)
            console.log(($(this)))
          },
          error: function(error) {
            console.log("An error has occured", error)
          }
        })
        
        
      };
      
  })

})
