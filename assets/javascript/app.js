$(document).ready(function() {

    var topics = ["Happy", "Sad", "Confused", "Fabulous", "Shocked", "Calm"]


    function generateButtons() {

        $("#buttons").empty();

        for (var i = 0; i < topics.length; i++) {

            var applyButton = $('<button type="submit" class="btn btn-default" id="topicsButton">').text(topics[i]).addClass('buttonName').attr("data-name", topics[i]);
            $("#buttons").append(applyButton);
        };
    };

    generateButtons();


    $(document).on('click', '.buttonName', function(event) {
        event.preventDefault();
        var emotion = $(this).attr('data-name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg"
        $('#gifs').empty();
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {

                var source = response.data;

                for (var i = 0; i < source.length; i++) {
                    
                    var gifDiv = $("<div class='displayGif'>")
                    var image = $("<img class='imageDiv'>")
                    var gifUrl = source[i].images.fixed_height.url;
                    var gifRating = source[i].rating
                    var ratingDiv = $("<div class='rating'>").append("Rating: " + gifRating)

                    image.attr('src', gifUrl.replace('.gif', '_s.gif'));
                    image.attr('data-still', gifUrl.replace('.gif', '_s.gif'));
                    image.attr('data-animate', gifUrl.replace('_s.gif', '.gif'));
                    image.attr('data-state', 'still')

                    gifDiv.append(image).append(ratingDiv);
                    $('#gifs').append(gifDiv);

                }
            });
    });


    $(document).on('click', '.imageDiv', function() {

        var state = $(this).attr('data-state');

        if (state === 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });


    $(document).on('click', '#submitButton', function(event) {

        event.preventDefault();
        var searchInput = $('.gifInput').val().trim();
        topics.push(searchInput);
        $(".gifInput").val('');

        generateButtons();
    });

});
