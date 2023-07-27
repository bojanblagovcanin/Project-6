<?php
require "../html/test.html";
echo "Before Requires <br>";

require_once __DIR__ . '/elevatorDoor.php';
require_once __DIR__ . '/elevatorCar.php';
require_once __DIR__ . '/node.php';
require_once __DIR__ . '/elevatorPanel.php';

echo "after requires";

$car = new elevatorCar(2,1);
//$car = new Elevator(3);
echo "Test<br>";
//echo "Elevator 1 has ID: " . $car->getId() . "<br>";

echo "Elevator 1 has ID: " . $car->getID() . "<br>";
echo "Elevator Floor: " . $car->currentFloor() . "<br>";
echo "Elevator Door: " . $car->doorStatus() . "<br>";

?>