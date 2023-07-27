<?php
require_once __DIR__ . '/node.php';
require_once __DIR__ . '/elevatorDoor.php';
    class elevatorCar extends elevatorDoor
    {
        //Set default floor to floor 1
        private $elevatorFloor;
        

        public function __construct ($defaultFloor, $defaultStatus)
        {
            $this->elevatorFloor = $defaultFloor;
            parent::__construct($defaultStatus);
        }

        public function changeFloor($floor)
        {
            $this->elevatorFloor = $floor;
        }

        public function currentFloor() : int
        {
            return $this->elevatorFloor;
        }
    }
?>