<?php
	function update_elevatorNetwork(int $node_ID, int $new_floor =1): int {
		$db1 = new PDO('mysql:host=localhost;dbname=elevator','ese','ese');
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
        if(isset($_POST['floor1'])) {
            update_elevatorNetwork(1, 1); 	
        }

		if(isset($_POST['floor2'])) {
            update_elevatorNetwork(1, 2); 	
        }

		if(isset($_POST['floor3'])) {
            update_elevatorNetwork(1, 3); 	
        }

?>