/**
 * 1. insertionSort()
 * sort array of integers
 */

function insertionSort(arr) {
  let swap;
  for (var i = 1; i < arr.length; i++) {
    swap = false;
    let currentVal = arr[i];
    for (var j = i - 1; j >= 0; j--) {
      if (currentVal < arr[j]) {
        arr[j + 1] = arr[j];
        swap = true;
      } else {
        break;
      }
    }
    if (swap) {
      arr[j + 1] = currentVal;
    }
  }
  return arr;
}

console.log(insertionSort([2, 1, 9, 76, 0]));

// [2, 1, 9, 76, 0];
//  j   c
