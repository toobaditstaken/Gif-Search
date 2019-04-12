

var gifs = ["Kitten", "Jungle", "Cartoon", "Jurassic Park"]

function makeButton(str) {
    return `<button class ="giffy">${str}</button>`
  }

function renderButtons() {
    $("#buttons-view").html(gifs.map(makeButton));
    
}

$("#add-GIF").on("click", function() {
    event.preventDefault();
    var gif = $("#GIF-input").val();
    gifs.push(gif);
    renderButtons();

  });

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

        for (var i = 0; i < 10; i++) {
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