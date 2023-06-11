var feedbk = document.getElementById("feedback");
var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var email = document.getElementById("email");
var bdate = document.getElementById("bdate");
var student = document.getElementById("student");
var faculty = document.getElementById("faculty");
var doorDisplay = document.getElementById("fd");


function testFill()
{
  if (fname.value.length <1) {
    feedbk.innerText = "Error, no first name provided";
  } else if (lname.value.length <1) {
    feedbk.innerText = "Error, no last name provided";
  } else if (email.value.length <1) {
    feedbk.innerText = "Error, no email provided";
  } else if (bdate.value.length<1){
    feedbk.innerText = "Error, no birthday provided";
  } else if (!student.checked && !faculty.checked){
    feedbk.innerText = "Error, are you student or faculty?";
  } else {
    feedbk.innerText = "";
  }
}


window.onload = function() {
    var textarea = document.getElementById("message");
    var charCount = document.getElementById("charCount");
  
    // Function to update character count
    function updateCharCount() {
      var message = textarea.value;
      var remainingChars = 180 - message.length;
  
      charCount.textContent = remainingChars + " characters remaining";
  
      if (remainingChars < 0) {
        charCount.style.color = "red";
        charCount.textContent = "Exceeded the maximum character limit!";
      } else {
        charCount.style.color = "black";
      }
    }
  
    // Attach event listener to textarea input
    textarea.addEventListener("input", updateCharCount);
  };