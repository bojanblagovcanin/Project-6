<?php
    class Elevator
    {
        private $idNumber;
        private $floorNumber;
        private static $lastId = 100;

        public function __construct(int $floor)
        {
            $this->idNumber = ++self::$lastId;
            $this->floorNumber = $floor;
        }
        public static function getLastId(): int 
        {
            return self::$lastId;
        }
        public function getId() : int
        {
            return $this->idNumber;
        }
        public function setFloor(int $floor) 
        {
            $this->floorNumber = $floor;
        }
    }


?>