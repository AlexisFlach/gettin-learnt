using static System.Console;

static void TimesTable(byte number)
{
  WriteLine($"This is the {number} times table:");

  for (int row = 1; row <= 10; row++)
  {
    WriteLine($"{row} x {number} = {row * number}");
  }
  WriteLine();
}

TimesTable(10);