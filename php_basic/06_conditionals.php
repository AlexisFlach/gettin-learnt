<?php

$age = 0;
$salary = 300000;

if($age == 20) echo "1".'<br>';

echo $age < 22 ? 'yes' : 'no';

$myAge = $age ?: '18';
echo '<br>';
echo $myAge;
echo '<br>';
// null coalescing operator

$myName = isset($name) ? $name : 'John';

$myName = $name ?? 'John';

// Switch

$userRole = 'userss';

switch ($userRole) {
    case 'admin':
        echo 'admin';
        break;
    case 'user':
        echo 'user';
        break;
    default:
        echo 'Invalid role';
}