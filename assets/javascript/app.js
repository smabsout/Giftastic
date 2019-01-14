$(document).ready(function () {
    var gifs = ["Bugs Bunny", "Casper", "TMNT", "Marvel", "Capcom"];

    //adding original buttons from gifs array
    function spawnBtns() {
        $("#gif-buttons").empty();
        for (i = 0; i < gifs.length; i++) {
            $("#gif-buttons").append("<button class='btn btn-warning' data-gif ='" + gifs[i] + "'>" + gifs[i] + "</button>");

        }
    };
    spawnBtns();


    //adding custom buttons you searched for.
    $("#add-gif").on("click", function () {

        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        gifs.push(gif);
        spawnBtns();
        return;

    });

    	// Getting gifs from api... onto html
	$("button").on("click", function () {
		var giff = $(this).attr("data-gif");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			giff + "&api_key=dc6zaTOxFJmzC&limit=10"

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			var results = response.data;
			$("#gifs").empty();
			for (var i = 0; i < results.length; i++) {
				var gifDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var gifImg = $("<img>");

				gifImg.attr("src", results[i].images.original_still.url);
				gifImg.attr("data-still", results[i].images.original_still.url);
				gifImg.attr("data-animate", results[i].images.original.url);
				gifImg.attr("data-state", "still");
				gifImg.attr("class", "gif");
				gifDiv.append(p);
				gifDiv.append(gifImg);
				$("#gifs").append(gifDiv);
			}
		});
    });
    
    function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
    }
    
    $(document).on("click", ".gif", changeState);



});

