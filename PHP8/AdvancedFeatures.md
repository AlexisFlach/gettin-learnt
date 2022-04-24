#### Advanced Features

Classes are templates from which objects are produced and objects as active instances of classes—the things whose methods you invoke and whose properties you access. I implied that, in object-oriented programming, the real work is done by instances of classes. Classes, after all, are merely templates for objects.

```
class StaticExample {
    public int $age = 33;

    public static function sayHello(): void {
        print "Hello";
    }
}

StaticExample::sayHello();
```

Static methods are functions with class scope. They cannot themselves access any normal properties in the class because these would belong to an object; however, they can access static properties. If you change a static property, all instances of that class are able to access the new value.

```
class StaticExample {
    public static int $age = 33;

    public static function printAge() : void {
        self::$age++;
        print self::$age;
    }
}

StaticExample::sayHello();
```

Unless you are accessing an overridden method, you should only ever use > :: to access a method or > property that has been explicitly declared static.

###### Constant Properties

```
class ShopProduct {
    public const AVAILABLE = 0;
    public const OUT_OF_STOCK = 1;
}

print ShopProduct::AVAILABLE;
```

###### Abstract Classes

An abstract class cannot be instantiated. Instead, it defines (and, optionally, partially implements) the interface for any class that might extend it.

```
abstract class ShopProductWriter
{
    protected array $products = [];
    public function addProduct(ShopProduct $shopProduct): void
    {
        $this->products[] = $shopProduct;
    }
}
```

In most cases, an abstract class will contain at least one abstract method. These are declared, once again, with the abstract keyword. An abstract method cannot have an implementation. You declare it in the normal way but end the declaration with a semicolon rather than a method body.

```
abstract class ShopProductWriter
{
    protected array $products = [];
    public function addProduct(ShopProduct $shopProduct): void
    {
        $this->products[] = $shopProduct;
    }
    abstract public function write(): void;
}
```

###### Interfaces

Interfaces are pure templates.

```
class ShopProduct implements Chargeable
{
    protected float $price;

    public function setPrice(float $price): void
    {
        $this->price = $price;
    }
    public function getPrice(): float
    {
        return $this->price;
    }
}

$shopProduct = new ShopProduct();
$shopProduct->setPrice(100);
echo $shopProduct->getPrice();
```

###### Traits

As we have seen, interfaces help you manage the fact that, like Java, PHP does not support multiple inheritance. In other words, a class in PHP can only extend a single parent. However, you can make a class promise to implement as many interfaces as you like; for each interface it implements, the class takes on the corresponding type.

So interfaces provide types without implementation. But what if you want to share an implementation across inheritance hierarchies? PHP 5.4 introduced traits, and these let you do just that.

A trait is a class-like structure that cannot itself be instantiated but can be incorporated into classes. Any methods defined in a trait become available as part of any class that uses it. A trait changes the structure of a class, but doesn’t change its type. Think of traits as includes for classes.

```
trait PriceUtilities
{
    private $taxrate = 20;
    public function calculateTax(float $price): float
    {
        return (($this->taxrate / 100) * $price);
    }
}
```

```
class ShopProduct {
    use PriceUtilities;
}
```

###### Använda flera traits samtidigt 

```
trait IdentityTrait
{
    public function generateId(): string
    {
        return uniqid();
    }
}
```

```
class ShopProduct {
    use PriceUtilities;
    use IdentityTrait;
}
```

###### Combining Traits and Interfaces

```
interface IdentityObject {
    public function generateId(): string;
}
```

```
class ShopProduct implements IdentityObject {
    public function __construct(public string $title) {

    }
    public function generateId(): string
    {
        return uniqid();
    }
}
```

```
class WareHouse {

    public static array $items = [];
    public static function storeIdentityObject(IdentityObject $idobj): void
    {
        self::$items[] = $idobj;
    }

    public static function getItems() {
        foreach (self::$items as $item) {
            echo $item->title . " ";
        }
    }
}
```

```
$cocacola = new ShopProduct("Coca Cola");
$fanta = new ShopProduct("Fanta");
$cocacola->generateId();
WareHouse::storeIdentityObject($cocacola);
WareHouse::storeIdentityObject($fanta);
WareHouse::getItems();
```

###### Managing Method Name Conflicts with insteadof

```
class UtilityService extends Service
{
    use PriceUtilities;
    use TaxTools {
        TaxTools::calculateTax insteadof PriceUtilities;
    }
}
```

