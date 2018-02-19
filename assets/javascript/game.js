// Start Game
addEventListener("keyup", function(e){
	initGame();
	e.stopImmediatePropagation();
},{ once: true });
// Event listener for guesses
addEventListener("keyup",function(e){
	
	handleGuess(e.key);
});
var totalGuesses = 20;

var choicesArr = ['Giovanni', 'Puzzle', 'Blue','June','Books','Cars','Shrek','Ju']; 
var wordArr = [];
var failed = [];
var blanks = '';
var winCount = 0;
var lossCount = 0;
var totGuessMade = 0;
function initGame(){
	blanks = '';
	failed = [];
	wordArr = [];
	totGuessMade = 0;
	var word = choicesArr[Math.floor(Math.random() * choicesArr.length)];
	for(var i=0;i <= (word.length)-1; i++){
			wordArr.push('_');
			blanks += "_ ";
	}
	document.getElementById("word").innerHTML=word;
	document.getElementById("blanks").innerHTML=blanks;
}
function handleGuess(guess){
	
	totGuessMade++;
	// Get vlaue of the word
	var word = (document.getElementById("word").innerHTML).toLowerCase();
	// Get the location of the letter in the word
	var indexes = locations(guess,word);
	if(!indexes.length){
		// Letter not found in word
		// push the letter on failed arr
		failed.push(guess);
		// Todo: display hangman divs pass failed array to displayHangman function
	} else {
		// reset blanks
		blanks = '';
		// replace string value with letter in word array
		for(var i = 0; i < indexes.length; i++){
			// Get the value of the indexes so we can 
			//     replace the letter in the word with the guessed letter at the index of
			var replaceIndex = indexes[i];
			wordArr[replaceIndex] = guess;
		}
		for(var i = 0;i < wordArr.length;i++){
			var value = wordArr[i];
			// stringify array
			blanks += value+" ";
		}
		document.getElementById("blanks").innerHTML=blanks;
		if(checkForWin(blanks)){
			winCount++;
			document.getElementById("winCount").innerHTML=winCount;
			initGame();			
		}
	}
	if(checkForLoss(totGuessMade)){
		lossCount++;
		document.getElementById("lossCount").innerHTML=lossCount;
		initGame();
	}
	var remaining = guessesRemaining(totGuessMade);
	var failedStr = setFailed(failed);
	document.getElementById("failed").innerHTML=failedStr;
	document.getElementById("remaining").innerHTML=remaining;
}
function displayHangman(failed){
	switch(failed.length){
		case 1:
			console.log("Head");
			break;
		case 2: 
			console.log("Body");
			break;
		case 3:
			console.log("R Arm");
			break;
		case 4:
			console.log("L Arm");
			break;
		case 5:
			console.log("R Leg");
			break;
		case 6:
			console.log("L Leg");
			return 1;
	}
}
function guessesRemaining(count){
	var guessRemaining = totalGuesses - count;
	return guessRemaining;
}
function checkForLoss(count){
	if(count == totalGuesses || count.length == 6){
		return 1;
	} else {
		return 0;
	}
}
function checkForWin(str){
	if(str.indexOf("_") === -1){
		//winner
		return 1;
	} else {
		return 0;
	}
}
// function to get the location in the string of the guessed letter
function locations(guessed,word){
	var locations=[],i=-1;
	while((i=word.indexOf(guessed,i+1)) >= 0) locations.push(i);
	return locations;
}
// This function could be used to set both the strings
function setFailed(guessedArr){
	var guessedStr = '';
	for(var i = 0;i < guessedArr.length;i++){
		guessedStr += guessedArr[i]+" ";
	}
	return guessedStr;
}