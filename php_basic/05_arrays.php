<?php

$fruits = ["Banana", "Apple", "Orange"];

echo $fruits[0].'<br>';

$fruits[0] = "Peach";

echo isset($fruits[0]);

$fruits[] = "Banana";

echo count($fruits).'<br>';

array_push($fruits, "foo");

array_pop($fruits);


array_unshift($fruits, "bar");

# array_shift($fruits);
echo '<pre>';
var_dump($fruits);
echo '</pre>';

$string = "Banana,Apple,Peach";

echo '<pre>';
var_dump(explode(",", $string));
echo '</pre>';

// implode("&", $fruits);

echo in_array("Apple", $fruits).'<br>';

echo array_search("Apple", $fruits);

$arr1 = [1,2,3];
$arr2 = [4,5,6];

$combinedArrays = array_merge($arr1, $arr2);
$combinedArrays2 = [...$arr1, ...$arr2];
echo '<pre>';
var_dump($combinedArrays2);
echo '</pre>';

$person = [
    'name' => 'Alex',
    'hobbies' => ['Tennis', 'Chess']
];



echo $person[name];

// if(!isset($person['address'])) {
//    $person['address'] = 'Unknown';
// }

$person['address'] ??= 'Unknown';

echo '<pre>';
print_r($person);
echo '</pre>';

echo '<pre>';
var_dump(array_keys($person));
echo '</pre>';

echo '<pre>';
var_dump(array_values($person));
echo '</pre>';

ksort($person);
asort($person);

$todos = [
    ['title' => "Todo 1", "Completed" => true],
    ['title' => "Todo 2", "Completed" => true],
];

echo '<pre>';
var_dump($todos);
echo '</pre>';




















