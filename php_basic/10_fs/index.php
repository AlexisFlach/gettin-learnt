<?php

// Magic constants -> Changes its value based on execution context

echo __DIR__.'<br>';
echo __FILE__.'<br>';
echo __LINE__.'<br>';

# mkdir('test');

# rename('test', 'test2');

rmdir('test2');

$text = file_get_contents('lorem.txt');
echo $text;

$files = scandir('../');
echo '<pre>';
var_dump($files);
echo '</pre>';

file_put_contents('sample.txt', 'Some Content');

$users = file_get_contents('https://jsonplaceholder.typicode.com/users');
# echo $users;
$users = json_decode($users, true);

echo '<pre>';
var_dump($users);
echo '</pre>';