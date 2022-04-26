/**
 * 1. fib
 */

// function fib(num) {
//   if (num <= 2) return 1;
//   return fib(num - 1) + fib(num - 2);
// }

/**
 * 1. fib
 * ! Memoization
 */

function fib(num, memo = []) {
  if (memo[num] !== undefined) return memo[num];
  if (num <= 2) return 1;
  let res = fib(num - 1) + fib(num - 2);
  console.log(memo[num]);
  memo[num] = res;
  return res;
}

console.log(fib(5));
