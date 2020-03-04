/* GAME FUNCTIONS
- Players must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify the player of the correct answer of loose
- Let player choose yo play again
*/

// Create variables - Game VariablesL
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI ELements
const UIgame = document.querySelector("#game"),
  UIinput = document.querySelector("#guess-input"),
  UIminNum = document.querySelector(".min-num"),
  UImaxNum = document.querySelector(".max-num"),
  UImessage = document.querySelector(".message"),
  UIguessBtn = document.querySelector(".play");

// Assign UI Min & Max values
UIminNum.textContent = min;
UImaxNum.textContent = max;

// event listener
UIguessBtn.addEventListener("click", function() {
  let guess = parseInt(UIinput.value);
  console.log(guess);

  // Validate input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if winning number:
  else if (guess === winningNum) {
    // Game Over - Right answer
    gameOver(
      "Congratulations! You win... <br/><br/> <span style='font-size:1.2rem'>Don't you have anything better to do?</span>",
      "green"
    );
  } else {
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game Over - Wrong Answer
      gameOver(
        `Unlucky. The correct number was ${winningNum}. Try again next time.`,
        "red"
      );
    } else {
      // Game Continues - Wrong Answer
      setMessage(
        `${guess} is incorrect. You have ${guessesLeft} guesses left.`,
        "red"
      );
      UIinput.value = "";
    }
  }
});

// Game Over Function
function gameOver(message, color) {
  UIinput.disabled = true;
  // UIinput.style.borderColor = color;
  setMessage(message, color);
  UIguessBtn.value = "Play Again";
  UIguessBtn.className = "play-again";
}

UIgame.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
    // UIinput.disabled = false;
    // UIguessBtn.value = "Submit";
    // UIguessBtn.className = "play";
  } else {
    console.log(1);
  }
});

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Create message function
function setMessage(msg, color) {
  UImessage.style.color = color;
  UIinput.style.borderColor = color;
  UImessage.innerHTML = msg;
}
