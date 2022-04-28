<?php
$name = "Alex";
$string = 'Hello World';
$string2 = "Hello World";

echo $string.'<br>';

$string = 'Hello '.$name.'. How are you?';
$string2 = "Hello I am $name. I am good";

echo $string.'<br>';
echo $string2.'<br>';


echo 'Hello  '.' World'.' '.'<br>';

echo strlen($string).'<br>';
echo strtolower($string2).'<br>';
$string2 = str_replace("Alex", "Berit", $string2);
echo strtoupper($string2).'<br>';

$poem = "
This is
a 
pome
";

echo $poem;
echo nl2br($poem);

$poem2 = "
This is
<b>a</b> 
pome
";

echo nl2br(htmlentities($poem2));

