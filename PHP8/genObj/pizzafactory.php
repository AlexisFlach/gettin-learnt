<?php

abstract class PizzaStore {

    public function orderPizza(): Pizza {
        $pizza = $this->createPizza();
        $pizza->prepare();
        print '<pre>';
        return $pizza;
    }

    abstract public function createPizza(): Pizza;
}


class NyPizzaStore extends PizzaStore {
    public function createPizza(): Pizza
    {
            return new NewYorkStylePizza();

    }
}
abstract class Pizza {
    public string $name;

    public function prepare():void {
        print "Preparing";
    }

     public function getName(): string
     {
         return $this->name;
     }
}

class NewYorkStylePizza extends Pizza {
    public function __construct() {
        $this->name = "New York Pizza";
    }
}

$nyPizzaStore = new NYPizzaStore();
$mypizza = $nyPizzaStore->orderPizza();
print $mypizza->getName();





























