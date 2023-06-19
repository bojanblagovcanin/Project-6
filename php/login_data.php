<?php
// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the form data
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Example: Display the form data
    //echo "Username: " . $username . "<br>";
    //echo "Password: " . $password . "<br>";

    // Connect to the database 
    $conn = new PDO('mysql:host=localhost;dbname=login_system', 'master', '123');

    $stmt = $conn->prepare('SELECT username, password FROM users WHERE username = :username AND password = :password');
    $stmt->execute(['username' => $username, 'password' => $password]);

    if ($stmt->rowCount() > 0) {
        // Rows were returned, login is successful
        echo "Login successful!";
    } else {
        // No rows were returned, login is invalid
        echo "Invalid username or password!";
    }

    // Close the database connection
    $conn = null;
}
?>
