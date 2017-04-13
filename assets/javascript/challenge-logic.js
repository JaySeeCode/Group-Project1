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

var definition = '';
var randWord = ''; 
// wordsList[Math.floor(Math.random() *  wordsList.length)];
resetDailyChallenge();	
var isChallengeComplete = false;
var timeCreated = Date.now(); 

var newObj = {
	randWord: randWord,
	timeCreated: timeCreated
};

console.log("from local array: " + randWord);

var queryURL = 'https://fathomless-plains-61908.herokuapp.com/dictionary/entries/en/' + "" + randWord + "";

//sends stringified object to localStorage
localStorage.setItem("word", JSON.stringify(newObj));

//retrieves stringified object from local storage and makes it an object
//so that we may access its properties.
var tempWord = localStorage.getItem('word');
tempWord = JSON.parse(tempWord);
console.log("from local storage: " + tempWord.randWord + " | time stamp: " + tempWord.timeCreated);

$('#challengeWord').html("Today's challenge word is: " +  '<span id="challenge-word" data-toggle="tooltip">' + tempWord.randWord + '</span>');



//as of now, it resets every 24 hours since NOW. gotta figure out how to make it
//reset every 24 hours since a fixed time. like, 12 AM for instance. 
setInterval(resetDailyChallenge, 86400000);
// ---> IF YOU SET THIS TO THE NUMBER OF MILISECONDS IN A DAY, A NEW WORD
// //WILL BE SHOWN EVER 24 HOURS 
// 86400000 num of milliseconds in a day

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
	}else{
		console.log("word was not used in sentence. please try again");
		alertify.alert("Word was not used in sentence. Please try again");
	}
	
});

//functions

function resetDailyChallenge(){
	randWord = wordsList[Math.floor(Math.random() *  wordsList.length)];
	$('#challenge-word').html(randWord);
	isChallengeComplete = false;
	console.log(randWord);
};

function checkForTimeOut(){

	var currentTime = Date.now();
	// var currentItem = 

}


