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
<?php
function get_currentFloor(): int
{
    try {
        $db = new PDO('mysql:host=127.0.0.1;dbname=elevator', 'ese', 'ese');
    } catch (PDOException $e) {
        echo $e->getMessage();
    }

    // Query the database to display current floor
    $rows = $db->query('SELECT currentFloor FROM elevatorNetwork');
    foreach ($rows as $row) {
        $current_floor = $row[0];
    }
    return $current_floor;
}
?>

<?php
if (isset($_POST['newfloor'])) {
    $curFlr = update_elevatorNetwork(1, $_POST['newfloor']);
}
?>

<html>
<head>
    <title>Elevator Simulator</title>
    <meta name="Group 3" content="Elevator" http-equiv="pragma" content="no-cache">
    <link rel="stylesheet" type="text/css" href="../css/ElevatorDemo.css">
    <meta http-equiv="pragma" content="no-cache">
</head>

<body>

    <div class="container">
        <h1>Elevator Simulator</h1>

        <!-- Elevator Control -->
        <div id="elevator-container">
            <div id="floor">Floor: 1</div>
            <div id="door">Door Status: Closed</div>
            <br>
            <img id="elevator" src="../images/Elevator.png"></img>

            <form action="../php/index.php" method="POST">
                <button type="submit" name="newfloor" value="1"> <img src="../images/Button1.png" width="50"
                        height="50" onclick="goToFloor(1)">
                </button>
            </form>


            <img class="floor1-button" id="floor1-open" onclick="openDoor()" src="../images/OpenDoor.png" width="50"
                height="50"></img>
            <img class="floor1-button" id="floor1-close" onclick="closeDoor()" src="../images/CloseDoor.png" width="50"
                height="50"></img>

            <form action="../php/index.php" method="POST">
                <button type="submit" name="newfloor" value="2"> <img src="../images/Button2.png" width="50"
                        height="50" onclick="goToFloor(2)">
                </button>
            </form>


            <img class="floor2-button" id="floor2-open" onclick="openDoor()" src="../images/OpenDoor.png" width="50"
                height="50"></img>
            <img class="floor2-button" id="floor2-close" onclick="closeDoor()" src="../images/CloseDoor.png" width="50"
                height="50"></img>

            <form action="../php/index.php" method="POST">
                <button type="submit" name="newfloor" value="3"> <img src="../images/Button3.png" width="50"
                        height="50" onclick="goToFloor(3)">
                </button>
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