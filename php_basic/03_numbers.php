<?php

$a = 5;
$b = 4;
$c = 1.2;

$a += $b;
echo $a.'<br>';

echo $a++.'<br>';
echo $a.'<br>';
echo ++$a.'<br>';

echo $a--.'<br>';
echo --$a.'<br>';

$strNumber = '12.34';

$number = (int)$strNumber;

var_dump($number);
echo '<br>';

echo floor(2.6).'<br>';

$num = 123456789.12345;

echo number_format($num, 2, '.', ' ');




