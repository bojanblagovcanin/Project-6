const elevator = document.getElementById("elevator");
const floorDisplay = document.getElementById("floor");
const doorDisplay = document.getElementById("door");
const elevDisplay = document.getElementById("elevator");
const elevatorContainer = document.getElementById("elevator-container");


const floorHeight = 100;

let previousNumber = null;
let boolsatmode = false;
let intervalId = null;

let currentFloor = null;

function playdoorOpeningSound()
{
  const openingSound = document.getElementById('doorOpening');
  doorOpening.play();
}

function playdoorClosingSound()
{
  const closingsound = document.getElementById('doorClosing');
  doorClosing.play();

}

function goingUpSound()
{
  const upSound = document.getElementById('goingUp');
  goingUp.play();
}

function goingDownSound()
{
  const downSound = document.getElementById('goingDown');
  goingDown.play();
}
function goToFloor(event, floor) {
  if (event) {
    event.preventDefault();
    
  }

  if (doorDisplay.innerText != "Door Status: Open") {
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", "../php/demo.php?floor=" + floor, true);

    xmlHttpRequest.onreadystatechange = function () {
      if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
        const serverResponse = xmlHttpRequest.responseText;
      }
    };

    xmlHttpRequest.send();

    const targetFloorPosition = (floor - 1) * floorHeight;
    const currentPosition = parseInt(getComputedStyle(elevator).top) || 0;
    const distance = Math.abs(currentPosition - targetFloorPosition);
    const duration = distance * 5;

    animateElevator(currentPosition, targetFloorPosition, duration);
    currentFloor = floor;
  } else {
    alert("Door is open");
  }
  
}

function showFloor() {
  const xmlhttpShow = new XMLHttpRequest();
  xmlhttpShow.open("GET", "../php/showfloor.php?q=", true);
  xmlhttpShow.onreadystatechange = function () {
    if (xmlhttpShow.readyState === 4 && xmlhttpShow.status === 200) {
      floorDisplay.innerHTML = xmlhttpShow.responseText;
    }
  };
  xmlhttpShow.send();
}

function showFloorInterval() {
  setInterval(showFloor, 250);
}

window.addEventListener("load", showFloorInterval, false);

function openDoor() {
  doorDisplay.innerText = "Door Status: Open";
  elevDisplay.src = "../images/OpenElevator.png";
  playdoorOpeningSound();
}

function closeDoor() {
  doorDisplay.innerText = "Door Status: Closed";
  elevDisplay.src = "../images/Elevator.png";
  playdoorClosingSound();
}

function animateElevator(start, target, duration) {
  let startTime = null;
  let currentPosition = start;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const position = easeInOutQuad(progress, start, target - start, duration);
    elevator.style.top = position + "px";
    currentPosition = position;

    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);

  elevator.style.top = target + "px";
}

function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

function moveDown() {
  if (currentFloor < 3) {
    goToFloor(event, currentFloor + 1);
  }
  goingDownSound();
}

function moveUp() {
  if (currentFloor > 1) {
    goToFloor(event, currentFloor - 1);
  }
  goingUpSound();
}

function satmode() {
  const image = document.getElementById("sleeprobot");

  if (!boolsatmode && image.style.display === "block") {
    boolsatmode = true;
    image.style.display = "none";
    console.log("true");
    startInterval();
  } else {
    boolsatmode = false;
    image.style.display = "block";
    console.log("false");
    stopInterval();
  }
}

function startInterval() {
  intervalId = setInterval(function () {
    const randomFloor = getRandomNumber();
    goToFloor(null, randomFloor);
  }, 8000);
}

function stopInterval() {
  clearInterval(intervalId);
}

function getRandomNumber() {
  let randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * 3) + 1;
  } while (randomNumber === previousNumber);

  previousNumber = randomNumber;
  return randomNumber;
}