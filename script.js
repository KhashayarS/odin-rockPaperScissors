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
	
	let result, message, winnerChoice, loserChoice;
	
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
        winnerChoice = playerSelection;
        loserChoice = playerSelection;
	} else if (winningDifferences.includes(choicesDifference)) {
		result = 'win';
		message = `You win! ${playerSelection} beats ${computerSelection}`;
        winnerChoice = playerSelection;
        loserChoice = computerSelection;
	} else if (losingDifferences.includes(choicesDifference)) {
		result = 'lose';
        message = `You lost! ${computerSelection} beats ${playerSelection}`;
        winnerChoice = computerSelection;
        loserChoice = playerSelection;
    }

	let resultObject = {
		result: result,
		message: message,
        winnerChoice:  winnerChoice,
        loserChoice: loserChoice,
	};

	return resultObject
}

function playGame() {
	console.log("This function was deleted and will be implemented with a new logic");
}



let playerButtonsContainer = document.querySelector(".playerButtonsContainer");
let computerPick = document.querySelector("#computerPick");
let roundResult = document.querySelector(".resultsContainer .roundResult");
let currentUserScore = document.querySelector("#currentUserScore");
let currentComputerScore = document.querySelector("#currentComputerScore");
let userScore = 0;
let computerScore = 0;
let gamePaused = false;


function pauseGame() {
    gamePaused = true;
    playerButtonsContainer.removeEventListener("click", userBtnClickHandler);
}

function resumeGame() {
    gamePaused = false;
    playerButtonsContainer.addEventListener("click", userBtnClickHandler);
}


function resetRound() {
    let playerButtonsItems = playerButtonsContainer.children;

    for (btn of playerButtonsItems) {
        if (btn.classList.contains('picked')) {
            btn.classList.remove('picked');
        }
    }

    computerPick.innerText = "?";

    roundResult.innerHTML = "";

    let rockPaperScissorsGif = document.createElement("img");
    rockPaperScissorsGif.src = "./static/images/rock-paper-scissors.gif";
    rockPaperScissorsGif.classList.add("rockPaperScissorsGif");
    roundResult.appendChild(rockPaperScissorsGif);

    resumeGame();
}


function displayRoundResult(roundResultObject) {
    let result = roundResultObject.result;
    let message = roundResultObject.message;
    let winnerChoice = roundResultObject.winnerChoice;
    let loserChoice = roundResultObject.loserChoice;
    
    roundResult.innerHTML = "";
    
    let roundResultIcons = document.createElement('p');
    roundResultIcons.setAttribute('id', 'roundResultIcons');

    let winnerElementFontAwesome = `<i class="fa fa-hand-${winnerChoice}-o fa-lg"></i>`;
    let loserElementFontAwesome = `<i class="fa fa-hand-${loserChoice}-o fa-lg"></i>`;

    let properVerb;
    
    if (result === 'win' && winnerChoice === 'scissors') {
        properVerb = 'BEAT';
    } else if (result === 'tie' && winnerChoice === 'scissors') {
        properVerb = 'EQUAL';
    } else if (result === 'tie') {
        properVerb = 'EQUALS';
    } else {
        properVerb = 'BEATS';
    }

    let insertingHTML = `${winnerElementFontAwesome}&nbsp;&nbsp;&nbsp;${properVerb}&nbsp;&nbsp;&nbsp;${loserElementFontAwesome}`;

    
    roundResultIcons.innerHTML = insertingHTML;
    
    let resultPara = document.createElement('p');

    if (result === 'win') {
        resultPara.classList.add('winningRound');
        resultPara.innerText = "You Won!";
    } else if (result === 'lose') {
        resultPara.classList.add('losingRound');
        resultPara.innerText = "You Lost!";
    } else {
        resultPara.classList.add('tyingRound');
        resultPara.innerText = "It's a Tie!";
    }
    
    let playAgainBtn = document.createElement('button');
    playAgainBtn.setAttribute('class', 'playAgainBtn');
    playAgainBtn.setAttribute('role', 'button');
    playAgainBtn.innerHTML =  '<span class="text">Play Again!</span>';

    roundResult.appendChild(roundResultIcons);
    roundResult.appendChild(resultPara);
    roundResult.appendChild(playAgainBtn);
        
}


function updateTotalScore(userScore, computerScore) {
    let currentUserScore = document.querySelector("#currentUserScore");
    let currentComputerScore = document.querySelector("#currentComputerScore");
    
    currentUserScore.innerText = `You: ${userScore}`;
    currentComputerScore.innerText = `Computer: ${computerScore}`;
}


function activatePlayAgainBtn() {
    let playAgainBtn = document.querySelector('.roundResult .playAgainBtn');
    
    playAgainBtn.addEventListener('click', (event) => {
        resetRound();
    });
}


function userBtnClickHandler(event) {

    let validButtonSelected = event.target.classList.contains('itemPickBtn');

    if ((!gamePaused) && validButtonSelected) {

        pauseGame();

        let pickedElement = event.target;
        let btnId = event.target.id;
        let userChoice = event.target.value;


        pickedElement.classList.add("picked");

        let computerChoice = getComputerChoice();
        computerPick.innerText = computerChoice;

        let resultObject = playRound(userChoice, computerChoice);

        if (resultObject.result === 'win') {
            userScore++;
        } else if (resultObject.result === 'lose') {
            computerScore++;
        } 

        displayRoundResult(resultObject);

        updateTotalScore(userScore, computerScore);

        activatePlayAgainBtn();
    }

}

// Anonyous function handle the events
(function () {
    
    playerButtonsContainer.addEventListener("click", userBtnClickHandler);

})();
