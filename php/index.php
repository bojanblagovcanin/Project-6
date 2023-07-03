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
$floor = $_GET['floor'];
echo $floor;

if (isset($_POST['newfloor'])) {
    $curFlr = update_elevatorNetwork(1, $_POST['newfloor']);
}
?>