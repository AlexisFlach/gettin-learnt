# Big O (Ordobegreppet)

När vi vill mäta hur *bra* en algoritm är, eller hur väl en datastruktur passar för ett visst ändamål, räknar vi efter hur omfattande eller resurskrävande ett problem är, med andra ord; dess *komplexitet*. 

Mängden data som algoritmen behandlar benämns n. Tidskomplexiteten för algoritmen är antalet steg algoritmen kan behöva för att slutföra en beräkning, uttryckt som en funktion av datamängden n. Vi kollar även på hur mycket data datorn måste frigöra där mycket handlar om antal variablar.

När vi räknar ut Big O bryr vi oss inte nämnvärt om detaljer, utan mer en generell trend.

### Varför ska vi använda oss av Big O?
- viktigt att ha ett precist ordförråd när vi diskuterar hur vår kod presterar
- viktigt att kunna diskutera för- och nackdelar mellan olika tillvägagångssätt
- när vår kod presterar dåligt(långsam) eller krashar; identifiera oeffektiv kod för att snabbare kunna hitta fel



#### Exempel 1
 
> 
> 
> **skriv en funktion som accepterar *n* och adderar summan inklusive num n**


**Lösning 1:**

```javascript
  function addUpTo(n) {
  let total = 0;
  for (let i = 0; i <= n; i++) {
    total += i;
  }
  return total;
}
```


**Lösning 2:**

```javascript
function addUp2(n) {
  return n * (n + 1) / 2;
}
```

**Vilken är bäst?**

För det första; vad betyder bäst?
- snabbare?
- tar upp mindre minne? 
- enklare att förstå?

Låt oss först fokusera på snabbhet.

Och varför inte bara använda oss av timers: ex performance.now()?

```javascript
let t1 = performance.now();
console.log(addUpTo(3));
let t2 = performance.now();
console.log(`Time elapsed ${(t2 - t1) / 1000} seconds `);
```

Detta är ingen pålitlig strategi på grund av:
- olika maskiner kommer att ge olika resultat
Det kommer inte betyda att den långsammare metoden helt plötsligt kan generera ett snabbare resultat, men marginalerna är inte pålitliga.
- **samma** maskin kommer att generera olika resultat
- för snabba algoritmer; att mäta tid kanske inte är precist nog?

Så om inte genom att klocka tid, vad annars?

Istället för att räkna sekunder, kan vi räkna **antal simpla operationen en maskin måste utföra**.

#### Räkna operationer




**Lösning 1:**


```javascript
  function addUpTo(n) {
  let total = 0;
  for (let i = 0; i <= n; i++) {
    total += i;
  }
  return total;
}
```


Det skulla anting kunna bli 2n eller 5n + 2, men vad vi kan se är att antal operation, på ett ungefär, ökar proportionellt med *n*, så vi kan förenkla till O(n).

**Lösning 2:**



```javascript
function addUp2(n) {
  return n * (n + 1) / 2;
}
```

### Visualisera tidskomplexitet

https://rithmschool.github.io/function-timer-demo/



Här kan vi tydligt se skillnaderna. När vi ökar värdet på *n* så ökar inte *lösning 2* i tid då den hela tiden endast utför 3 operation.

### Big O

Vi säger att en algoritm är **O(f(n))** om antal simpla operationer en dator måste utföra tillslut är mindre än *constant times* **f(n)**, då *n* har ökat

f(*n*) kan vara **linear** (f(n) = n)
f(*n*) kan vara **quadratic** (f(n) = n2)
f(*n*) kan vara **constant** (f(n) = 1)
f(*n*) kan vara något helt annat.

Man kan alltid tänka på det som; när *n* ökar hur kommer det visualiseras tidskomplext. Kommer det att öka proportionellt men *n* eller kommer det att var konstant? 

En viktig sak att tänka på är att när vi talar om Big O så talar vi om **worst case scenario**.


Här ser vi en annan trend. Det är inte längre linjärt där tid ökar linjärt med hur *n* ökar. Så när *n* ökar, ökar tiden ännu mer.


### Förenkla Big O expressions

###### Constants don't matter

###### Smaller terms don't matter


#### Big O shorthands

1. addition, subtraktion, division = konstant. En dator tar ungefär samma tid på sig att räkna ut 2 + 2 som 200000 + 2000000
2. *variable assignment* är konstant
3. få tillgång till element i en array med hjälp av index, eller object med keys, är konstant
4. i en loop, komplexiteten är längden av loopen multiplicerat med vad som sker inne i loopen. Det är därför vi får *O(n^2)* i *nested loops*


#### Fler exempel


**1.**
```javascript
function logAtLeast5(n) {
  for (var i = 1; i <= Math.max(5, n); i++) {
    console.log(i);
  }
}
```

Så vad blir Big O här? Loopen kommer antingen att gå till 5, eller om *n* är större.
Vad vi bryr oss om är vad som händer när *n* blir större, så det spelar ingen roll vilket vi förenklar till **O(*n*)**.


**2.**
```javascript
function logAtMost5(n) {
  for (var i = 1; i <= Math.min(5, n); i++) {
    console.log(i);
  }
}
```

Inget händer när *n* växer så vi kan förenkla det till O(1)

### Minneskomplexitet

Hittills har vi fokuserat på tidskomplexitet: hur kan vi analysera vår *runtime* av en algoritm i takt med att storleken på vår input ökar.

Vi kan även använda Big O notation till att analysera **space complexity**:
hur mycket ytterligare minne måste vi frigöra för att kunna köra vår algoritm?

Vi kommer att fokusera på **auxiliary space complexity** vilket är när man ej tar in inputs i ekvationen.



#### Exempel minneskomplexitet


```javascript
function sum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}
```

Så vad tar upp plats här?

Variabel total och variabel *i*. Det är det enda som lagrar data.
Övriga handlar om tid.

#### Ett till exempel gälland minneskomplexitet

```javascript
function double(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(2 * arr[i])
  }
  return newArr;
}
```

**O(n)**


### Logs (logaritmer)

Hitills har vi bekantat med de mest vanliga komplexiterna: O(1), O(n), (n2). Vid vissa tillfällen involveras mer komplexa matematiska uttryck.

En av dessa är logaritmen.

### Vad är en log?

Logaritmen är inom matematiken den inversa funktionen till exponentiering. Precis som addition och division är ett par är logaritmen och exponenten ett par.


Logaritmen av ett nummer beräknar ungefärligt hur många gånger du kan dela det talet med 2 innan du får ett värde som är mindre eller lika stort som det.

### Logaritmisk komplexitet


Vissa *searching algorithms* involverar logaritmisk tids komplexitet.

Effektiva *sorting algorithms* involverar logs.

Recursion involver ibland *logarithmic space complexity*.

### Sammanfattning

- för att analysera en algoritm använder vi Big O Notation
- big O kan ge oss en förståelse på tids- och minneskomplexitet av en algoritm
- big O bryr sig inte om precision, utan bryr sig mer om generella trender. Linjär? Kvardratisk? Konstant?
- big O är endast beroende av algoritmen, inte datorn som kör algoritmen.
- big O är överallt!

### Inbyggda datastrukturers komplexitet

#### Big O: Objects

När ska vi använda objekt?
- när vi inte bryr oss om ordning
- när vi vill ha snabb *access*/*insertion* och *removal*


#### Big O: Arrays

När ska vi använda array?
- när vi bryr oss om ordning
- när vi vill ha snabb *access*/*insertion* och *removal*





