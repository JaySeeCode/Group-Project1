$(document).ready(function(){

	$(function(){
		$('#accord').accordion();
	});

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

	database.ref().on("value", function(childSnapshot){

		var sv = childSnapshot.val();

		var svArr = Object.keys(sv).map(function(arr){
			var temp = sv[arr];
			temp.key = arr;
			return temp;
		});

		svArr.sort(function(a, b){
			return a.timeStamp - b.timeStamp;
		});



	console.log(sv);
	
	console.log("svArr: ", svArr);

	console.log(Object.keys(childSnapshot.val()));


	$('#list').empty();
	
	
	for (var i = 0; i < svArr.length; i++) {

		renderButton(svArr[i]);
		
	};

	
	$('.removeButton').on("click", function(){

		console.log("here");
		database.ref().child($(this).attr("key")).remove();
		$(this).remove();

	});


	function renderButton(arr){
		var $button = $('<button />');
		$button.addClass("removeButton");
		$button.attr("key", arr.key);
		$button.attr("value", arr.favoriteWordEntry);
		$button.text('X');

		$entry = $('<li style="font-size:10px; padding-left:10px; ">' + '<span>'+ arr.favoriteWordEntry+ '</span>'  + '</li>');
		$entry.append($button);

		$('#list').prepend($entry);
	};


});
});