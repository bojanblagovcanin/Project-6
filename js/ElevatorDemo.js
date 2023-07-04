var elevator = document.getElementById("elevator");
var floorDisplay = document.getElementById("floor");
var doorDisplay = document.getElementById("door");
var elevDisplay = document.getElementById("elevator");
var elevatorContainer = document.getElementById("elevator-container");

var currentFloor = 1;
var floorHeight = 100;

function goToFloor(event, floor) {
    event.preventDefault(); // Prevent the default form submission behavior
    if (doorDisplay.innerText != "Door Status: Open") {

        var xhr = new XMLHttpRequest();             //XMLHttpRequest object allows you to send HTTP requests from JavaScript without reloading the entire web page
        xhr.open("GET", "../php/index.php?floor=" + floor, true);   //true for asynchronous, pass floor number to update database 

        xhr.onreadystatechange = function () { //this is where we say what we want to do once we connect with php
            if (xhr.readyState === 4 && xhr.status === 200) {
                //value 4 indicates that the request has completed and the response is ready. value 200 Represents the HTTP status code of the response.
                var response = xhr.responseText;
            }
        };
        xhr.send();

        var targetFloorPosition = (floor - 1) * floorHeight;
        var currentPosition = parseInt(getComputedStyle(elevator).top) || 0;
        var distance = Math.abs(currentPosition - targetFloorPosition);
        var duration = distance * 5; // Adjust the duration as desired

        animateElevator(currentPosition, targetFloorPosition, duration);
        currentFloor = floor; // Update the current floor with the selected floor
    }
    else {
        alert("Door is open");
    }
}

function showFloor() {
    var xmlhttpShow = new XMLHttpRequest();
    xmlhttpShow.open("GET", "../php/showfloor.php?q=", true);
    xmlhttpShow.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("floor").innerHTML = this.responseText;
        }
    };
    xmlhttpShow.send();
}


function showFloorInterval() {    // Automatic updates every 250 ms
    setInterval(showFloor, 250);
}

window.addEventListener('load', function () { showFloorInterval() }, false);  // Button updates 250 ms after pressed

//Elevator Door Animation
function openDoor() {
    doorDisplay.innerText = "Door Status: Open";
    elevDisplay.src = "../images/OpenElevator.png";
}

function closeDoor() {
    doorDisplay.innerText = "Door Status: Closed";
    elevDisplay.src = "../images/Elevator.png";
}

//Elevator Movement animation
function animateElevator(start, target, duration) {
    var startTime = null;
    var currentPosition = start;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = timestamp - startTime;
        var position = easeInOutQuad(progress, start, target - start, duration);
        elevator.style.top = position + "px";
        currentPosition = position;

        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);

    // Update the elevator's final position after the animation completes
    elevator.style.top = target + "px";
}

// Easing function for smooth animation
function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

function moveDown() {
    if (currentFloor < 3) {
        goToFloor(event, currentFloor + 1);
    }
}

function moveUp() {
    if (currentFloor > 1) {
        goToFloor(event, currentFloor - 1);
    }
}