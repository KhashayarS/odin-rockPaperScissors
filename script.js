function getComputerChoice() {
	/*
	 * This function returns a random choice for the computer
	 */

	const choicesList = ['rock', 'paper', 'seasors']
	let randomIndex = Math.floor(Math.random() * choicesList.length);
	let randomItem = choicesList[randomIndex];
	return randomItem
}

// Test getComputerChoice
console.log(getComputerChoice());
console.log(getComputerChoice());
console.log(getComputerChoice());


