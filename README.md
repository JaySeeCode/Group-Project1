# Word Up

We created a project that helps people expand their vocabulary through access to a mobile dictionary. We help the user become more literate by allowing them to create their own sentences using a daily challenge word. Users that have favorite words or ones more difficult to remember can save them for quicker access when needed.

## Screenshots
![Alt text](http://i1044.photobucket.com/albums/b447/janetwalker271989/definition_zpsjjstmbis.jpg)   ![Alt text](http://i1044.photobucket.com/albums/b447/janetwalker271989/favorite_zpspu8lkpxz.jpg)   ![Alt text](http://i1044.photobucket.com/albums/b447/janetwalker271989/challenge_zpsm7lixdiz.jpg)

Our motivation in creating this project was trying to create a program that is user friendly and informative. Our group thought it would be a great idea to try and help people expand their vocabulary and get away from using the same old boring words used over and over. Our solution was creating the program called “Word Up”.  “Word up” is a mobile dictionary that allows users to look up definitions of words they are unfamiliar with.

Accessing the program through smartphone or computer gives users access to definitions , hear how words are pronounced through our “text to speak” option, save favorite words or ones you want to try to use more, and be challenged by trying to use our word of the day. 

To make sure the user understands how the word of the day should be used, we added an area for them to create a sentence using the word for practice.





## Technologies used
- jQuery
- Bootstrap
- Alertify.js
- responsive.js
- fontawesome

## Getting Started

Clone the repository and open in Sublime Text.

### Prerequisities

What to install and how for local development and testing purposes

```
- jQuery: visit https://code.jquery.com/ and copy the cdn or download
- bootstrap: visit https://www.bootstrapcdn.com/ and copy the cdn or download
- responsive voice: visit https://responsivevoice.org/api/ and copy <script></script tag. Follow directions for using the code in script source.
- alertify.js: visit https://alertifyjs.org/ and copy <script></script> tag. Follow directions for using the code in script source.
```

## Built With

* Sublime Text

## Walk throughs of code
Snippets of code we found buggy, interesting, or are overall proud of.  

Having the button populate and show up next to the favorite word instead of underneath it.

```
function renderButton(arr){
        var $button = $('<button />');
        $button.addClass("removeButton");
        $button.attr("key", arr.key);
        $button.attr("value", arr.favoriteWordEntry);
        $button.text('X');

        $entry = $('<li style="font-size:10px; padding-left:10px; ">' + '<span>'+ arr.favoriteWordEntry+ '</span>'  + '</li>');

        $entry.append($button)

        $('#list').prepend($entry);
    };

});
```
All three functions below work together to make sure that the daily challenge updates on a 24 hour basis.
```
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
```
```
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
```
```
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
```

## Authors

* **Juan Carlos Gonzalez
* **Michael Memmons
* **Janet Walker

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
