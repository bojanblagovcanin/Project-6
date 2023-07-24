<?php

$mysqli = new mysqli('mysql:host=localhost;dbname=login_system', 'master', '123');

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstName = $_POST['firstname'];
    $lastName = $_POST['lastname'];
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); 
    $email = $_POST['email'];


    $sql = "UPDATE users SET first_name='$firstname', last_name='$lastname', username='$username', password='$password', email='$email' WHERE id=1";

    if ($mysqli->query($sql) === TRUE) {
        $response = array("success" => true, "message" => "Profile settings updated successfully.");
    } else {
        $response = array("success" => false, "message" => "Error updating profile settings: " . $mysqli->error);
    }

    echo json_encode($response);

    $mysqli->close();
}
?>
