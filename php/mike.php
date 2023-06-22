<?php
function update_elevatorNetwork(int $node_ID, int $new_floor = 1): int
{
    $db1 = new PDO('mysql:host=127.0.0.1;dbname=elevator', 'ese', 'ese');
    $query = 'UPDATE elevatorNetwork 
				SET currentFloor = :floor
				WHERE nodeID = :id';
    $statement = $db1->prepare($query);
    $statement->bindvalue('floor', $new_floor);
    $statement->bindvalue('id', $node_ID);
    $statement->execute();

    return $new_floor;
}
?>



<!DOCTYPE html>
<html>

<head>
    <title>Elevator Simulator</title>
    <meta name="Group 3" content="Elevator" http-equiv="pragma" content="no-cache">
    <link rel="stylesheet" type="text/css" href="../css/ElevatorDemo.css">
    <meta http-equiv="pragma" content="no-cache">
</head>

<body>

    <?php
    /*
        if(isset($_POST['newfloor'])) {
            $curFlr = update_elevatorNetwork(1, $_POST['newfloor']); 
            header('Refresh:0; url=mike.php');	
        } 
    */
    $curFlr = update_elevatorNetwork(1, 2);
    echo $_POST['newfloor'];

    ?>

    <div class="container">
        <h1>Elevator Simulator</h1>

        <!--
        <form action="../php/login_data.php" method="post"></form>
        
        <div id="login-form">
            <input type="text" id="username" placeholder="Username">
            <input type="password" id="password" placeholder="Password">
            <button onclick="login()">Login</button>
            <br>
            <br>
            <li>
                <a href="request_access.html" class="request-button">
                    <img src="../images/requestaccess.png" alt="Request Access" width='180px' height='50px'
                        class="hover-image active-image rounded-corners">
                </a>
            </li>
        </div>
        -->

        <!-- Elevator Control -->
        <div id="elevator-container">
            <form action="mike.php" method="post"></form>
            <div id="floor">Floor: 1</div>
            <div id="door">Door Status: Closed</div>
            <br>
            <img id="elevator" src="../images/Elevator.png"></img>

            <form action="mike.php" method="POST">
                <img class="floor1-button" id="floor1" onclick="goToFloor(1)" src="../images/Button1.png" width="50"
                    height="50" name="newfloor" value=1 type="submit"></img>
            </form>


            <img class="floor1-button" id="floor1-open" onclick="openDoor()" src="../images/OpenDoor.png" width="50"
                height="50"></img>
            <img class="floor1-button" id="floor1-close" onclick="closeDoor()" src="../images/CloseDoor.png" width="50"
                height="50"></img>

            <form action="mike.php" method="POST">
                <img class="floor2-button" id="floor2" onclick="goToFloor(2)" src="../images/Button2.png" width="50"
                    height="50" name="newfloor" value=2 type="submit"></img>
            </form>

            <img class="floor2-button" id="floor2-open" onclick="openDoor()" src="../images/OpenDoor.png" width="50"
                height="50"></img>
            <img class="floor2-button" id="floor2-close" onclick="closeDoor()" src="../images/CloseDoor.png" width="50"
                height="50"></img>

            <form action="mike.php" method="POST">
                <img class="floor3-button" id="floor3" onclick="goToFloor(3)" src="../images/Button3.png" width="50"
                    height="50" name="newfloor" value=3 type="submit"></img>
            </form>

            <img class="floor3-button" id="floor3-open" onclick="openDoor()" src="../images/OpenDoor.png" width="50"
                height="50"></img>
            <img class="floor3-button" id="floor3-close" onclick="closeDoor()" src="../images/CloseDoor.png" width="50"
                height="50"></img>

            <div id="inside-panel">
                <img id="UpArrow" onclick="moveUp()" src="../images/ArrowUp.png" width="75" height="75"></img>
                <img id="DownArrow" onclick="moveDown()" src="../images/ArrowDown.png" width="75" height="75"></img>
                <br>
                <img class="open-button" id="inside-open" onclick="openDoor()" src="../images/OpenDoor.png" width="75"
                    height="75"></img>
                <img class="close-button" id="inside-close" onclick="closeDoor()" src="../images/CloseDoor.png"
                    width="75" height="75"></img>
            </div>
        </div>

        <script src="../js/ElevatorDemo.js"></script>
</body>

</html>