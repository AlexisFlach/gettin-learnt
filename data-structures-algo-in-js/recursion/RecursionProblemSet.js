/**
 * 1. power
 * Write a function called power which accepts a base and an exponent.
 * The fn should return the power of the base to the exponent. This fn should mimic the functionality of
 * Math.pow() - do not worry about negative bases and exponent
 *
 */

function power(base, exponent) {
  if (exponent === 0) return 1;
  console.log(exponent);
  return base * power(base, exponent - 1);
}

// power(2,0) // 1
// power(2,2) // 4
// power(2,4) // 16

/**
 * 2. factorial
 *
 */

// function factorial(num) {
//   if (num <= 1) return 1;
//   return num * factorial(num - 1);
// }

const factorial = (num) => (num <= 1 ? 1 : num * factorial(num - 1));

/**
 * 3. productOfArray
 *  Write a function called productOfArray which takes in an array of numbers
 * and returns the product of them all
 */

function productOfArray([x, ...xs]) {
  if (!xs.length) {
    return x || 0;
  }
  console.log("x", x);
  console.log("xs", xs);
  return x * productOfArray(xs);
}

console.log(productOfArray([1, 2, 3]));
