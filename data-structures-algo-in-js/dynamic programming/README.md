# Dynamic Programming

En metod för att lösa ett komplext problem genom att bryta ned det till mindre delproblem, lösa dessa delproblem bara en gång, och lagra deras lösningar.

### 1. Overlapping Subproblems

Dynamic programming funkar **endast** om vi har...
- optimal substructure
- overlapping subproblems

Vad betyder då detta?


Ett problem har ett *overlapping subproblem* om det kan brytas ned till *subproblems* vilka är återanvändna flera gånger.

**Exempel: Fibonacci Sequence**

Alla nummer efter de första två är summan av de två föregående talen.

###### Overlapping Subproblems

1, 1, 2, 3, 5, 8, 13, 21....


##### !Overlapping Subproblems


                       
Detta involver subproblems. Vi tar och bryter ned problemet i mindre delar, men är det overlapping? Vi repeterar inte samma sak, så det finns inget sätta för oss att minska antalet dupliceringar. Vi sorterar olika data varje gång.
No Overlapping Subproblems!


För att illustrera var vi har overlapping subproblems, och därför kan använda oss av dynamic programming:


### 2. Optimal Substructure

Ett problem säg ha **optimal substructure** om en optimal lösning kan bli konstruerad från optimal lösningar av dess dess delproblem.

###### Optimal Substructure


!###### Optimal Substructure


Låt oss säga att vi ska hitta en flygresa från Göteborg till Alaska och vi vill hitta billigaste alternativet. Har problemet optimal substructure?

Säg att den billigaste resan vi hittar har ett stopp i Amsterdam. Med optimal substructure hade det betytt att det även är den billigaste resan mellan Göteborg och Amsterdam, men vid en sökning så hittar vi en resa vi Oslo som är billigare.

#### Fib
```javascript
function fib(num) {
  if (num <= 2) return 1;
  return fib(num - 1) + fib(num - 2);
}
```



#### Big O: time complexity

**O(2n)** vilket är sämre än t o m **O(2n)**

Hur förbättrar vi den?

Det stora problemet är att vi repeterar oss om och om igen och då kan vi använda oss av...

### Memoization

Lagra resultat av kostsamma funktionsanrop och return the cached result när samma input inträffar igen.

```javascript
function fib(n, memo = []) {
  if (memo[n] !== undefined) return memo[n];
  if (n <= 2) return 1;
  var res = fib(n - 1, memo) + fib(n - 2, memo);

  memo[n] = res;
  return res;
}
```

   **pseudokod**

- [ ] funktion ska acceptera ett värde(för noden).
- [ ] skapa en ny node med nyss nämda värde.
- [ ] om !head list, sätt head OCH tail att vara nyss skapade nod.
- [ ] om head, sätt next på tail att vara den nya noden och sätt tail att vara den nyss skapade noden.
- [ ] Incrementera längden med ett.
