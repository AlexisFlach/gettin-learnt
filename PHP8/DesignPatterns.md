#### Design Patterns

*Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice.*

###### The Gang of Four Format

- *Intent*: A brief statement of the pattern’s purpose. You should be able to see the point of the pattern at a glance.
- *Motivation*: The problem described, often in terms of a typical situation. The anecdotal approach can help make the pattern easy to grasp.
- *Applicability*: An examination of the different situations in which you might apply the pattern. While the motivation describes a typical problem, this section defines specific situations and weighs the merits of the solution in the context of each.
- *Structure/interaction*: These sections may contain UML class and interaction diagrams describing the relationships among classes and objects in the solution.
- *Implementation*: This section looks at the details of the solution. It examines any issues that may come up when applying the technique and provides tips for deployment.
- *Sample code*: I always skip ahead to this section. I find that a simple code example often provides a way into a pattern. The example is often chopped down to the basics in order to lay the solution bare. It could be in any object-oriented language. Of course, in this book, it will always be PHP.
- *Known uses*: These describe real systems in which the pattern (problem, context, and solution) occurs. Some people say that for a pattern to be genuine, it must be found in at least three publicly available contexts. This is sometimes called the “rule of three.”
- *Related patterns*: Some patterns imply others. In applying one solution, you can create the context in which another becomes useful. This section examines these synergies. It may also discuss patterns that have similarities to the problem or the solution, as well as any antecedents (i.e., patterns defined elsewhere on which the current pattern builds).

#### Pattern principles

- *Composition*: How to use object aggregation to achieve greater flexibility than you could with inheritance alone
- *Decoupling*: How to reduce dependency between elements in a system
- *The power of the interface*: Patterns and polymorphism
- *Pattern categories*: The types of patterns that this book will cover

###### Composition and inheritance

Strategy Pattern with Lesson example.



```
abstract class CostStrategy
{
    abstract public function cost(Lesson $lesson): int;
    abstract public function chargeType(): string;
}
```

**Lesson** object kommer senare endast att arbeta med CostStrategy type, ingen speciell implementation av den.

Därefter implementerar vi två **concrete subclasses** till CostStrategy.

```
class FixedCostStrategy extends CostStrategy
{
    public function cost(Lesson $lesson): int
    {
        return 30;
    }
    public function chargeType(): string
    {
        return "fixed rate";
    }
}
```

```
class TimedCostStrategy extends CostStrategy
{
    public function cost(Lesson $lesson): int
    {
        return ($lesson->getDuration() * 5);
    }
    public function chargeType(): string
    {
        return "hourly rate";
    }
}	
```

```
abstract class Lesson
{
    public function __construct(private int $duration, private CostStrategy $costStrategy)
    {
    }
    public function cost(): int
    {
        return $this->costStrategy->cost($this);
    }
    public function chargeType(): string
    {
        return $this->costStrategy->chargeType();
    }
    public function getDuration(): int
    {
        return $this->duration;
    }
    // more lesson methods...
}
```

```
class Lecture extends Lesson
{
    // Lecture-specific implementations ...
}	
```

```
$lessons[] = new Seminar(4, new TimedCostStrategy());
$lessons[] = new Lecture(4, new FixedCostStrategy());
foreach ($lessons as $lesson) {
    print "lesson charge {$lesson->cost()}. ";
    print "Charge type: {$lesson->chargeType()}\n";
}
```

**Compositition** kan alltså göra ens kod mer flexibel därför att objekt kan bli kombinerade till att utföra uppgifter dynamiskt. 

#### Decoupling

**Reusability** är ett stor mål med OOP, och **tight coupling** är dess **fiende**. Vi kan identifiera tight coupling när vi ser att en komponent i ett system behöver ändra på flera saker utanför sig själv, i systemet.

Vi ska sikta på att skapa **independent components** så att vi kan ändra på dessa, och enbart dessa.

Coupling of another sort can occur when many classes in a system are embedded explicitly into a platform or environment. Let’s say that you are building a system that works with a MySQL database, for example. You might use methods such as mysqli::query() to speak to the database server.

Should you be required to deploy the system on a server that does not support MySQL, you *could* convert your entire project to use SQLite. You would be forced to make changes throughout your code, though, and face the prospect of maintaining two parallel versions of your application.

```
class RegistrationManager {
    public function register(Lesson $lesson) {
        $notifier = Notifier::getNotifier();
        $notifier->inform("New lesson added! Cost: {$lesson->cost()}");
    }
}
```

```
abstract class Notifier {
    public static function getNotifier(): Notifier {
        if(rand(1,2) === 1) {
            return new MailNotifier();
        } else {
            return new TextNotifier();
        }
    }
    public abstract function inform($message): void;
}
```

```
class MailNotifier extends Notifier {
    public function inform($message): void
    {
        print "Mail Notification! {$message}\n";
    }
}
```

```
class TextNotifier extends Notifier {
    public function inform($message): void
    {
        print "Text Notification! {$message}\n";
    }
}
```

#### Code to an Interface, Not to an Implementation

Vi kan *gömma* olika implementationer bakom **common interfaces** definerade i en **superclass**.

Client code kan därefter hämta ett objekt av superclassen 

Hur börjar man med att designa?

1. Encapsulate the concept that varies!

The Gang of Four recommends that you actively seek varying elements in your classes and assess their suitability for encapsulation in a new type. Each alternative in a suspect conditional may be extracted to form a class that extends a common abstract parent. This new type can then be used by the class or classes from which it was extracted. This has the following effects:

- Focusing responsibility
- Promoting flexibility through composition
- Making inheritance hierarchies more compact and focused
- Reducing duplication

So how do you spot variation? One sign is the misuse of inheritance. This might include inheritance deployed according to multiple forces at one time (e.g., lecture/seminar and fixed/timed cost). It might also include subclassing on an algorithm where the algorithm is incidental to the core responsibility of the type. The other sign of variation suitable for encapsulation is, as you have seen, a conditional expression.























