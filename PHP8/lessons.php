<?php

class RegistrationManager {
    public function register(Lesson $lesson) {
        $notifier = Notifier::getNotifier();
        $notifier->inform("New lesson added! Cost: {$lesson->cost()}");
    }
}

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

class MailNotifier extends Notifier {
    public function inform($message): void
    {
        print "Mail Notification! {$message}\n";
    }
}

class TextNotifier extends Notifier {
    public function inform($message): void
    {
        print "Text Notification! {$message}\n";
    }
}

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

abstract class CostStrategy
{
    abstract public function cost(Lesson $lesson): int;
    abstract public function chargeType(): string;
}

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

class Lecture extends Lesson
{
    // Lecture-specific implementations ...
}

class Seminar extends Lesson
{
    // Lecture-specific implementations ...
}
$lessons1 = new Seminar(4, new TimedCostStrategy());
$lessons2 = new Lecture(4, new FixedCostStrategy());
$mgr = new  RegistrationManager();
$mgr->register($lessons1);
$mgr->register($lessons2);
