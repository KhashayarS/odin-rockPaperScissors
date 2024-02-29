function getComputerChoice() {
	/*
	 * This function returns a random choice for the computer
	 */

	const choicesList = ['rock', 'paper', 'seasors']
	let randomIndex = Math.floor(Math.random() * choicesList.length);
	let randomItem = choicesList[randomIndex];
	return randomItem
}

function getUserChoice() {
	/*
	 * This function gets the user choice via prompt
	 */

	let userChoice = prompt("Select one of items below and enter the complete name (it's case-insensitive):\n\nrock\npaper\nseasors");

	// make it case-insensitive
	userChoice = userChoice.toLowerCase();

	// check if the user choice is valid
	const validItems = ['rock', 'paper', 'seasors'];
	while (!validItems.includes(userChoice)) {
		userChoice = prompt("Sorry, the item you selected is not valid! You should type one of these exact words; the case does not matter, but write the complete word!\n\nrock\npaper\nseasors")
		userChoice = userChoice.toLowerCase();
	}

	return userChoice
}

// test getUserChoice function
console.log(getUserChoice());


