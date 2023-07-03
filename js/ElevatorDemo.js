var elevator = document.getElementById("elevator");
var floorDisplay = document.getElementById("floor");
var doorDisplay = document.getElementById("door");
var elevDisplay = document.getElementById("elevator");
var loginForm = document.getElementById("login-form");
var elevatorContainer = document.getElementById("elevator-container");

var currentFloor = 1;
var floorHeight = 100;

function onLoad() {
    var usernameField = document.getElementById("username");
    usernameField.focus();
}

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (!checkULen(username)) {
        return false;
    }
    else if (!checkPLen(password)) {
        return false;
    }
    else {
        // Perform login authentication here
        var xhr = new XMLHttpRequest();             //XMLHttpRequest object allows you to send HTTP requests from JavaScript without reloading the entire web page
        xhr.open("POST", "../php/login_data.php", true);   //true for asynchronous 
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) { //value 4 indicates that the request has completed and the response is ready. value 200 Represents the HTTP status code of the response.
                var response = xhr.responseText;
                if (response.includes("Login successful!")) {
                    alert("valid username or password");
                    loginForm.style.display = "none";
                    elevatorContainer.style.display = "block";
                } else {
                    alert("Invalid username or password");
                }
                // Process the response from the PHP file
                console.log(response);
            }
        };
        var data = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password); //encodeURIComponent is a JS function used to encode special characters with their percent-encoded values to avoid errors
        xhr.send(data);
    }

}

function checkULen(uname) {
    if (uname.length < 7) {
        alert("Username too short");
        return false;
    }
    else {
        return true;
    }
}

function checkPLen(pword) {
    if (pword.length < 7) {
        alert("Password too short");
        return false;
    }
    else {
        return true;
    }
}

function goToFloor(floor) {
    if (doorDisplay.innerText != "Door Status: Open") {

        var xhr = new XMLHttpRequest();             //XMLHttpRequest object allows you to send HTTP requests from JavaScript without reloading the entire web page
        xhr.open("GET", "../php/index.php?floor=" + floor, true);   //true for asynchronous 

        xhr.onreadystatechange = function () {

            if (xhr.readyState === 4 && xhr.status === 200) { //value 4 indicates that the request has completed and the response is ready. value 200 Represents the HTTP status code of the response.
                var response = xhr.responseText;
            }

        };
        xhr.send();

        var targetFloorPosition = (floor - 1) * floorHeight;
        var currentPosition = parseInt(getComputedStyle(elevator).top) || 0;
        var distance = Math.abs(currentPosition - targetFloorPosition);
        var duration = distance * 1; // Adjust the duration as desired
        animateElevator(currentPosition, targetFloorPosition, duration);
        floorDisplay.innerText = "Floor: " + floor;
        currentFloor = floor;
    }
}
function showFloor() {
    var xmlhttpShow = new XMLHttpRequest();     // Instantiate a XMLHttpRequest object
    // Function to be executed when readyState changes (server response ready)
    xmlhttpShow.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // readyState holds the status of the XMLHttpRequest (4 means finished request and server response is ready)
            // status hold 200 for OK
            document.getElementById("floor").innerHTML = this.responseText;
            // responseText string returned from server in 'echo' statement
            // THIS IS A GLOBAL VARIABLE SINCE DECLARED IN HTML FILE - Convert text string to javascript array in JSON format 
            // 'this' refers to the xmlhttp object and responseText is the property that contains the text returned from the server
        }
    };
    xmlhttpShow.open("GET", "../php/showFloor.php?q=", true);  // Open connection
    xmlhttpShow.send();                                       // Send request

}

function showFloorTimeout() {     // Button updates 250 ms after pressed
    setTimeout(showFloor, 250);
}

function showFloorInterval() {    // Automatic updates every 250 ms
    setInterval(showFloor, 1000);
}

// Event listeners 
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

window.addEventListener('load', onLoad, false);