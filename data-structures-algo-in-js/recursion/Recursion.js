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

/**
 * 2.Martin and the dragon
 * Ask the dragon if there is any odd numbers in the list
 *
 */
// helper functions

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

/**
 * 3. countDown
 * ! recursive
 */

function countDown(num) {
  if (num <= 0) {
    return;
  }
  console.log(num);
  num--;
  countDown(num);
}

/**
 * 4. sumRange
 * ! recursive
 */

function sumRange(num) {
  if (num === 0) return 1;
  return num + sumRange(num - 1);
}

sumRange(3);

/**
 * 5. factorialIterative
 * ! iterativt
 */

function factorialIterative(num) {
  let total = 1;
  for (let i = num; i > 0; i--) {
    total *= i;
  }
  return total;
}

console.log(factorialIterative(3));

/**
 * 6. factorialRecursive
 * ! recursive
 */

function factorialRecursive(num) {
  if (num <= 1) return 1;
  return num * factorialRecursive(num - 1);
}

console.log(factorialRecursive(4));

/**
 * 6. collectOddValues
 * ! recursive with helper methods
 */

function collectOddValues(arr) {
  let result = [];

  function helper(helperInput) {
    if (helperInput.length === 0) return;
    if (helperInput[0] % 2 !== 0) {
      result.push(helperInput[0]);
    }
    helper(helperInput.slice(1));
  }
  helper(arr);

  return result;
}

/**
 * 2. collectOddValues
 * ! pure recursion
 */

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
