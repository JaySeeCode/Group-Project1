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

database.ref().on("child_added", function(childSnapshot){

	var sv = childSnapshot.val();
	var key = sv.favoriteWordEntry;

	console.log(sv);
	console.log(sv.favoriteWordEntry);

	var $button = $('<button />');
	$button.addClass("removeButton");
	$button.attr("key", key);
	$button.text(" X ");

	var $entry = '<li>' + key + '</li>';

	$('#list').prepend($entry, $button);

	$('.removeButton').on("click", function(){

		// console.log($(this).attr("key"));

		// var wordToRemove = $(this).attr("key");

		// var entryRef = database.ref('favoriteWordEntry');
		console.log("here");
		database.ref().child($(this).attr("key")).remove();

	});



});