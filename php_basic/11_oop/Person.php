<?php

class Person {
    public string $name;

    private ?int $age;

    public static int $counter = 0;

    public function __construct($name) {
        $this->name = $name;
        self::$counter++;
    }

    public function setName($name): void
    {
        $this->name = $name;
    }

    public function getAge()
    {
        return $this->age;
    }

    public static function getCounter() {
        return self::$counter;
}
}

