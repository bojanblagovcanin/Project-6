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