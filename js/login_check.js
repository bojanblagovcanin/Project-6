// Function to check login status via AJAX
function checkLoginStatus() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = xhr.responseText;
            if (response.trim() === 'true') {
                
            } else {
                window.location.href = '../html/login.html'; // Redirect to login page
            }
        }
    };
    xhr.open('GET', '../php/check_login.php', true);
    xhr.send();
}

// Call the checkLoginStatus function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});
