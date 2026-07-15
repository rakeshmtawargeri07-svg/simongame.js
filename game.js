// Array containing all possible button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Stores the game's generated sequence
var gamePattern = [];

// Stores the sequence clicked by the user
var userClickedPattern = [];

// Checks whether the game has started
var started = false;

// Keeps track of the current level
var level = 0;

// Starts the game when any key is pressed
$(document).keypress(function() {

  // Start only if the game hasn't started already
  if (!started) {

    // Display the current level
    $("#level-title").text("Level " + level);

    // Generate the first color
    nextSequence();

    // Mark the game as started
    started = true;
  }
});

// Runs whenever a colored button is clicked
$(".btn").click(function() {

  // Get the ID (color) of the button clicked
  var userChosenColour = $(this).attr("id");

  // Add the clicked color to the user's sequence
  userClickedPattern.push(userChosenColour);

  // Play the corresponding sound
  playSound(userChosenColour);

  // Animate the button press
  animatePress(userChosenColour);

  // Check if the latest click is correct
  checkAnswer(userClickedPattern.length - 1);
});

// Checks whether the user's latest click is correct
function checkAnswer(currentLevel) {

  // Compare the current user click with the game's sequence
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    // If the user completed the whole sequence correctly
    if (userClickedPattern.length === gamePattern.length) {

      // Wait for 1 second before showing the next sequence
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {

    // If the answer is wrong

    // Play wrong sound
    playSound("wrong");

    // Add red flash effect
    $("body").addClass("game-over");

    // Show game over message
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Remove red flash after 200 ms
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Reset the game
    startOver();
  }
}

// Generates the next random color in the sequence
function nextSequence() {

  // Clear the user's previous clicks for the new level
  userClickedPattern = [];

  // Increase the level
  level++;

  // Update the level heading
  $("#level-title").text("Level " + level);

  // Generate a random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);

  // Get the corresponding color
  var randomChosenColour = buttonColours[randomNumber];

  // Add the color to the game's sequence
  gamePattern.push(randomChosenColour);

  // Flash the selected button
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play its sound
  playSound(randomChosenColour);
}

// Adds a pressed animation to the clicked button
function animatePress(currentColor) {

  // Add the CSS class
  $("#" + currentColor).addClass("pressed");

  // Remove the class after 100 ms
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Plays the sound for the given button color
function playSound(name) {

  // Create the audio object
  var audio = new Audio("sounds/" + name + ".mp3");

  // Play the sound
  audio.play();
}

// Resets the game variables after Game Over
function startOver() {

  // Reset level to 0
  level = 0;

  // Clear the game sequence
  gamePattern = [];

  // Allow the game to start again
  started = false;
}
