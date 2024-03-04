function getComputerChoice() {
	/*
	 * This function returns a random choice for the computer
	 */

	const choicesList = ['rock', 'paper', 'scissors']
	let randomIndex = Math.floor(Math.random() * choicesList.length);
	let randomItem = choicesList[randomIndex];
	return randomItem
}


function getUserChoice() {
	/*
	 * This function gets the user choice via prompt
	 */

	let userChoice = prompt("Select one of items below and enter the complete name (it's case-insensitive):\n\nrock\npaper\nscissors");

	// make it case-insensitive
	userChoice = userChoice.toLowerCase();

	// check if the user choice is valid
	const validItems = ['rock', 'paper', 'scissors'];
	while (!validItems.includes(userChoice)) {
		userChoice = prompt("Sorry, the item you selected is not valid! You should type one of these exact words; the case does not matter, but write the complete word!\n\nrock\npaper\nscissors")
		userChoice = userChoice.toLowerCase();
	}

	return userChoice
}


function playRound(playerSelection, computerSelection) {
	/*
	 * This function decides the round winner
	 * Goal: use the chioces array and the difference of indices of the chioces to decide the winner
	 */
	
	let result, message;
	
	const validItems = ['rock', 'paper', 'scissors'];
	const playerIndex = validItems.indexOf(playerSelection);
	const computerIndex = validItems.indexOf(computerSelection);
	const choicesDifference = playerIndex - computerIndex;
	
	// Check whether the input arguments are correct
	if (!(validItems.includes(playerSelection) && validItems.includes(computerSelection))) {
                try {
                        throw Error('The playRound function could not find the winner! Maybe the input arguments were not correct!');
                } catch (e) {
			return e.message
                }
	}

	
	// These winning values are determined by a little trick by checking the results on paper
	const winningDifferences = [-2, 1];
	const losingDifferences = [-1, 2];

	if (choicesDifference === 0) {
		result = "tie";
		message = "It's a tie!";
	} else if (winningDifferences.includes(choicesDifference)) {
		result = 'win';
		message = `You win! ${playerSelection} beats ${computerSelection}`;
	} else if (losingDifferences.includes(choicesDifference)) {
		result = 'lose';
                message = `You lost! ${computerSelection} beats ${playerSelection}`;
        }

	let resultObject = {
		result: result,
		message: message
	};

	return resultObject
}


function playGame() {
	/* 
	 * This function plays five rounds and decides the winner of the game
	 */

	let playerSelection, computerSelection, roundResultObject;
	let roundsResults = [];   // this array would save the result of each round
	
	// Play rounds
	for (let i = 0; i <= 4; i++) {
		playerSelection = getUserChoice();
		computerSelection = getComputerChoice();
		roundResultObject = playRound(playerSelection, computerSelection);
		roundsResults.push(roundResultObject.result);
		console.log(`********** Round #${i+1} result:\nUser Selection: ${playerSelection}\nComputer Selection: ${computerSelection}\n${roundResultObject.message}`);
	}

	// Decide the game winner
	// Use filter method to count the wins and losses
	let numWins = roundsResults.filter(result => result === 'win').length;
	let numLosses = roundsResults.filter(result => result === 'lose').length;

	// Declare the winner
	if (numWins > numLosses) {
		alert('Congratulations! You won the game!\nYou can see the rounds\' results in the console.');
	} else if (numLosses > numWins) {
		alert('Sorry! You lost the game!\nYou can see the rounds\' results in the console.');
	} else {
		alert('Final result: It\'s a tie!\nYou can see the rounds\' results in the console.');
	}
}

// Test the playGame function
playGame();
