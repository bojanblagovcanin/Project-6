<?php
session_start();

require '../html/assn2.html';          // Insert to database form 

// Get data from database
// Connect to $db
$db = new PDO(
    'mysql:host=localhost;dbname=elevator',     // Database name
    'root',                                 // username
    ''                                // Password
);
$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

$submitted = !empty($_POST);                    // You may want to prevent form resubmission           
if($submitted) {
    if (isset($_POST['insert'])) {
    
    $query = 'INSERT INTO elevatorNetwork (date, time, status, currentFloor, requestedFloor, otherInfo) 
             VALUES(:date, :time, :status, :currentFloor, :requestedFloor, :otherInfo)';
    } elseif (isset($_POST['delete'])) {
        $query = 'DELETE FROM elevatorNetwork WHERE status = :status AND currentFloor = :currentFloor AND requestedFloor = :requestedFloor AND otherInfo = :otherInfo';
    } elseif (isset($_POST['update'])) {
        $query = 'UPDATE elevatorNetwork SET status = :status WHERE currentFloor = :currentFloor AND requestedFloor = :requestedFloor AND otherInfo = :otherInfo';
    }

    $statement = $db->prepare($query); 
    $curr_date_query = $db->query('SELECT CURRENT_DATE()'); 
    $curr_date = $curr_date_query->fetch(PDO::FETCH_ASSOC); 
    $curr_date_time = $db->query('SELECT CURRENT_TIME()'); 
    $curr_time = $curr_date_time->fetch(PDO::FETCH_ASSOC); 
    $status = $_POST['status'];
    $currentFloor = $_POST['currentFloor'];
    $requestedFloor = $_POST['requestedFloor'];
    $otherInfo = $_POST['otherInfo'];

    $params = [
        'date' => $curr_date['CURRENT_DATE()'],
        'time' => $curr_time['CURRENT_TIME()'], 
        'status' => $status,
        'currentFloor' => $currentFloor,
        'requestedFloor' => $requestedFloor, 
        'otherInfo' => $otherInfo
    ];
    $result = $statement->execute($params);
}

echo "<h3>Entire content of the elevatorNetwork table</h3>";
$query2 = 'SELECT * FROM elevatorNetwork GROUP BY nodeID ORDER BY nodeID'; 
$rows = $db->query($query2); 
echo "DATE  |   TIME    |   NODEID  |   STATUS  |   CURRENTFLOOR    |   REQUESTED FLOOR     |   OTHERINFO <br/>";
foreach ($rows as $row) { 
    echo $row['date'] . " | " . $row['time'] . " | " . $row['nodeID'] . " | " . $row['status'] . " | " . $row['currentFloor'] 
                      . " | " . $row['requestedFloor'] . " | " . $row['otherInfo'];
    echo '<br/>';
}       
?>