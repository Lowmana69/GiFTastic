$(function() {
    populateButton(searchArray, "searchButton", "#buttonArea");
})

var searchArray = ['Dog', 'Cat', 'Bird'];

function populateButton (searchArray, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for(var i = 0; i < searchArray.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }
}

$(document).click(".searchbutton", function () {
    var type = $(this).data("type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+type+"&api_key=D8MXqXXQ6yJXWcwcOokVcDW9ntuLZpFu&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        for(var i = 0; i < response.data.length; i++) {
            var searchDiv = $("<div class='search-item'>");
            var rating = response.data[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $("<img>");
            image.attr("src", still);
            image.attr("data-still", still);
            image.attr("data-animated", animated);
            image.attr("data-state", "still");
            image.addClass("searchImage");
            searchDiv.append(p);
            searchDiv.append(image);
            $("#searches").append(searchDiv);
        }
      });
})

$(document).click("searchImage", function() {
    var state = $(this).attr("data-state");
    if(state == "still") {
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
})

$("#addSearch").click(function() {
    var newSearch = $("input").eq(0).val();
    searchArray.push(newSearch);
    populateButton(searchArray, "searchButton", "#buttonsArea");
    return false;
})