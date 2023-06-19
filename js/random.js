function updateDateTime() {
    var dateTime = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    var formattedDateTime = dateTime.toLocaleDateString(undefined, options);
    document.getElementById("datetime").textContent = formattedDateTime;
}
updateDateTime();
setInterval(updateDateTime, 1000);