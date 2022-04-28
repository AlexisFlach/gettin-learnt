# Sort 

### Intermediate sökalgoritmer

Lite tuffare än de grundläggande sökalgoritmerna. Fokusera i början på att kunna förklara koden, mer än att kunna implementera den på första försöket.

Varför ska vi lära oss detta?
Algoritmerna vi lärda oss om i det grundläggande partiet är inte bra ju större vår array blir, ju fler föremål som måste loopas igenom.

#### snabbare sortering

Det finns en familj av sorteringsalgoritmer som kan förbättra tidskomplexitet från O(n2) till O(n log n).
Det finns dock en avvägning mellan snabbhet och enkelthet(utförande).
Dessa algoritmer tar längre tid att förstå och kanske inte alltid så intuitiva, det är inte så som vi människor hade tänkt på att sortera föremål.

### Merge Sort

Merge Sort handlar om en kombination av två saker: *merging(sammanfoga)* och *sorting(sortera)*, egentligen 3 saker: **spliting up**, **merging** och **sorting**. Här utnyttjas det faktum att arrays av 0 eller 1 föremål alltid är sorterade. Funkar genom att smula ner en array till mindre arrays av storlek 0 eller 1 föremål, och därefter bygga upp till nysorterad array.

#### Hur fungerar det?

Vi har följande array:

```javascript
[8, 3, 5, 4, 7, 6, 1, 2]
```

Vi delar upp den i två arrays:

```javascript
[8, 3, 5, 4]  [7, 6, 1, 2]
```

Vi är fortfarande inte vid 0 eller 1 föremål för varje arrays så...

```javascript
[8, 3] [5, 4]  [7, 6] [1, 2]
```

Vi är fortfarande inte vid 0 eller 1 föremål för varje arrays så...

```javascript
[8] [3] [5] [4]  [7] [6] [1] [2]
```

Nu sammanfogar vi dem:

```javascript
[3, 8] [4, 5]  [6, 7] [1, 2]
```

och uppåt..

<img src="./../img/sort-5.png" alt="alt text" title="Sort" style="zoom:33%;" />


### 1. Merging arrays

- för oss att kunna implementera merge sort, kan det vara bra att först implementera en funktion som ansvarar för att sammanfoga två arrays
- den ska ges två arrays vilka är sorterade, denna *helper function* ska skapa en ny array vilken även den är sorterad, och innehåller alla föremål från tidigare två arrays
- Denna funktion ska köra på **O(n + m)** tids- och space-komplexitet och skall inte modifiera några av de parametrar den har givits.

**Beskrivning**

Vi har två sorterade listor och behöver därför endast jämföra värden mellan lista-1 och lista-2. Vi gör detta genom att ha två stycken variablar för att hålla koll på var vi är i de båda listorna. 

När vi först jämför lista-1, index i(till en början satt till 0) med lista-2, index i(till en början satt till 0) kollar vi vilket värde som är minst. Vi tar det minsta värdet och pushar till en result-lista och ökar värdet på den aktuella variabeln med 1. Vi gör detta i en loop som loopar så länge BÅDE i är mindre än lista-1 och j är mindre än lista-2.

När det efter ett tag blir false kommer vi endast att ha en lista som har värden i sig och eftersom att det handlar om sorterade listor vet vi med säkerhet att vi kan pusha i resterande värden i result-listan.

Avsluta med att returna result-listan.


    **pseudokod**

- [ ] skapa en tom array, kolla minsta värden i varje inmatade array
- [ ] medan det fortfarande finns värden vi ej har kollat på...
    - [ ] om värdet in den första arrayen är mindre än det i den andra arrayen, push det värdet av den första arrayen till den nya arrayen och gå vidare till nästa förmål i den första arrayen
    - [ ] tvärtom utifall att värdet i den första arrayen är större än det i den andra arrayen
    - [ ] när vi har gått igenom samtliga föremål i en array, push alla övriga föremål i den arrayen som fortfarande har föremål i sig

```javascript
function merge(arr1, arr2) {
  let results = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr2[j] > arr1[i]) {
      results.push(arr1[i]);
      i++;
    } else {
      results.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    results.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    results.push(arr2[j]);
    j++;
  }
  return results;
}
```

```javascript

merge([1, 10, 50], [1, 10, 50]);

1.

[1, 10, 50] [2, 14, 99, 100];
  i          j
Vi har två counters *i* och *j* och börjar med att jämför 1 med 2, vilken är minst?

1 är minst. Så vi lagrar 1 i vår result array.
[1]

2.
[1, 10, 50] [2, 14, 99, 100];
    i        j
[1, 2]   

1. 

[1, 10, 50] [2, 14, 99, 100];
    i           j
[1, 2] 

4. När en arrayen har nått arra.length vet vi, eftersom att det handlar om sorterade listor att resterande värdemi den andra arrayen kommer att vara större än den första.

while (i < arr1.length) {
    results.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    results.push(arr2[j]);
    j++;
  }

```


## 2. Merge Sort

  **pseudokod**

- [ ] dela upp arrayen i två halvor, exempelvis genom slice(), tills att vi har arrays med storlek 0 eller 1, rekursivt
- [ ] snär vi väl har våra små arrayer, sammanfoga dessa med andra sorterade arrays tills vi är tillbaks med en array i samma storlek som grundarrayen
- [ ] return array

**Beskrivning**
Vi kommer att använda rekursion vilket betyder att vi måste ha ett base case och att input inte får vara samma som tidigare gång/er funktionen har bliv anropad.

MergeSort går ut på att smula ner arrayen till delar av listor med 0 eller 1 föremål så med listor kan vi använda oss av slice() fram tills att vi når vårt base case.


```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
```

### Merge Sort: Big O complexity

<img src="./../img/sort-7.png" alt="alt text" title="Sort" style="zoom:33%;" />

<img src="./../img/sort-7.png" alt="alt text" title="Sort" style="zoom:33%;" />

### Quick Sort

Precis som med merge sort så utnyttjar vi det faktum att arrays med 0 eller 1 element alltid är sorterade. Här börjar vi med att välja ett element (pivot) och hitta dess index. Det spelar egentligen ingen roll vilket element vi väljer, men säg att vi välja elementet i mitten av listan, då tar vi alla övriga element och antingen flyttar dem till vänster, om dess värde är mindre, eller höger, om dessa värde är större. Vi gör alltså ingen övrig sortering här utan bryr oss endast om att förflytta dem. Då vet vi att det elementet är på rätt ställe. Så när vi har vår *pivot point*
på rätt ställe kan vi applicera quickSort på vänsrta och högra sidan.

<img src="./../img/q-sort.png" alt="alt text" title="q-Sort" style="zoom:33%;" />

### Pivot Helper Introduction

Tanken är att Pivot är ansvarig för att första bestämma pivot point och därefter ordna så att element med lägre värde hamnar på vänster sida om pivot, och de med högre hamnar på höger sida. Ordningen på dessa element spelar ingen roll.
Pivoten ska göra det med aktuell array, alltså inte skapa en ny array. När den är klar ska den ge tillbaka index av pivot.

##### Bestäm Pivot
Runtime av quick sort beror till viss del av vilken pivot som väljs.
Helst ska pivot vara så nära median som möjligt. Men det är naturligtvis ganska svårt om vi inte vet vilken data vi har att jobba med så vi får välja en annan strategi, exempelvis välja första elementet eller sista, eller random, etc.

Vi kommer att välja första elementet, och tala om dess konsekvenser senare.

 **pseudokod**

- [ ] den ska acceptera 3 argument: en array, ett startindex, ett slutindex
- [ ] ta pivot från start av array ( om vi använder oss av denna strategi)
- [ ] lagra nuvarande pivot i en variabel. Detta kommer att hålla koll på var pivoten kommer att hamna
- [ ] loopa igenom arrayen från start till slut
    - [ ] om pivot är större än elementet, öka pivot index variabeln och swap elementet med elementet som är på pivot index
- [ ] swap start-elementet (pivot) med pivot index
- [ ] return pivot index

```javascript
function pivot(arr, start = 0, end = arr.length - 1) {
  function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  var pivot = arr[start];
  var swapIndex = start;

  for (var i = start + 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      swapIndex++;
      swap(arr, swapIndex, i);
    }
  }
  swap(arr, start, swapIndex);
  console.log(arr);
  return swapIndex;
}
```

#### Quick Sort implementation

**pseudokod**

- [ ] anropa pivot helper med arrayen
- [ ] när the helper kommer tillbaks med det uppdaterade pivot index, anropa the pivot helper rekursivt med delarrayen på vänster sida om det indexet, och delarrayen på höger sida
- [ ] vi kommer inte att skapa nya arrays, så vårt base case kommer att vara huruvida vår delarrays har längd 1 eller mindre.
- [ ] om head, sätt next på tail att vara den nya noden och sätt tail att vara den nyss skapade noden.
- [ ] Incrementera längden med ett.

```javascript
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = pivot(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}
```

<img src="./../img/q-sort.png" alt="alt text" title="q-Sort" style="zoom: 50%;" />

   **pseudokod**

- [ ] funktion ska acceptera ett värde(för noden).
- [ ] skapa en ny node med nyss nämda värde.
- [ ] om !head list, sätt head OCH tail att vara nyss skapade nod.
- [ ] om head, sätt next på tail att vara den nya noden och sätt tail att vara den nyss skapade noden.
- [ ] Incrementera längden med ett.
