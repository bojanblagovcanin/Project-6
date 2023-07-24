document.getElementById("profileForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    fetch("profilesettings.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
    
        console.log(data);
        alert("Profile settings saved successfully!");
    })
    .catch(error => {
        // Handle errors
        console.error(error);
        alert("Error saving profile settings. Please try again later.");
    });
});
