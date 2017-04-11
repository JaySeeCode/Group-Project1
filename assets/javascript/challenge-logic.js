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

var randWord = wordsList[Math.floor(Math.random() *  wordsList.length)];

console.log(randWord);

$('#challengeWord').html("Today's challenge word is: " + randWord);