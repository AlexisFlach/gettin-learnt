<?php


class Preferences {
    private array $props = [];
    public static Preferences $instance;

    private function __construct() {
    }
    public static function getInstance(): Preferences {
        if(empty(self::$instance)) {
            self::$instance = new Preferences();
        }
        return self::$instance;
    }
    public function setProperties(string $key, string $val):void {
        $this->props[$key] = $val;
    }
    public function getProperties($key):void {
        print $this->props[$key];
    }
}

$pref1 = Preferences::getInstance();
$pref1->setProperties("name", "alex");
$pref1->getProperties("name");
unset($pref1);
$pref2 = Preferences::getInstance();
$pref2->getProperties();