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


<html>
<h1>ESE Project VI Elevator</h1>

<?php
if (isset($_POST['newfloor'])) {
    $curFlr = update_elevatorNetwork(1, $_POST['newfloor']);
    header('Refresh:0; url=../php/learn.php');
}
$curFlr = get_currentFloor();
echo "<h2>Current floor # $curFlr </h2>";
?>

<h2>
    <form action="learn.php" method="POST">

            <button class="floor-button" id="floor1" name="newfloor">Floor 1</button>
            <button class="floor-button" id="floor2" name="newfloor">Floor 2</button>
            <button class="floor-button" id="floor3" name="newfloor">Floor 3</button>
    </form>

   
</h2>

</html>
