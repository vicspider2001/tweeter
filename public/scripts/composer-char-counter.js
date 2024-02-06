$(document).ready(function () {
  const characterLimit = 140;

  //Event listener for textarea
  $("#tweet-text").on("input", function () {
    console.log(this);
    const characters = characterLimit - $(this).val().length;

    //Display the remaining Characters with class = counter
    $(".counter").text(characters);

    //Adjust Counter Color based on character limit
    if (characters < 0) {
      $(".counter").addClass("redCounter");
    } else {
      $(".counter").removeClass("redCounter");
    }
  });
});
