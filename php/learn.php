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
    header('Refresh:0; url=learn.php');
}
$curFlr = get_currentFloor();
echo "<h2>Current floor # $curFlr </h2>";
?>

<h2>
    <form action="learn.php" method="POST">
        <button type="submit" name="newfloor" value = "1"> <img src="../images/Button1.png" width="50" height="50"> </button>
        <img type="submit" name="newfloor" value = "2" src="../images/Button2.png" width="50" height="50"></img>
        <img type="submit" name="newfloor" value = "3" src="../images/Button3.png" width="50" height="50"></img>
    </form>
</h2>

</html>