<?php
header('Content-Type: application/json');
    // Connect to the database 
    //echo "Connecting to Database: <br>";
    $conn = new PDO('mysql:host=localhost;dbname=floor_log', 'admin123', 'password');
    //echo "Connected <br>";

    //echo "Finding data: <br>";
    $rows = $conn->query('SELECT * FROM floor_log ORDER BY nodeID');
    //echo "Connected <br>";

    if ($rows->rowCount() > 0) {
        // Rows were returned, login is successful
        //echo "Data Successful <br>";
        $i = 0;
        foreach($rows as $row)
        {
            //var_dump($row);
            //echo $row['id'] . "|" . $row['nodeID'] . "|" . $row['floor'] . "|" . $row['weekday'] . "|" . $row['hour'];
            $week[$i] = $row['weekday'];
            $floor[$i] = $row['floor'];
            $hour[$i] = $row['hour'];
            $i++;
            
            //echo "<br>";    
        }
        
        //echo "End of Line. <br>";
        
        $fullData = array(
            'week' => $week,
            'floor' => $floor,
            'hour' => $hour
        );
        //header('Content-Type: application/json');
        echo json_encode($fullData);
        
        //echo json_encode($week);
       
    } else {
        // No rows were returned, login is invalid
        echo "Data Retrieval Not Successful";
    }

    // Close the database connection
    $conn = null;
    

?>