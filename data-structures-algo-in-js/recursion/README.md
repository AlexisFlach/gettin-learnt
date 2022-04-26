# Rekursion

En subrutin (funktion i detta fall) som anropar sig själv, antingen direkt eller genom att anropa andra rutiner som till slut anropar den första igen.


### Var används Rekursion?
- JSON.parse / JSON.stringify är ofta skrivet rekursivt. Det är upp till *JavaScript Engines* att implementera dessa funktioner så de kan skrivas iterativt, men oftast används rekursiva funktioner
- document.getElementById och DOM traversal algoritmer
- Object traversal

### The Call Stack

Vad händer när funktioner blir anropade i JavaScript? Om en rekursiv funktion anropar sig själv om och om igen, vad händer egentligen? Detta är viktigt att förstå för att kunna skriva effektiv rekursion.

- I nästan alla programmeringsspråk finns där en inbyggd datastruktur som hanterar vad som ska ske när en funktion blir anropad. Det finns en ordning i hur de hanteras.

I JavaScript heter denna inbyggda datastruktur som hanterar funktionsanrop **The Call Stack**

The Call Stack är en **Stack Datastruktur**, en linjär ordnad följd av element, som följer "sist in, först ut" (LIFO). Precis som en trave med papper finns det två operationer man kan utföra: lifta av en (pop) och lägga på en (push).
CPU:n kommer åt endast den översta papperslappen.

Vid funktionsanrop lagras anropsparametrarna och lokala variabler i en stack-struktur, så att de sedan kan hämtas tillbaka i rätt ordning när funktionen återvänder.

För att hålla reda på var i minnet det översta elementet i stacken finns används en stackpekare. Stackpekaren är ett register i CPUn, som innehåller minnesadressen för den minnescell där det översta elementet i anropsstacken finns. Man säger att registret 'pekar' på det översta elementet.

- Varje gång en funktion blir anropar blir den placerad(pushed) på toppen av The Call Stack.

- När JavaScript ser *the return keyword* eller när funktioner avslutas, kommer *compilern* att ta bort funktionen från stacken(pop)

### Exempel Call Stack

```javascript
function takeShower() {
  return "Showering";
}

function eatBreakFast() {
  let meal = cookFood();
  return `eating ${meal}`;
}

function cookFood() {
  let items = ["Oatmeal", "Eggs", "Protein shake"];
  return items[Math.floor(Math.random() * items.length)];
}

function wakeUp() {
  takeShower();
  eatBreakFast();
  console.log("Ok ready to go to work");
}


wakeUp();
```

Vi är vana vid att funktioner blir pushed och poped till och ifrån stacken.
När vi skriver rekursiva funktioner, fortsätter vi att lägga till nya funktioner till stacken.


### Första exempel på en rekursiv funktion

Vi anropar samma funktion om och om igen tills att vi når vårt basfall.

###### Basfall (Base Case)

Villkoret för när rekursionen slutar.

Detta är det viktigaste konceptet att greppa.

Precis som en while-loop som måste uppge ett vilkor för när den ska sluta.

### Två essentiella delar för en rekursiv funktion

1. Base Case, villkor för när en funktion ska antinger returna något eller sluta.
2. Different Input, varje gång vi anropar vår funktion får inte input var detsamma som tidigare tillfälle.

### countDown

```javascript
function countDown(num) {
    if(num <= 0) return;
    num--;
    countDown();
}
```


### Martin and the dragon

```javascript
function head(array) {
  return array[0];
}

function tail(array) {
  return array.slice(1, array.length);
}

function isOdd(num) {
  return num % 2 !== 0;
}

function containsOddNumber(array) {
  // “Sorry boy, I'll only tell you if the first number in your list is odd.”

  if (array.length > 0 && isOdd(head(array))) {
    return true;
  }
  // base case
  // “That’s an empty list you moron!”
  if (array.length === 0) {
    return false;
  }

  // recursive case
  // “Ok, what about this one?”

  return containsOddNumber(tail(array));
}

```

### sumRange

En något mer avancerad rekursiv funktion är när man returna den rekursiva funktion istället för att "bara" anropa den.

```javascript
function sumRange(num) {
    if(num === 1) return 1;
    return num + sumRange(num - 1)
}
```

Kan vi se base case här? **if(num === 1) return 1;**
Different input? **sumRange(num - 1)**
Det är samma sak som i vår countDown-function:

```javascript
num--;
countDown();
```

Vad är vår rekursiva anrop? **return num + sumRange(num - 1)**

Vad hänt om vi inte returna där?

med return så väntar num på att se vad sumRange(num -1) blir.

```javascript
    return 3 + sumRange(2) // 3 väntar på sumRange(2);
    return 2 + sumRange(1) // väntar på sumRange(1)
    return 1;
        return 2 + 1; = 3
        return 3 + 3; = 6
```

### Factorial

Förmodligen den mest klassiska intro-funktionen till rekursion.

**4!**

4 x 3 x 2 x 1

##### Factorial iterativt

```javascript
function factorialIterative(num) {
  let total = 1;
  for (let i = num; i > 0; i--) {
    total *= i;
  }
  return total;
}
```

##### Factorial recursive

```javascript
function factorialRecursive(num) {
  if (num <= 1) return 1;
  return num * factorialRecursive(num - 1);
}
```

### Vanliga fallgropar gällande rekursion
- inget base case
- ingen return, eller return fel sak.
- stack overflow!

### Helper Method Recursion

Ett *design pattern* vanligt använt med rekursion är Helper Method Recursion.

Vanligt när vi exempelvis vill sammanställa en array eller en lista med data.

Säg att vi vill lagra alla ojämna tal i en array:

#### collectOddValues

```javascript
function collectOddValues(arr) {
  let result = [];

  function helper(helperInput) {
    if (helperInput.length === 0) {
      return;
    }
    if (helperInput[0] % 2 !== 0) {
      result.push(helperInput[0]);
    }
    helper(helperInput.slice(1));
  }
  helper(arr);
  return result;
}

```

Hade vi inte använt oss av en helper method så hade result blivit reset (= tom array) varje gång funktionen körs. Vi hade kunnat definiera result utanför vår funktionen, men vi vill inte ha massa variablar i vårt globala scope.

### Pure Recursion

```javascript
 function collectOddValues(arr) {
   let newArr = [];

   if (arr.length === 0) {
     return newArr;
   }

   if (arr[0] % 2 !== 0) {
     newArr.push(arr[0]);
   }

   newArr = newArr.concat(collectOddValues(arr.slice(1)));
   return newArr;
 }
 ```





Länkar: http://latentflip.com/loupe/


























