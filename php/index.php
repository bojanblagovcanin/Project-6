<?php
session_start(); 
require "../html/index.html";
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

function save_floor_and_time(int $floor, int $node_ID)
{
    $db2 = new PDO('mysql:host=127.0.0.1;dbname=floordata', 'ese', 'ese');
    
    $weekday = date('N'); // 'N' returns the ISO-8601 numeric representation of the day of the week (1 for Monday, 7 for Sunday)
    $hour = date('G'); // 'G' returns the 24-hour format of the hour (0 to 23)
    
    $query = 'INSERT INTO floor_log (nodeID, floor, weekday, hour) 
              VALUES (:nodeID, :floor, :weekday, :hour)';
    $statement = $db2->prepare($query);
    $statement->bindValue('nodeID', $node_ID);
    $statement->bindValue('floor', $floor);
    $statement->bindValue('weekday', $weekday);
    $statement->bindValue('hour', $hour);
    $statement->execute();
}

?>

<?php
$floor = $_GET['floor'];
save_floor_and_time($floor, 1);
$curFlr = update_elevatorNetwork(1, $floor);
?>