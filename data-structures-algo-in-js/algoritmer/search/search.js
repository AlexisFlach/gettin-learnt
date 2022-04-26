/**
 * 1. findIndex
 * ! Linear Search
 * Find array element index on unsorted array
 */

function findIndex(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

/**
 * 2. findIndex
 * ! Binary Search
 * Find array element index on sorted array
 */

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

// console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 10], 7));

// [1, 2, 3, 4, 5, 6, 7, 8, 9], 7 -> index:6

// value > arraymiddle] = ja, flytta upp left

function findSubArray(str, char) {
  let result = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      result.push(str[i]);
    }
  }
  return result.length > 0 ? result.length : -1;
}

console.log(findSubArray("harold said haha in hamburg", ""));
