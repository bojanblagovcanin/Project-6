var elevator = document.getElementById("elevator");
var floorDisplay = document.getElementById("floor");
var loginForm = document.getElementById("login-form");
var elevatorContainer = document.getElementById("elevator-container");

var currentFloor = 1;
var floorHeight = 100;

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Perform login authentication here
    // For simplicity, let's assume username: "admin" and password: "password"

    if (username === "admin" && password === "password") {
        loginForm.style.display = "none";
        elevatorContainer.style.display = "block";
    } else {
        alert("Invalid username or password");
    }
}

function goToFloor(floor) {
    var targetFloorPosition = (floor - 1) * floorHeight;
    var currentPosition = parseInt(getComputedStyle(elevator).top) || 0;
    var distance = Math.abs(currentPosition - targetFloorPosition);
    var duration = distance * 1; // Adjust the duration as desired

    animateElevator(currentPosition, targetFloorPosition, duration);
    floorDisplay.innerText = "Floor: " + floor;
    currentFloor = floor;
}

function animateElevator(start, target, duration) {
    var startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = timestamp - startTime;
        var position = easeInOutQuad(progress, start, target - start, duration);
        elevator.style.top = position + "px";

        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}

// Easing function for smooth animation
function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

function moveUp() {
    if (currentFloor < 3) {
        goToFloor(currentFloor + 1);
    }
}

function moveDown() {
    if (currentFloor > 1) {
        goToFloor(currentFloor - 1);
    }
}
