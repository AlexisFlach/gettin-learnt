/**
 * 1. numberCompare
 * ! built-in sort
 * sort array
 */

function numberCompare(num1, num2) {
  return num1 - num2;
}

[6, 4, 15, 19].sort(numberCompare);

console.log([6, 4, 15, 19].sort(numberCompare));

/**
 * 1. strLengthCompare
 * ! built-in sort
 * sort array
 */

function compareByLeng(str1, str2) {
  return str1.length - str2.length;
}

console.log(["hejsansvejsan", "hej", "hejhey", "yo"].sort(compareByLeng));

console.log([6, 4, 15, 19].sort(numberCompare));
