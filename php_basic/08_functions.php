<?php

function hello() {
    echo "Hello World";
}

hello();

function msg($name) {
    echo 'Hello ' .' '.  $name.'<br>';
}

msg("Alex");

function sum($a, $b) {
    return $a + $b;
}

echo sum(4, 5);

function manyArgs(...$nums) {
    $sum = 0;
    foreach ($nums as $n) {
        $sum += $n;
    }
    return $sum;
}

echo manyArgs(1,2,3,4);

function manyArgs2(...$nums) {
   return array_reduce($nums, fn($carry, $n) => $carry + $n);
}

echo manyArgs2(1,2,3);
