## Insert

#### Switch Expressions 

**From**
```
  ...

  private static string GetStringFormat(Color c)
  {

    switch (c)
    {
      case Color.Blue:
        return "Blue";
      case Color.Green:
        return "Green";
      case Color.Red:
        return "Red";
      default:
        throw new InvalidOperationException("Unknown Enumeration");
    }
  }
```

**To**

```
class Program
{
  enum Color
  {
    Red,
    Green,
    Blue
  }

  static void Main(String[] args)
  {
    var result = GetStringFormat(Color.Red);
    WriteLine(result);
  }

  private static string GetStringFormat(Color c)
  {
    return c switch
    {
      Color.Red => "Red",
      Color.Blue => "Blue",
      Color.Green => "Green",
      _ => throw new InvalidOperationException("Unknown enumeration")
    };
  }
}
```

**Including Tuple Pattern**

```
class Program
{
  enum Color
  {
    Red,
    Green,
    Blue
  }

  enum Brightness
  {
    Bright,
    NotSoBright
  }

  static void Main(String[] args)
  {
    var result = GetStringFormat(Color.Red, Brightness.Bright);
    WriteLine(result);
  }

  private static string GetStringFormat(Color c, Brightness b)
  {
    return (c, b) switch
    {
      (Color.Red, Brightness.Bright) => "Bright Red",
      (Color.Blue, Brightness.NotSoBright) => "Not so bright Blue",
      //...
      _ => throw new InvalidOperationException("Unknown enumeration")
    };
  }
}
```

## Try Catch

```
WriteLine("Before parsing:");
Write("What is your age?");

string? input = ReadLine();

try
{
  int age = int.Parse(input);
  WriteLine($"You are {age} years old");
}
catch (FormatException)
{
  WriteLine("Input format incorrect");
}
catch (Exception ex)
{
  WriteLine($"{ex.GetType()} says {ex.Message}");
};

WriteLine("After parsing");
```

#### Try Catch With Filters

