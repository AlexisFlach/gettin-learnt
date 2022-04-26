/**
 * 1. Same
 * ! FrequencyCounter
 * Write a function called same, which accepts two arrays.
 * The function should return true if every value in the array has
 * it's corresponding value squared in the second array.
 * The fruequency of values must be the same.
 */

function same(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  let fruequencyCounter1 = {};
  let fruequencyCounter2 = {};

  for (let val of arr1) {
    fruequencyCounter1[val] = (fruequencyCounter1[val] || 0) + 1;
  }
  for (let val of arr2) {
    fruequencyCounter2[val] = (fruequencyCounter2[val] || 0) + 1;
  }

  for (let key in fruequencyCounter1) {
    if (!(key ** 2 in fruequencyCounter2)) {
      return false;
    }
    if (fruequencyCounter2[key ** 2] !== fruequencyCounter1[key]) {
      return false;
    }
  }
  console.log(fruequencyCounter2[4]);
  return true;
}

/**
 * 2. Anagram
 * ! FrequencyCounter
 */

const anagram = (first, second) => {
  if (first.length !== second.length) return false;

  let lookup = {};

  for (let i = 0; i < first.length; i++) {
    let letter = first[i];
    lookup[letter] ? (lookup[letter] += 1) : (lookup[letter] = 1);
  }
  for (let i = 0; i < second.length; i++) {
    let letter = second[i];
    if (!lookup[letter]) {
      return false;
    } else {
      lookup[letter] -= 1;
    }
  }
  return true;
};

/**
 * 3. sumZero
 * ! Multiple Pointer
 * Write a function called sumZero which accepts a sorted array of integers.
 * The function should find the first pair where the sum i 0.
 * Return an array that includes both values that sum to zero or undefined if a pair does not exist.
 */

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

/**
 * 4. countUnique Values
 * ! Multiple Pointer
 * Implement a function call countUniqueValues, which accepts a sorted array, and counts the
 * unique values in the array. There can be negative numbers in the array, but it will always be sorted.
 */

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

/**
 * 5. maxSubArray
 * ! Sliding Window
 * Write a function called maxSubarraySum which accepts an array of integers and a number called n.
 *  The function should calculate the maximum sum of n consecutive elements in the array
 */

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

/**
 * 6. search
 * ! Divide and Conquer
 * Given a sorted array of integers, write a function called search,
 * that accepts a value and returns the * index where the value passed to the function is located.
 *  If the value id not found, return -1
 */

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
