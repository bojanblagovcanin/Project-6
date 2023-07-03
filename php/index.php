<?php
	function update_elevatorNetwork(int $node_ID, int $new_floor =1): int {
		$db1 = new PDO('mysql:host=127.0.0.1;dbname=elevator','ese','ese');
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
		if(isset($_GET['newfloor'])) {
			$curFlr = update_elevatorNetwork(1, $_GET['newfloor']); 
			echo "going to floor: " + $_GET['newfloor'];
			header('Refresh:0; url=../php/index.php');	
        } 
    			
	?>