const MILLISECONDS_PER_MINUTE = 1000 * 60
const MILLISECONDS_PER_HOUR = 1000 * 60 * 60

// Declare variables for DOM elements
const startButton = document.querySelector("#start");
const submitButton = document.querySelector("#submit");
const scoreButtons = document.querySelectorAll('.scorebtn');
const homeScoreDisplay = document.querySelector("#homeScore");
const awayScoreDisplay = document.querySelector("#awayScore");

startButton.addEventListener("click", startMatch);

// My functions
function startMatch() {
  // Activate score buttons
  scoreButtons.forEach(function(element) {
    element.addEventListener('click', adjustScore)
  });

  // Toggle start and submit buttons
  startButton.classList.toggle("d-none");
  submitButton.classList.toggle("d-none");

  // Initialize a counter to the game length entered by the user
  const gameDurationMinutes = parseInt(document.getElementById("minutes").innerText);
  let timeValue = gameDurationMinutes * MILLISECONDS_PER_MINUTE;

  // Update the count down every 1000 milliseconds
  let x = setInterval(function() {
    timeValue = timeValue - 1000;
    if (timeValue < 0) {
      clearInterval(x);
      displayTime(0)
    } else {
      displayTime(timeValue)
    }
  }, 1000);
}

function adjustScore(event) {
  home = parseInt(homeScoreDisplay.innerHTML)
  away = parseInt(awayScoreDisplay.innerHTML)

  switch(event.target.id) {
    case "addHome":
      home++
      break;
    case "addAway":
      away++
      break;
    case "minHome":
      home = Math.max(home - 1, 0)
      break;
    case "minAway":
      away = Math.max(away - 1, 0)
      break;
    default:
      break;
  }
  homeScoreDisplay.innerHTML = home;
  awayScoreDisplay.innerHTML = away;
  document.getElementById("homeScoreSubmit").value = home
  document.getElementById("awayScoreSubmit").value = away
}

function displayTime(timeValue) {
  // Construct strings to display minutes and seconds
  const minutes = Math.floor((timeValue % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE).toString().padStart(2, '0');
  const seconds = Math.floor((timeValue % MILLISECONDS_PER_MINUTE) / 1000).toString().padStart(2, '0');

  // Display the strings on the HTML page
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}