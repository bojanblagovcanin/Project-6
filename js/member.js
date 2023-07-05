function updateUser() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '../php/member.php', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        document.getElementById("floor").innerHTML = this.responseText;
      } else {
        // Request failed, handle the error
        console.log('Error:', xhr.status);
      }
    }
  };
  // Send the request
  xhr.send();
  console.log(username);
}

function showusername() {    // Automatic updates every 250 ms
  setInterval(updateUser, 1000);
}

window.addEventListener('load', function () { showusername() }, false);