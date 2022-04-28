# Problemlösning

### Strategier för att lösa ett problem

**1. Förstå problemet**
Ställ frågor, klargör problemet.
**2. Utforska konkreta exempel.**
Förstå inputs. Förstå outputs. Vilka edge cases finns där? Hur hanteras errors? Vad händer om en användere skriver in något ogiltigt?
**3. Bryt ned det.**
Psuedokod. Steg för steg-plan. Skriv ner din gameplan.
**4. Solve / simplify.**
Även om vi inte kan lösa det stora problemet, så kan vi förenkla det och lösa lite av det. Vi kan sedan åter införa det stora problemet vi tidigare inte lyckats lösa.
**5. Look Back and Refactor.**
Väldigt viktigt för ens utveckling.

## Problem Solving Patterns

## Hur förbättrar vi oss?
1. Skapa en plan för att lösa problem.
2. Bemästra vanliga problemslösningsmönster


## Frequncy Counters

Använder objekt för att samla värden/frekvenser av värden(antal).
Detta kan ofta med fördel användas för att slippa använda nested loops operationer med arrays / strings.

```javascript
/**
 * 1. Same
 * Write a function called same, which accepts two arrays.
 * The function should return true if every value in the array has
 * it's corresponding value squared in the second array.
 * The fruequency of values must be the same.
 */
```

```javascript
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  let frequencyCounter1 = {};
  let frequencyCounter2 = {};

  for (let val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }

  for (let key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) {
      return false;
    }
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false;
    }
  }
  return true;
}
```

```javascript
/**
 * 2. Anagram
 */
```
```javascript
function anagram(first, second) {
  if (first.length !== second.length) {
    return false;
  }
  const lookup = {};

  for (let i = 0; i < first.length; i++) {
    let letter = first[i];
    lookup[letter] ? (lookup[letter] += 1) : (lookup[letter] = 1);
  }
  console.log(lookup);
  for (let i = 0; i < second.length; i++) {
    let letter = second[i];
    if (!lookup[letter]) {
      return false;
    } else {
      lookup[letter] -= 1;
    }
  }
  return true;
}
```

### Multiple Pointers

Skapa pointers eller värden som motsvarar ett index eller en position och för den mot start, mitt eller slut baserat på tillstånd.
Väldigt effektivt för att lösa problem med minimal space complexity.

```javascript
/**
 * 3. sumZero
 * Write a function called sumZero which accepts a sorted array of integers. The function should find the first pair where the sum i 0. Return an array that includes both values that sum to zero or undefined if a pair does not exist.
 */
```
```javascript
function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  let result = [];

  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) {
      result.push(arr[left], arr[right]);
      return result;
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
}
```

```javascript
/**
 * 4. countUnique Values
 * Implement a function call countUniqueValues, which accepts a sorted array, and counts the 
 * unique values in the array. There van be negative numbers in the array, but it will always be sorted.
 */
```

```javascript
function countUniqueValues(arr) {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return 1;

  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
}
```

### Sliding Window

Involverar att skapa ett nytt *fönster* vilken kan antingen vara en array eller ett nummer från en position till en annan.
Beroende på olika förhållanden: fönstret antingen ökar i storlek eller stängs (och ett nytt fönster öppnas upp).
Väldigt användbart för hålla reda på en delmängd av data i en array/string etc.

```javascript
/**
 * 5. maxSubArray
 * Write a function called maxSubarraySum which accepts an array of integers and a number called n. The function should calculate the maximum sum of n consecutive elements in the array 
 */
```

```javascript
function maxSubarraySum(arr, num) {
  let maxSum = 0;
  let tempSum = 0;

  if (arr.length < num) return null;

  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }

  return maxSum;
}
```

### Divide and Conquer

Involverar att dela upp data till mindre delar och därefter repetera en process med en delmängd data. Detta pattern kan verkligen minska tidskomplexitet.

```javascript
/**
 * 5. findValue
 * Given a sorted array of integers, write a function called search, that accepts a value and returns the * index where the value passed to the function is located. If the value id not found, return -1
 */
```

```javascript
function search(array, value) {
  let min = 0;
  let max = array.length - 1;

  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    let currentElement = array[middle];

    if (currentElement < value) {
      min = middle + 1;
    } else if (currentElement > value) {
      max = middle - 1;
    } else {
      return middle;
    }
  }
  return -1;
}
```

