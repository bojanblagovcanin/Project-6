var elevator = document.getElementById("elevator");
var floorDisplay = document.getElementById("floor");
var doorDisplay = document.getElementById("door");
var elevDisplay = document.getElementById("elevator");
var loginForm = document.getElementById("login-form");
var elevatorContainer = document.getElementById("elevator-container");

var currentFloor = 1;
var floorHeight = 100;

function onLoad()
{
    var usernameField = document.getElementById("username");
    usernameField.focus();
}

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (!checkULen(username))
    {
        return false;
    }
    else if (!checkPLen(password))
    { 
        return false;
    }
    else 
    {

        checkPLen(password);
        // Perform login authentication here
        // For simplicity, let's assume username: "admin" and password: "password"
        if (username === "admin123" && password === "password") {
            loginForm.style.display = "none";
            elevatorContainer.style.display = "block";
        } else {
            alert("Invalid username or password");
        }
    }
}

function checkULen(uname)
{
    if (uname.length < 7)
    {
        alert("Username too short");
        return false;
    }
    else 
    {
        return true;
    }
}

function checkPLen(pword)
{
    if (pword.length < 7)
    {
        alert("Password too short");
        return false;
    }
    else
    {
        return true;
    }
}

function goToFloor(floor) {
    if (doorDisplay.innerText != "Door Status: Open")
    {
        var targetFloorPosition = (floor - 1) * floorHeight;
        var currentPosition = parseInt(getComputedStyle(elevator).top) || 0;
        var distance = Math.abs(currentPosition - targetFloorPosition);
        var duration = distance * 1; // Adjust the duration as desired

        animateElevator(currentPosition, targetFloorPosition, duration);
        floorDisplay.innerText = "Floor: " + floor;
        currentFloor = floor;
    }
}

//Elevator Door Animation
function openDoor()
{
    doorDisplay.innerText = "Door Status: Open";
    elevDisplay.src = "../images/OpenElevator.png";
}

function closeDoor()
{
    doorDisplay.innerText = "Door Status: Closed";
    elevDisplay.src = "../images/Elevator.png";
}



//Elevator Movement animation
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

function moveDown() {
    if (currentFloor < 3 && doorDisplay.innerText != "Door Status: Open") {
        goToFloor(currentFloor + 1);
    }
}

function moveUp() {
    if (currentFloor > 1 && doorDisplay.innerText != "Door Status: Open") {
        goToFloor(currentFloor - 1);
    }
}

window.addEventListener('load',onLoad, false);