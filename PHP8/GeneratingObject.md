#### Generating Objects

- *The Singleton pattern*: A special class that generates one—and only one—object instance
- *The Factory Method pattern*: Building an inheritance hierarchy of creator classes
- *The Abstract Factory pattern*: Grouping the creation of functionally related products
- *The Prototype pattern*: Using clone to generate objects
- *The Service Locator pattern*: Asking your system for objects
- *The Dependency Injection pattern*: Letting your system give you objects

## Problems and Solutions in Generating Objects

```
abstract class Employee {
    public function __construct(protected string $name) {

    }
    abstract public function fire():void;
}
```

```
class Minion extends Employee {
    public function fire(): void {
        print "{$this->name}: I will clear my desk";
    }
}
```

```
class NastyBoss {
    private array $employees = [];

    public function addEmployee(string $employeeName): void {
        $this->employees[] = new Minion($employeeName);
    }
    public function projectFails(): void {
        if(count($this->employees) > 0) {
            $emp = array_pop($this->employees);
            $emp->fire();
        }
    }
}
```

```
$boss = new NastyBoss();
$boss->addEmployee("harry");
$boss->addEmployee("bob");
$boss->addEmployee("mary");
$boss->projectFails();
```

NastyBoss kan lägg till en Minion, men det är fortfarande väldigt **tight coupled**.

Ett steg i rätt riktning vore att använda oss av **Employee Type**.

```
class NastyBoss {
    private array $employees = [];

    public function addEmployee(Employee $employeee): void {
        $this->employees[] = $employeee;
    }
    public function projectFails(): void {
        if(count($this->employees) > 0) {
            $emp = array_pop($this->employees);
            $emp->fire();
        }
    }
}
```

```
$boss = new NastyBoss();
$boss->addEmployee(new Minion("harry"));
$boss->projectFails();
```

Vi behöver nu hitta en strategi för att skapa objekt. Detta kapitel handlar om classer och objekt som arbetar med konkreta klasser, så att resten av våra klasser inte behöver det.

**Delegate object instantiation**

#### The Singleton Pattern

When you need to ensure you only have one instance of a class running around your application, turn to The Singleton!

**Singleton:** Ensure a class only has one instance and provide a global point of access to it.

```
class Preferences
{
    private array $props = [];
    private static Preferences $instance;
    private function __construct()
    {
    }
    public static function getInstance(): Preferences
    {
        if (empty(self::$instance)) {
            self::$instance = new Preferences();
        }
        return self::$instance;
    }
    public function setProperty(string $key, string $val): void
    {
        $this->props[$key] = $val;
    }
    public function getProperty(string $key): string
    {
        return $this->props[$key];
    }
}
```



$instance är private och static så den är ej tillgänglig utanför sin klass. 

**unset()** destroys the specified variables.

En statisk metod kan inte accessa object properties därför att den är, per definition, invokerad i en klass och inte i objekt kontext.

När vi kallar på getInstance() kollar vi först Preferences::$instance propertyn. Om den är empty, så skapar vi en instans Preferences och lagrar den i propertyn. Därefter returnerar vi instances till koden som kallar på den.

Tack vare att metoden är static så är den en del av Preferences-klassen.

#### Factory Pattern

**The Factory Method Pattern** defines an interface for creating an object, but lets subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.

Object-oriented design emphasizes the abstract class over the implementation. That is, it works with generalizations rather than specializations. The Factory Method pattern addresses the problem of how to create object instances when your code focuses on abstract types. The answer? Let specialist classes handle instantiation.

Factory Method splitts creator classes från produkterna de är designade till att generera.

Creator Class är en **Factory class** som definerar en metod  för att generera ett produkt-objekt.

```
abstract class PizzaStore {

    public function orderPizza(): Pizza {
        $pizza = $this->createPizza();
        $pizza->prepare();
        print '<pre>';
        return $pizza;
    }

    abstract public function createPizza(): Pizza;
}
```

```
class NyPizzaStore extends PizzaStore {
    public function createPizza(): Pizza
    {
            return new NewYorkStylePizza();

    }
}
```

```
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
```

```
class NewYorkStylePizza extends Pizza {
    public function __construct() {
        $this->name = "New York Pizza";
    }
}
```

```
$nyPizzaStore = new NYPizzaStore();
$mypizza = $nyPizzaStore->orderPizza();
print $mypizza->getName();
```

**PizzaStore** är vår abstrakta Creator Class. Den definerar en abstrakt factory method som låter subclasses implementera den.

###### Dependency Inversion Principle

Att reducera antalet dependencies i våra konkreta klasser är en bra sak. Det finns en OO Design Principle: Dependency Inversion Principle.

**Depend on abstractions. Do not depend upon concrete classes.**

At first, this principle sounds a lot like “Program to an interface, not an implementation,” right? It is similar; however, the Dependency Inversion Principle makes an even stronger statement about abstraction. It suggests that our high-level components should not depend on our low-level components; rather, they should *both* depend on abstractions.

#### Abstract Factory Pattern

Senare

#### Prototype



