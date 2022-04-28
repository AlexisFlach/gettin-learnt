<?php

require_once 'Person.php';

class Student extends Person {
    public int $studentId;

    public function __construct($name, $studentId)
    {
        $this->studentId = $studentId;
        parent::__construct($name);
    }
}