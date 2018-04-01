var selectedSearch;

$("#add-button").click(function (event) {
  event.preventDefault();
  var button = $("<button>");
  button.addClass("gif-button");
  button.text($("#search-term").val());
  console.log($("#search-term").val());
  $("#gif-buttons").append(button);
  $("#search-term").val("");
})

// get gifs
$(document).on("click", ".gif-button", function (event) {
  event.preventDefault();
  var gifsDiv = $("#gifs");
  gifsDiv.empty();
  if (selectedSearch != ($(this).text())) {
    selectedSearch = ($(this).text());
    limit = 0;
  };
  limit += 10;
  var queryURL = "https://api.giphy.com/v1/gifs/search?";
  queryURL += "api_key=0f5kuZG5eoid7B1aXqNUPOs4epVY7q0E";
  queryURL += "&q=" + ($(this).text());
  queryURL += "&limit=" + limit;
  queryURL += "&offset=0&rating=G&lang=en";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    response.data.forEach(function (each) {
      var stillUrl = each.images.original_still.url;
      var animateUrl = each.images.original.url;
      console.log(stillUrl);
      var imageDiv = $("<div>");
      imageDiv.addClass("image-div");
      var image = $("<img>");
      imageDiv.append(image);
      image.addClass("gif");
      image.attr("src", stillUrl);
      image.attr("alt", each.title);
      image.attr("data-still", stillUrl);
      image.attr("data-animate", animateUrl);
      image.attr("data-state", "still");
      var ratingDiv = $("<div>");
      ratingDiv.addClass("rating-div");
      ratingDiv.append($("<p>").html("Rating: " + each.rating));
      imageDiv.append(ratingDiv);
      gifsDiv.append(imageDiv);
    });
  });
})

$(document).on("click", ".gif", function (event) {
  event.preventDefault();
  console.log("clicked");
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");

  console.log($(this).attr("data-state"));
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});