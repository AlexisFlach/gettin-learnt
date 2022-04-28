<?php

$counter = 0;
// while($counter < 10) {
//    echo $counter.'<br>';
//    $counter++;

do {
    echo $counter.'<br>';
    $counter++;
} while ($counter < 10);

for ($i = 0; $i < 10; $i++) {
    echo $i.'<br>';
}

$fruits = ["Banana", "Apple", "Orange"];

foreach ($fruits as $fruit) {
      echo $fruit.'<br>';
}

foreach ($fruits as $i => $fruit) {
        echo $i .': '. $fruit.'<br>';
}

$person = [
    'name' => 'Alex',
    'hobbies' => ['Tennis', 'Chess']
];

foreach ($person as $key => $value) {
      if(is_array($value)) {
        echo $key .' '. implode(", ", $value).'<br>';
      }
      else {
        echo $key .' '. $value.'<br>';
      }

}














