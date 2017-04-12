
// =============================================

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBHzsuJjRTjI63IifVncdfhyav-GYuzVR0",
    authDomain: "team-gosling.firebaseapp.com",
    databaseURL: "https://team-gosling.firebaseio.com",
    projectId: "team-gosling",
    storageBucket: "team-gosling.appspot.com",
    messagingSenderId: "440069700680"
};

firebase.initializeApp(config);

var database = firebase.database();


// =============================================


$('#search').on("click", function() {

    //Prevents button from submitting form
    event.preventDefault();


    $('#add-to-favorites').css("color", "");


    //catches user input, trims white space on ends, and makes it all lower case
    var word = ($('#input').val().trim()).toLowerCase();

    //all this does is clear the text form after the search button is activated.
    //it sets the value of the html element with id #input to an empty string
    $('#input').val('');

    $('#add-to-favorites').on("click", function() {
        event.preventDefault();

        //if the word variable is not an empty string, the push it into the favorite words
        //array. after you do that, clear that value of the word variable
        if (word !== '') {

            //if the word isn't an empty string, send it to the database 
            console.log("sending to database...");

            //this sends the word to the database
            database.ref().push({
                favoriteWordEntry: word,
                timeStamp: + new Date()
            });

            alertify.success("Word added to favorites.");

            $('#add-to-favorites').css("color", "#ffd72f");

            console.log("sent");
            console.log("=========");

            word = '';

        }

    });


    //URL to be passed to the API for request. Notice how word is dinamically inserted into 
    //URL
    var queryURL = 'https://fathomless-plains-61908.herokuapp.com/dictionary/entries/en/' + "" + word + "";



    //This is where our AJAX call begins
    $.ajax({
        url: queryURL,
        method: "GET",
        error: function(){
             alertify.error("Sorry! Not a valid word.");
        }

    }).done(function(response) {

        console.log(response);


        console.log(Object.keys(response.results[0].lexicalEntries[0].entries[0].senses[0]));


        //this conditional structure helps us determine whether the word is available
        //in more than one type... that is, adjective, noun, or verb.
        //if the words is only available in one form, we do one thing. but if it is
        //available in more than one type, we do something else...

        if ((response.results[0].lexicalEntries).length > 1) {

            //there is more than one lexical entry

            var numOfDefinitions = (response.results[0].lexicalEntries[0].entries[0].senses).length;

            var numOfLexicalEntries = (response.results[0].lexicalEntries).length;


            var $title = '<h2>' + word + ' ' + '<span class="glyphicon glyphicon-volume-up glyphstyle" aria-hidden="true" id="speak"></span>' + '</h2>';

            //empties the #word-info container
            $('#word-info').empty();
            $('#word-definition').html($title);

            $('#speak').on("click", function() {


                responsiveVoice.speak(word, "US English Female");

            });


            //this loop, in essence, is used to grab and display information about the word
            //that was searched, such as wordType, and multiple possible definitions.
            for (var i = 0; i < numOfLexicalEntries; i++) {

                var wordType = (response.results[0].lexicalEntries[i].lexicalCategory).toLowerCase();

                var $type = '<h4>' + wordType + '</h4>';

                $('#word-definition').append($type);

                for (var ii = 0; ii < numOfDefinitions; ii++) {


                    var $definition = '<strong>' + (ii + 1) + '</strong>' + " " + response.results[0].lexicalEntries[0].entries[0].senses[ii].definitions[0];

                    $('#word-definition').append($definition);

                    //here we're storing the contents of the senses array to check whether or not there is an 'examples' key
                    var senses = Object.keys(response.results[0].lexicalEntries[0].entries[0].senses[ii]);

                    //if there are examples sentences... display them
                    if (senses.indexOf("examples")) {
                        // console.log("there are example sentences");
                        var exampleSentence = response.results[0].lexicalEntries[0].entries[0].senses[ii].examples[0].text;

                        $('#word-definition').append(": " + "<i>" + exampleSentence + "</i>" + "." + "<br />" + "<br />");
                    } else {
                        //nothing
                    }


                };


            };

        } else {

            //there is only one lexical entry

            var definition = response.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];

            var wordType = (response.results[0].lexicalEntries[0].lexicalCategory).toLowerCase();

            var examples = response.results[0].lexicalEntries[0].entries[0].senses[0].examples;

            var exampleSentence = '';
            if (examples) {
                exampleSentence = ": " + "<i>" + examples[0].text + "</i>" + ".";
            }

            //this looks horrible to the eye.
            var $wordInfo = '<h2>' + word + ' ' + '<span class="glyphicon glyphicon-volume-up glyphstyle" aria-hidden="true" id="speak"></span>' + "</h2>" +
                '<h4>' + wordType + '</h4>';


            //when we placed the click event here, it didn't work. WHYYYYY


            $('#word-info').empty();
            $('#word-info').html($wordInfo);
            $('#word-definition').html(definition);
            $('#word-definition').append(exampleSentence);

            $('#speak').on("click", function() {

                console.log("inside click event");
                responsiveVoice.speak(word, "US English Female");

            });
        };

    });


});