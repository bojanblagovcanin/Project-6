<?php
    //Door status - zero equals closed, one equals open
    require_once __DIR__ . '/node.php';
class elevatorDoor extends node
{

    private $doorStatus;

    public function __construct ($defaultStatus)
    {
            $this->doorStatus = $defaultStatus;
            parent::__construct();
    }

    public function openDoor()
    {
        $this->doorStatus = 1;
    }

    public function closeDoor()
    {
        $this->doorStatus = 0;
    }

    public function doorStatus() : int
    {
        return $this->doorStatus;
    }
}
?>