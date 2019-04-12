

var gifs = ["Sheep", "Cheese", "Shark", "Plane"]

function makeButton(str) {
    return `<button class ="giffy">${str}</button>`
  }

function renderButtons() {
    $("#buttons-view").html(gifs.map(makeButton));
    
}

renderButtons();

$(document).on("click", ".giffy", function() {
    var gif = $(this).text()

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var gifImage = $("<img>");
          gifImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(gifImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });