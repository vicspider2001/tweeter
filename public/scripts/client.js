/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const createTweetElement = (tweet) => {
  const result = timeago.format(tweet.created_at);
  const safeText = $("<div>").text(tweet.content.text).html();
  const tweetElement = $(`<article id="tweet">
    <header class="user-info">
    <img src= ${tweet.user.avatars} class="imgStyling" alt="Image">
    <div class="user-info">
        <p class="userNameStyling">${tweet.user.name}</p>
        <p class="nameStyling">${tweet.user.handle}</p>
    </div>
    </header>
    <p class="tweet-content">${safeText}</p>
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
    
  </article>`);
  return tweetElement;
};

$(document).ready(function () {
  const $textarea = $("textarea");
  const $errorMsg = $(".errorMessages");
  const characters = 140;
  const loadTweets = function () {
    //Get new tweets from the database
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json", // Specifies a JSON response
      success: function (data) {
        //This line will clear the textarea value
        $textarea.val("");

        //Empty the previously appended tweets
        $("#dynamicTweets").empty();

        //Loop through the data
        for (const tweet of data) {
          const tweetElement = createTweetElement(tweet);
          //append new tweets to container
          $("#dynamicTweets").prepend(tweetElement);
          
        }
      },
      error: function (error) {
        console.error("Error loading tweets:", error);
      },
    });
  };
  // Call the loadTweets function on page load
  loadTweets();

  //Form Submission

  $("form").on("submit", function (event) {
    //Hide error message before validation
    $errorMsg.slideUp();

    if ($textarea.val().length > characters) {
      //Text message for error
      $errorMsg.text("Humming characters limit exceeded!");
      //Display the error message with animation
      $errorMsg.slideDown();

      // prevents opening of the tweets url
      return false;
    } else if ($textarea.val().length === 0) {
      //Text message for error
      $errorMsg.text("What are you humming about!");
      //Display error message with animation
      $errorMsg.slideDown();

      // prevents opening of the tweets url
      return false;
    } else {
      event.preventDefault();
      //Hide error message
      $errorMsg.slideUp();
      //Form Data needed for submission
      $.ajax({
        url: "/tweets",
        method: "POST",
        // Serialized form data (this)
        data: $(this).serialize(),
        success: function (response) {
          console.log("Thanks for humming", response);
          loadTweets();
          $(".counter").text(characters)
        },
        error: function (error) {
          console.log("An error has occured", error);
        },
      });
    }
  });
});
