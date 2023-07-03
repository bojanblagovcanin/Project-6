<?php

// get the q parameter from URL
$q = $_REQUEST["q"];        // In this case $q == "" empty string


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

// string sent to function that handles the 'onreadystatechange' event
echo json_encode(get_currentFloor());

?>