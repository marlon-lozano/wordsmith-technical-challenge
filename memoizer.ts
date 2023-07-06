// Type for the function to be memoized
type Func<T extends any[], R> = (...args: T) => R;

const memoize = <T extends any[], R>(func: Func<T, R>): Func<T, R> => {
  const cache = new Map<string, R>();

  return (...args: T): R => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key) as R;
    }
    
    const result = func(...args);
    cache.set(key, result);
    
    return result;
  };
};

// Test function: computes factorial of a number
function factorial(n: number): number {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

// Memoized version of the factorial function
const memoizedFactorial = memoize(factorial);

// Test
const testNumber = 5;
console.time('First call to memoized function');
console.log(`Factorial of ${testNumber} is ${memoizedFactorial(testNumber)}`);
console.timeEnd('First call to memoized function');

console.time('Second call to memoized function');
console.log(`Factorial of ${testNumber} is ${memoizedFactorial(testNumber)}`);
console.timeEnd('Second call to memoized function');
