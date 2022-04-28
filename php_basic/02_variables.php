<?php

$name = "Alex";
$age = 33;
$isMale = true;
$height = 1.85;
$salary = null;

echo $name.'<br>';
echo $age.'<br>';

echo $isMale.'<br>';

echo gettype($name).'<br>';

var_dump($name);
echo '<br>';
var_dump($age);
echo '<br>';

echo is_string($name);
echo is_int($age);
is_bool($isMale);

isset($name);
echo '<br>';

const PI = 3.14;
// or define('PI', 3.14);
echo PI.'<br>';

echo PHP_INT_MAX;














