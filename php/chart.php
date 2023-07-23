<?php
require "../html/chart.html";

session_start();


    // Connect to the database 
    echo "Connecting to Database: <br>";
    $conn = new PDO('mysql:host=localhost;dbname=floor_log', 'admin123', 'password');
    echo "Connected <br>";

    echo "Finding data: <br>";
    $rows = $conn->query('SELECT * FROM floor_log ORDER BY nodeID');
    echo "Connected <br>";

    if ($rows->rowCount() > 0) {
        // Rows were returned, login is successful
        echo "Data Successful <br>";
        foreach($rows as $row)
        {
            var_dump($row);
            echo "<br>";
        }
       
    } else {
        // No rows were returned, login is invalid
        echo "Data Retrieval Not Successful";
    }

    // Close the database connection
    $conn = null;
    
    
?>