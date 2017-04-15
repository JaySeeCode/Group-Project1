//enables all tooltips in the document
// $(document).ready(function(){
//     $('[data-toggle="tooltip"]').tooltip();   
// });

wordsList = [
	"exegesis",
	"panoply",
	"multifarious",
	"inimical",
	"apodictic",
	"ubiquitous",
	"liminal",
	"aggrandize",
	"hermeneutic",
	"perspicacious",
	"incarnadine",
	"bucolic",
	"turpitude",
	"vicissitude",
	"sinecure",
	"augury",
	"cupidity",
	"legerdemain",
	"encomium",
	"lugubrious",
	"complaisant",
	"opprobrium",
	"phlegmatic",
	"raconteur",
	"peripatetic",
	"interregnum",
	"orotund",
	"adumbrate",
	"redound",
	"scintilla",
	"sobriquet"
];

var randWord = '';
var isChallengeComplete = false;
var definition = '';
//picks new word from array and sets it to local storage
if(!localStorage.getItem("word")){
	selectAndSetNewWord();
}


setInterval(checkForTimeOut, 1000*10);


console.log("from local array: " + randWord);


//retrieves stringified object from local storage and makes it an object
//so that we may access its properties.
var tempWord = localStorage.getItem('word');
tempWord = JSON.parse(tempWord);
console.log("from local storage: " + tempWord.randWord + " | time stamp: " + tempWord.timeCreated);

var tmp = '<a id="a-tag" data-toggle="tooltip" data-content="content in here">' + tempWord.randWord + '</a>';




$('#challengeWord').html("Today's challenge word is: " +  '<span id="challenge-word">' + tmp + '</span>');


//as of now, it resets every 24 hours since NOW. gotta figure out how to make it
//reset every 24 hours since a fixed time. like, 12 AM for instance. 
	// setInterval(resetDailyChallenge, 1000*10);	
// ---> IF YOU SET THIS TO THE NUMBER OF MILISECONDS IN A DAY, A NEW WORD
// //WILL BE SHOWN EVER 24 HOURS 
// 86400000 num of milliseconds in a day

var queryURL = 'https://fathomless-plains-61908.herokuapp.com/dictionary/entries/en/' + "" + tempWord.randWord + "";

$.ajax({
        url: queryURL,
        method: "GET"

    }).done(function(response) {

        // console.log(response.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);
        console.log("here");
        definition = response.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
        console.log(definition);
        $('#challenge-word').attr("title", definition);
      });

    $("#define").on("click", function(){
    	console.log("def: " + definition);
    	$("#defined").html("<p></p>" + "*" + definition + "<p></p>");
    })
    $("#infoIcon").on("click",function(){
    	alertify.success("Challenge yourself by trying to use this word at least once today!");
    })

$('#submit-challenge').on("click", function(){

	event.preventDefault();

	// setInterval(resetDailyChallenge, 50000);

	var sentence = $('#sentence').val().trim();
	$('#sentence').val('');
	console.log(sentence);

	var isWordUsed = sentence.search(randWord);
	console.log("anything other than -1 means the word was used: " + isWordUsed);

	if(isWordUsed != -1){
		console.log("word was used in sentence. challenge complete");
		isChallengeComplete = true;
		alertify.alert("Daily Challenge Complete");
		$("#submit-challenge").hide();
		$("#status").html("<b>complete</b>");
		$(".color").css("color", "green");

		var query = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=champion";

     	// Perfoming an AJAX GET request to our queryURL
     	$.ajax({
       	url: query,
      	method: "GET"
     	})

      	// After the data from the AJAX request comes back
      	.done(function(response) {

        // Saving the image_original_url property
        var imageUrl = response.data.image_original_url;

        // Creating and storing an image tag
        var championImage = $("<img>");

        // Setting the catImage src attribute to imageUrl
        championImage.attr("src", imageUrl);
        championImage.attr("alt", "cat image");
        championImage.attr("width", "300")

        // Prepending the catImage to the images div
        $("#images").html(championImage);


      	});
	}else{
		console.log("word was not used in sentence. please try again");
		alertify.alert("Word was not used in sentence. Please try again");
	}
	
});

//functions

function resetDailyChallenge(){
	console.log("beginning of function");
	// randWord = wordsList[Math.floor(Math.random() *  wordsList.length)];
	selectAndSetNewWord();


	$('#challenge-word').html('<a>' + randWord + '</a>');
	isChallengeComplete = false;
	console.log(randWord);
	$("#status").html("<b>incomplete</b>");
	$("#status").css("color", "");
	$("#submit-challenge").show();
};

function checkForTimeOut(){

	var word = localStorage.getItem('word');
	word = JSON.parse(word);

	var currentTime = Date.now();
	var currentItem = word;


	var elapseTime = currentTime - word.timeCreated;

	if(elapseTime > 86400000){
		resetDailyChallenge();
		return true;
	}else{
		console.log('no timeout');
	}
	

};

function selectAndSetNewWord(){
	randWord = wordsList[Math.floor(Math.random() *  wordsList.length)];
	var timeCreated = Date.now();

	var newObj = {
		randWord: randWord,
		timeCreated: timeCreated
	};

	//sends stringified object to localStorage
	localStorage.setItem("word", JSON.stringify(newObj));

};
