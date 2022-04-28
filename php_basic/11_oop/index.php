<?php

require_once 'Person.php';
require_once 'Student.php';

$person = new Person("Alex");
$person2 = new Person('King');

$student = new Student("Brad", 1);

echo '<pre>';
var_dump($person);
echo '</pre>';
echo '<pre>';
var_dump($student);
echo '</pre>';
echo Person::getCounter();