<?php
// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the form data
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $birthday = $_POST['birthday'];
    $fac_or_student = $_POST['fac_or_student'];
    $comments = $_POST['comments'];

    // Example: Display the form data
    echo "First Name: " . $firstname . "<br>";
    echo "Last Name: " . $lastname . "<br>";
    echo "Username: " . $username . "<br>";
    echo "password: " . $password . "<br>";
    echo "Email: " . $email . "<br>";
    echo "Date of Birth: " . $birthday . "<br>";
    echo "Request Type: " . $fac_or_student . "<br>";
    echo "Comments: " . $comments . "<br>";

    // Connect to the database 
    $conn = new PDO('mysql:host=localhost;dbname=login_system', 'master', '123');

    // Prepare an SQL statement to insert the user data into the database
   $stmt = $conn->prepare('INSERT INTO users (firstname, lastname, username, password, email, birthday, fac_or_student, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
   $stmt->execute([$firstname, $lastname, $username, $password, $email, $birthday, $fac_or_student, $comments]);

    // Close the database connection
    $conn = null;

    // Redirect the user to the login page or display a success message
    // Example:
    header('../html/ElevatorDemo.html');
    exit();
}
?>
