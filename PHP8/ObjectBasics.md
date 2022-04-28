# PHP8-course

###### constructor property promotion

**From**

```php
class ShopProduct {
    private $title;

    public function __construct($title) {
        $this->title = $title;
    }

    public function getTitle()
    {
        return $this->title;
    }
};
```

**To**

```php
class ShopProduct {

    public function __construct(private $title) {
       
    }

    public function getTitle()
    {
        return $this->title;
    }
};

```

###### **Default Arguments and Named Arguments**

```
class ShopProduct
{
    public function __construct(
        public $title,
        public $producerFirstName = "",
        public $producerMainName = "",
        public $price = 0
    ) {
    }
}

# $product1 = new ShopProduct("Shop Catalogue");

$product1 = new ShopProduct(
    title: "My Title",price: 0.21
);

var_dump($product1);
```

###### Arguments and Types

**Primitive Types**

PHP is a loosely typed language. This means that there is no necessity for a variable to be declared to hold a particular data type.

| Type-Checking Function | Type     | Description                                                  |
| :--------------------- | :------- | :----------------------------------------------------------- |
| is_bool()              | Boolean  | One of the two special values true or false                  |
| is_integer()           | Integer  | A whole number. Alias of is_int() and is_long()              |
| is_float()             | Float    | A floating-point number (a number with a decimal point). Alias of is_double() |
| is_string()            | String   | Character data                                               |
| is_object()            | Object   | An object                                                    |
| is_resource()          | Resource | A handle for identifying and working with external resources such as databases or files |
| is_array()             | Array    | An array                                                     |
| is_null()              | Null     | An unassigned value                                          |

###### Some Other Type-Checking Functions

| Function       | Description                                                  |
| :------------- | :----------------------------------------------------------- |
| is_countable() | An array or an object that can be passed to the count() function |
| is_iterable()  | A traversable data structure—that is, one that can be looped through using foreach |
| is_callable()  | Code that can be invoked—often an anonymous function or a function name |
| is_numeric()   | Either an int, a long, or a string which can be resolved to a number |

###### Type Declarations: Object Types

```php
class ShopProduct {
    public function __construct(public $producer, public $title, public $price)
    {
    }
    public function getProducer()
    {
        return $this->producer;
    }
}

class ShopProductWriter {
    public function write(ShopProduct $shopProduct) {
        $str = $shopProduct->title . ": "
        . $shopProduct->getProducer()
        . " (" . $shopProduct->price . ") \n";
        print $str;
    }
}

$product1 = new ShopProduct("My Antonia", "Willa", "Cather", 5.99);
$writer = new ShopProductWriter();
$writer->write($product1);
```

###### Type Declarations: Primitive Types

```
class ShopProduct
{
public function __construct(
public string $title,
float $price = 0
) {
}
}

$shop = new ShopProduct(title:"My Title");
echo $shop->title;
```

| Type Declaration | Since | Description                                                  |
| :--------------- | :---- | :----------------------------------------------------------- |
| array            | 5.1   | An array. Can default to null or an array                    |
| int              | 7.0   | An integer. Can default to null or an integer                |
| float            | 7.0   | A floating-point number (a number with a decimal point). An integer will be accepted—even with strict mode enabled. Can default to null, a float, or an integer |
| callable         | 5.4   | Callable code (such as an anonymous function). Can default to null |
| bool             | 7.0   | A Boolean. Can default to null or a Boolean                  |
| string           | 5.0   | Character data. Can default to null or a string              |
| self             | 5.0   | A reference to the containing class                          |
| [a class type]   | 5.0   | The type of a class or interface. Can default to null        |
| iterable         | 7.1   | Can be traversed with foreach (not necessarily an array—could implement Traversable) |
| object           | 7.2   | An object                                                    |
| mixed            | 8.0   | Explicit notification that the value can be of any type      |

###### Union Types

```
class Storage
{
    public function add(string $key, string|bool $value)
    {
        // do something with $key and $value
    }
}
```

```
public function setShopProduct(ShopProduct|null $product)
{
    // do something with $product
}
```

```
public function setShopProduct2(ShopProduct|false $product)
	{
    // do something with $product
	}
}
```

###### Nullable types

```
class Storage
{
    public function add(string $key, ?string $value)
    {
        // do something with $key and $value
    }
}
```

###### Return Type Declarations

```
public function getPlayLength(): int
{
    return $this->playLength;
}
```

```
function play(): int {
    return 1;
}

echo play();
```

```
public function setDiscount(int|float $num): void
{
    $this->discount = $num;
}
```

###### Inheritance

```php
class ShopProduct
{
public $title;
public $producerMainName;
public $producerFirstName;
public $price;
public function __construct(
$title,
$firstName,
$mainName,
$price
) {
$this->title             = $title;
$this->producerFirstName = $firstName;
$this->producerMainName  = $mainName;
$this->price             = $price;
}
public function getProducer(): string
{
return $this->producerFirstName . " "
. $this->producerMainName;
}
public function getSummaryLine(): string
{
$base  = "{$this->title} ( {$this->producerMainName}, ";
$base .= "{$this->producerFirstName} )"; return $base;
}
}
```

```php
class BookProduct extends ShopProduct
{
    public $numPages;
    public function __construct(
        string $title,
        string $firstName,
        string $mainName,
        float $price,
        int $numPages
    ) {
        parent:: __construct(
            $title,
            $firstName,
            $mainName,
            $price
        );
        $this->numPages = $numPages;
    }
    public function getNumberOfPages(): int
    {
        return $this->numPages;
    }
    public function getSummaryLine(): string
    {
        $base  = "{$this->title} ( $this->producerMainName, ";
        $base .= "$this->producerFirstName )";
        $base .= ": page count - {$this->numPages}";
        return $base;
    }
}
```

```php
$book1 = new BookProduct("Jack", "Ulf", "Lundell", 199, 400);

echo $book1->getSummaryLine();
```

###### Invoking an Overridden Method

```
 public function getSummaryLine(): string
    {
        $base  = parent::getSummaryLine();
        $base .= ": page count - $this->numPages";
        return $base;
    }
```

###### Public, Private, and Protected: Managing Access to Your Classes

- Public properties and methods can be accessed from any context.
- A private method or property can only be accessed from within the enclosing class. Even subclasses have no access.
- A protected method or property can only be accessed from within either the enclosing class or from a subclass. No external code is granted access.
