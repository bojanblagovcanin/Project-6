<?php
    class node 
    {
        private $idNum;
        private static $lastID = 100;

        public function __construct ()
        {
            $this->idNum = ++self::$lastID;
        }

        public function getID() : int
        {
            return self::$lastID;
        }
    }

?>