var loginForm = document.getElementById("login-form");

function onLoad() {
    var usernameField = document.getElementById("username");
    usernameField.focus();
}

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Perform login authentication here
    var xhr = new XMLHttpRequest();             //XMLHttpRequest object allows you to send HTTP requests from JavaScript without reloading the entire web page
    xhr.open("POST", "../php/login_data.php", true);   //true for asynchronous 
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { //value 4 indicates that the request has completed and the response is ready. value 200 Represents the HTTP status code of the response.
            var response = xhr.responseText;
            if (response.includes("Login successful!")) {
                window.location.href = "../html/index.html";
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

window.addEventListener('load', onLoad, false);