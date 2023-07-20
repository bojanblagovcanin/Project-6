<?php
session_start(); 
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
    $query = 'INSERT INTO floor_log (nodeID, floor, time_called) 
              VALUES (:nodeID, :floor, :time_called)';
    $statement = $db2->prepare($query);
    $statement->bindValue('nodeID', $node_ID);
    $statement->bindValue('floor', $floor);
    $statement->bindValue('time_called', date('Y-m-d H:i:s'));
    $statement->execute();
}

?>

<?php
$floor = $_GET['floor'];
save_floor_and_time($floor, 1);
$curFlr = update_elevatorNetwork(1, $floor);
?>