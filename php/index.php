<?php
function update_elevatorNetwork(int $node_ID, int $new_floor = 1): int
{
	$db1 = new PDO('mysql:host=localhost;dbname=elevator', 'ese', 'ese');
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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	// Check if a specific form field is submitted

	$floor = $_POST['data'];

		echo $floor;

		if ($floor === '1'){
			echo "floor 1 go";
			update_elevatorNetwork(1, 1);
		}
		if ($floor === '2'){
			echo "floor 2 go";
			update_elevatorNetwork(1, 2);
		}
		if ($floor === '3'){
			echo "floor 3 go";
			update_elevatorNetwork(1, 3);
		}
	}

?>