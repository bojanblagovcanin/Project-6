function checkfirstnameInput() {
    var value = document.getElementById("fname").value;

    if (value.length < 1 ) {
        event.target.classList.add("is-invalid");

    } else {
        event.target.classList.remove("is-invalid");
        event.target.classList.add("is-valid");
        
    }
}

function checklastnameInput() {
    var value = document.getElementById("lname").value;

    if (value.length < 1 ) {
        event.target.classList.add("is-invalid");

    } else {
        event.target.classList.remove("is-invalid");
        event.target.classList.add("is-valid");
        
    }
}

function checkusernameInput() {
    var value = document.getElementById("username").value;

    if (value.length < 6 ) {
        event.target.classList.add("is-invalid");

    } else {
        event.target.classList.remove("is-invalid");
        event.target.classList.add("is-valid");
        
    }
}

function checkpasswordInput() {
    var passwordInput = document.getElementById("password");
    var passwordValue = passwordInput.value;

    // Regular expressions for password requirements
    var uppercaseRegex = /[A-Z]/;
    var numberRegex = /[0-9]/;

    var isValid = true;

    if (passwordValue.length < 6) {
        isValid = false;
    }

    if (!uppercaseRegex.test(passwordValue)) {
        isValid = false;
    }

    if (!numberRegex.test(passwordValue)) {
        isValid = false;
    }

    if (isValid) {
        passwordInput.classList.remove("is-invalid");
        passwordInput.classList.add("is-valid");
    } else {
        passwordInput.classList.remove("is-valid");
        passwordInput.classList.add("is-invalid");
    }
}

function checkemailInput() {
    var emailInput = document.getElementById("email");
    var emailValue = emailInput.value;

    // Regular expression to check email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
        emailInput.classList.remove("is-valid");
        emailInput.classList.add("is-invalid");
    } else {
        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
    }
}
