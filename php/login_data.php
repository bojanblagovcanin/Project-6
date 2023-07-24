<?php
session_start();

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the form data
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Connect to the database 
    $conn = new PDO('mysql:host=localhost;dbname=login_system', 'ese', 'ese');

    $stmt = $conn->prepare('SELECT username, password FROM users WHERE username = :username AND password = :password');
    $stmt->execute(['username' => $username, 'password' => $password]);

    if ($stmt->rowCount() > 0) {
        // Rows were returned, login is successful
        echo "Login successful!";
        $_SESSION['username'] = $username;
        $_SESSION['logged_in'] = true; // Set the session variable
       
    } else {
        // No rows were returned, login is invalid
        echo "Invalid username or password!";
    }

    // Close the database connection
    $conn = null;
    
    
}
?>