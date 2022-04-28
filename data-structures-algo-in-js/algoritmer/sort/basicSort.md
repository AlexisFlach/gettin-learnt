# Sort 

### Elemäntara (kvadratiska) sökalgoritmer

**Bubble Sort** **Selection Sort** **Insertion Sort** 

Processen att omarrangera föremål i en samling så att föremålen är i någon form av ordning.

Det är viktigt att lära sig några sorterings algoritmer då sortering är en väldigt vanlig uppgift och det finns många olika tillvägagångsätt för att sortera; att veta dess för och nackdelar är av stor vikt.

#### Built-in JavaScript Sorting


#### Tala om för JavaScript hur vi vill sortera

- [ ] den inbyggds sort-metoden accepterar en frivillig *comparator function*
- [ ] man kan använda denna funktion för att tala om för JavaScript hur vi vill sortera
- [ ] den kollar på par av element (a och b) och bestämmer deras sorteringsordning baserat på return värde:
  - [ ] om den returnar ett negativt nummer a, a kommer före b
  - [ ] om den returnar ett positivt nummer a, a kommer efter b
  - [ ] om den returnar 0, a och b är samma enligt sort

```javascript
function numberCompare(num1, num2) {
  return num1 - num2;
}

[6, 4, 15, 19].sort(numberCompare);
// 4, 6, 15, 19
```

```javascript
function numberCompare(num1, num2) {
  return num2 - num1;
}

[6, 4, 15, 19].sort(numberCompare);
// 19, 15, 6, 4
```

Man kan göra samma sak med längd av string:

```javascript
function compareByLeng(str1, str2) {
  return str1.length - str2.length;
}
```

# BubbleSort

Sorterings algoritm där största värde *bubble up* till toppen.

Medan vi loopar igenom varje föremål jämför vi det med nästa föremål, och kollar:

Är det föremålet större än det vi jämför med? Om det är det så byter vi.

#### Innan vi sorterar måste vi **swap**

Många sorterings alogoritmer involverar någon form av *swapping*.

```javascript
ES5
function swap(arr,idx1, idx2) {
  var temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp
}
```



```javascript
ES2015
const swap = (arr, idx1, idx2) => {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}
```

### BubbleSort implementation

  **pseudokod**

- [ ] börja loopa med en variable *i* i slutet av arrayen mot början
- [ ] start en inre loop med variabel *j* från början till i - 1
  Vi har alltså en inre loop som är beroende av en yttre loop.
- [ ] om arr[j] > arr[j + 1], swap!
- [ ] return den sorterade arrayen
- [ ] Incrementera längden med ett.

```javascript
function bubbleSort(arr) {
  for (let i = arr.length; i >= 0; i--) {
    for (let j = 0; j <= i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
```
### BubbleSort optimering

Om vår data nästan är helt sorterad, eller helt sorterad, så kommer det inte göra någon skillnad för vår nuvarande algoritm.

```javascript
function bubbleSort(arr) {
  let noSwaps;

  for (let i = arr.length; i > 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        noSwaps = false;
      }
    }
    if (noSwaps) {
      break;
    }
  }
  return arr;
}
```

### Bubble Sort: Big O complexity

Generellt sätt : O(n²), men med vår optimerade version, om arrayen nästan är helt sorterad, är det förenklat O(n).
Så om vi vet att vi har data som nästan är sorterat kan Bubble Sort vara en god kandidat


## Selection Sort

Liknande Bubble Sort med skillnaden att istället för att först placera största värdet på plats, så börjar vi med att placera minsta värdet på plats.

   **pseudokod**

- [ ] lagra första föremålet som minsta det minsta värdet som vi hittills har sett
- [ ] jämför det föremålet med nästa föremål tills vi hittar ett föremål med mindre värde
- [ ] om ett mindre värde hittas, beteckna föremålet med mindre värde att vara "minimum" och fortsätt loopa
- [ ] om minimum ej är det värde vi började med (index), swap dessa värden
- [ ] repetera med nästa föremål tills arrayen är sorterad

```javascript

function selectionSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    var lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowest]) {
        lowest = j;
      }
    }
    if (i !== lowest) {
      console.log(arr);
      console.log("SWAPPING TO: ");
      var temp = arr[i];
      arr[i] = arr[lowest];
      arr[lowest] = temp;
    }
  }
  return arr;
}

console.log(selectionSort([34, 22, 10, 19, 17]));

// [34, 22, 10, 19, 17]

// i , j , lowest
// 0   1   1
// 0   2   2
// 0   3   2
// 0   4   2

```

### Selection Sort: Big O complexity

O(n²), tekniskt sett så gör vi mindre jämförelser än så, men i det stora hela så blir det till O(n²).


Var kan Selcection sort potentiellt vara bättre än Bubble sort? 
Egentligen bara ett tillfälle: när man vill minimera antalet swaps.

## Insertion Sort

Bygger up sorteringen genom att gradvis skapa en större vänstersida vilken alltid är sorterad.


Ganska lik både Bubble sort och Selection sort, men där bubble sort och selection sort mest finns här för att diskutera och senare jämföre med mer effektiva sök-algoritmer, har faktiskt Insertion sort en del väldigt goda egenskaper.

När glänser Insertion sort?

Bra om man vill ha fortlöpande sortering, alltså har sin array sorterad och snabbt kunna sorta in nya föremål.

   **pseudokod**

- [ ] börja med att välja andra föremålet i arrayen
- [ ] jämför det föremålet med tidigare föremål, swap om nödvändigt
- [ ] fortsätt till nästa föremål och om det är i inkorrekt ordning, iterera genom den sorterad delen och placera i rätt ordning
- [ ] repetera tills arrayen är sorterad
- [ ] Incrementera längden med ett.

```javascript
function insertionSort(arr) {
  let noSwap;
  for (var i = 1; i < arr.length; i++) {
    var currentVal = arr[i];

    for (var j = i - 1; j >= 0; j--) {
      console.log("currentVal", currentVal);
      console.log("arr[j", arr[j]);
      if (currentVal < arr[j]) {
        arr[j + 1] = arr[j];
        swap = true;
        console.log("put in place", arr);

      } else {
        swap = false;
        break;
      }
    }
    if (swap) {
      arr[j + 1] = currentVal;
      console.log("swap", arr);
    }
  }
  return arr;
}

console.log(insertionSort([2, 1, 9, 76, 0]));

// [2, 1, 9, 76, 0];

// currentVal 1
//  arr[j 2
// currentVal < arr[j] ? arr[j + 1] = arr[j] : break;
// I första loopen betyder detta att:
// [2, 2, 9, 76, 0]
// swap = true
// j är nu 0;
// swap === true?
// arr[j + 1] = currentVal;
// [1, 2, 9, 76, 0];

```


### Insertion Sort: Big O complexity

O(n2)

### Jämförelse mellan Bubble Sort, Selection Sort och Insertion Sort



Länkar:

https://www.toptal.com/developers/sorting-algorithms

https://visualgo.net/en/sorting

https://toggleon.wordpress.com/2010/10/22/grundlaggande-sorteringsalgoritmer-forklarade-bubble-sort/#varianter_1966



```javascript

```

   **pseudokod**

- [ ] funktion ska acceptera ett värde(för noden).
- [ ] skapa en ny node med nyss nämda värde.
- [ ] om !head list, sätt head OCH tail att vara nyss skapade nod.
- [ ] om head, sätt next på tail att vara den nya noden och sätt tail att vara den nyss skapade noden.
- [ ] Incrementera längden med ett.

