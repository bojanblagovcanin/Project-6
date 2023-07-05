document.addEventListener('DOMContentLoaded', function() {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Set up the request
  xhr.open('GET', '../php/member.php', true);

  // Set the callback function
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Request successful, update the username in the navbar
        var username = xhr.responseText;
        var usernameLink = document.getElementById('username-link');
        usernameLink.innerHTML = username;
      } else {
        // Request failed, handle the error
        console.log('Error:', xhr.status);
      }
    }
  };

  // Send the request
  xhr.send();
});
