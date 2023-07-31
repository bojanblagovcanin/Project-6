<?php
function updateelevatorNetwork(int $current_floor, int $new_status = 1): void {

    $db=new PDO(
        'mysql:host=localhost; dbname=elevator',
        'ese',
        'ese'
    );

    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    $db->beginTransaction();

    try {
    $query='UPDATE elevatorNetwork
            SET status :stat
            WHERE currentFloor = :cf';
    $statement = $db->prepare($query);
    $statement->bindValue('stat', $new_status);
    $statement->bindValue('cf', $current_floor);
    $statement->execute();

    $count = $statement->rowCount();
    if($count==0)
    {
        throw new Exception('No changes');
    }
    echo "<br/><br/>Success.<br/><br/>";
    $db->commit();
    } catch (Exception $e) {
    echo $e->getMessage();
    $db->rollBack();
    }

}



?>