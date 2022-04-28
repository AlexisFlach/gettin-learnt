# Searching Algoritms.

##### Hur söker vi?

Om vi har en array, enklaste sättet att hitta ett värde är att kolla varje element i fältet och kolla om värdet är vad vi vill åt.

Åtminstone om vi har en *unordered array*. 

Om vi har *ordered array*, kan det finnas bättre sätt att söka än att loopa igenom hela arrayen.

#### JavaScript har sökmetoder
- indexOf
- includes
- find
- findIndex

### Linear Search


 **pseudokod**

- [ ] funktion ska acceptera ett en array och ett värde
- [ ] loopa igenom arrayen och kolla om värdet av nuvarande array element är lika med vår input
- [ ] om det är det, return index där elementet är funnet
- [ ] annars, om det aldrig hittas, return -1

```javascript
function findIndex(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}
```
**big O = O(*n*)**

##### Linear Search BIG O

Best case = O(1)
Worst case = O(n);
Average = O(n)

Men är egentligen genomsnittet mindre än O(n)? Nej, iallafall inte enligt BIG O, som bryr sig om generell trend, vilket gör att BIG O för linjärt sök blir O(n). Fortfarande bland det bästa vi kan göra för osorterad lista med data.


### Binary Search

Kan vara en signifikativ förbättring gentemot linjärt sök.
Mycket snabbare. Istället för att eliminera ett element i taget kan vi eliminera hälften av återstående element vid varje tillfälle.

Binary Search funkar endast på sorted arrays!

Iden bakom binärt sökande är Divide and Conquer. Vi väljer en *pivot point* i mitten (vanligtvis) och och kollar, baserat på vad vi letar efter, vänster och höger och struntar i sidan vi inte bryr oss om. 

```javascript
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
```
Sök efter nr. 8.

**Steg 1**
left: 1
right: 11
middle: 6

6 < 8 

**Steg 2**

left: 7
right: 11
middle: 9

**steg 3**
middle: 8
return 8

#### Exempel Binary Search

 **pseudokod**

- [ ] funktion ska acceptera ett en array och ett värde
- [ ] skapa en left pointer i början av arrayen, och en right på slutet
- [ ] medan left kommer före right:
- [ ] skapa en pointer i mitten
- [ ] om det är värdet vi söker, return index
- [ ] om värdet är för litet, flytta upp left
- [ ] om värdet är för stort, flytta ner right
- [ ] om vi ej hittar värder, return -1

```javascript
function binarySearch(arr, elem) {
  let start = 0;
  let end = arr.length - 1;
  let middle = Math.floor((start + end) / 2);

  while (arr[middle] !== elem && start <= end) {
    if (elem < arr[middle]) end = middle - 1;
    else start = middle + 1;
    middle = Math.floor((start + end) / 2);
  }
  return arr[middle] === elem ? middle : -1;
}
```

##### Linear Search BIG O

Best case = O(1)
Worst case = O(log n);
Average = O(log n)


