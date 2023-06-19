<?php
	function update_elevatorNetwork(int $node_ID, int $new_floor =1): int {
		$db1 = new PDO('mysql:host=localhost;dbname=elevator','master','123');
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
	function get_currentFloor(): int {
		try { $db = new PDO('mysql:host=localhost;dbname=elevator','master','123');}
		catch (PDOException $e){echo $e->getMessage();}

			// Query the database to display current floor
			$rows = $db->query('SELECT currentFloor FROM elevatorNetwork');
			foreach ($rows as $row) {
				$current_floor = $row[0];
			}
			return $current_floor;
	}
?>
        <?php
        if(isset($_POST['floor1'])) {
            $curFlr = update_elevatorNetwork(1, $_POST['floor1']); 
			header('Refresh:0; url=../php/index.php');	
        }

		if(isset($_POST['floor2'])) {
            $curFlr = update_elevatorNetwork(1, $_POST['floor2']); 
			header('Refresh:0; url=../php/index.php');	
        }

		if(isset($_POST['floor3'])) {
            $curFlr = update_elevatorNetwork(1, $_POST['floor3']); 
			header('Refresh:0; url=../php/index.php');	
        }

?>
 
 
