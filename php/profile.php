<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['username'])) {
    header('Location: login.html'); // Redirect to login page if not logged in
    exit();
}

// Connect to the database
try {
    $conn = new PDO('mysql:host=localhost;dbname=login_system', 'ese', 'ese');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit();
}

// Retrieve user data from the database based on the logged-in username
$username = $_SESSION['username'];
$stmt = $conn->prepare('SELECT * FROM users WHERE username = ?');
$stmt->execute([$username]);
$userData = $stmt->fetch(PDO::FETCH_ASSOC);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <title>Profile</title>
</head>
<body>
    <div id="navbarContainer"></div>

    <h1>Welcome, <?php echo $_SESSION['username']; ?>!</h1>
    <p>First Name: <?php echo $userData['firstname']; ?></p>
    <p>Last Name: <?php echo $userData['lastname']; ?></p>
    <p>Email: <?php echo $userData['email']; ?></p>
    <p>Birthday: <?php echo $userData['birthday']; ?></p>
    <p>Faculty or Student: <?php echo $userData['fac_or_student']; ?></p>
    <p>Comments: <?php echo $userData['comments']; ?></p>
    <!-- You can display other user information here -->

    <a href="logout.php">Logout</a> <!-- Assuming you have a logout page -->

    <?php
    // Close the database connection
    $conn = null;
    ?>

    <script src="../js/navbar.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
