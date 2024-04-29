// ALGORITHMS

/**
 * Selection sort
 */
const selectionSort = (arr: number[]): number[] => {
  const a: number[] = [...arr];
  for (let i = 0; i < a.length; i++) {
      const min = a
          .slice(i + 1)
          .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
      if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//test case
const arr0: number[] = [5, 1, 4, 2, 3];
console.log("Sorted array:", selectionSort(arr0));

/**
 * Heap sort
 */

const heapsort = (arr: number[]): number[] => {
  const a: number[] = [...arr];
  let l: number = a.length;

const heapify = (a: number[], i: number): void => {
      const left: number = 2 * i + 1;
      const right: number = 2 * i + 2;
      let max: number = i;
      if (left < l && a[left] > a[max]) max = left;
      if (right < l && a[right] > a[max]) max = right;
      if (max !== i) {
          [a[max], a[i]] = [a[i], a[max]];
          heapify(a, max);
      }
  };

for (let i: number = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
for (let i: number = a.length - 1; i > 0; i--) {
      [a[0], a[i]] = [a[i], a[0]];
      l--;
      heapify(a, 0);
  }
  return a;
};

//test case
const arr1: number[] = [6, 3, 4, 1];
console.log("Sorted array:", heapsort(arr1)); // [1, 3, 4, 6]

/** 
 * Count substrings of string
*/
const countSubstrings = (str: string, searchValue: string): number => {
  let count: number = 0,
      i: number = 0;
  while (true) {
      const r: number = str.indexOf(searchValue, i);
      if (r !== -1) [count, i] = [count + 1, r + 1];
      else return count;
  }
};

//test case
const str: string = 'tiktok tok tok tik tok tik';
const searchValue: string = "tik";
console.log("Count:", countSubstrings(str, searchValue)); // 3

/**
 * Binary search
 */
const binarySearch = (arr: number[], item: number): number => {
  let l: number = 0,
      r: number = arr.length - 1;
  while (l <= r) {
      const mid: number = Math.floor((l + r) / 2);
      const guess: number = arr[mid];
      if (guess === item) return mid;
      if (guess > item) r = mid - 1;
      else l = mid + 1;
  }
  return -1;
};

//test case
const arr2: number[] = [1, 2, 3, 4, 5];
const item: number = 1;
console.log("Index:", binarySearch(arr2, item)); // 0


// MATH

/**
 * Luhn algorithm
 */
const luhnCheck = (num: number): boolean => {
  const arr: number[] = `${num}`
      .split('')
      .reverse()
      .map(x => Number.parseInt(x));
  const lastDigit: number = arr.shift()!;
  let sum: number = arr.reduce(
      (acc, val, i) =>
          i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val),
      0
  );
  sum += lastDigit;
  return sum % 10 === 0;
};

//test case
const num0: number = 6011329933655299;
console.log("Is valid:", luhnCheck(num0)); // true

/**
 * Integer to roman numeral
 */
const lookup: [string, number][] = [
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1],
];
const toRomanNumeral = (num: number): string =>
  lookup.reduce((acc: string, [k, v]: [string, number]) => {
      acc += k.repeat(Math.floor(num / v));
      num = num % v;
      return acc;
  }, '');

//test case
const num1: number = 1998;
console.log("Roman numeral:", toRomanNumeral(num1)); // 'MCMXCVIII'

/**
 * Prime factors for integer
 */
const primeFactors = (n: number): number[] => {
  let a: number[] = [],
      f: number = 2;
  while (n > 1) {
      if (n % f === 0) {
          a.push(f);
          n /= f;
      } else {
          f++;
      }
  }
  return a;
};

//test case
const num2: number = 147;
console.log("Prime factors:", primeFactors(num2)); // [3, 7, 7]

/**
 * Ranking of an array
 */
const ranking = <T>(arr: T[], compFn: (a: T, b: T) => boolean): number[] =>
 arr.map(a => arr.filter(b => compFn(a, b)).length + 1);

//test case
const arr3: number[] = [8, 6, 9, 5];
const compFn = (a: number, b: number): boolean => a < b;
console.log("Ranking:", ranking(arr3, compFn)); // [2, 3, 1, 4]


// OBJECTS

/**
 * Flatten an object
 */
const flattenObject = (obj: any, delimiter: string = '.', prefix: string = ''): any =>
 Object.keys(obj).reduce((acc, k) => {
     const pre = prefix.length ? `${prefix}${delimiter}` : '';
     if (
         typeof obj[k] === 'object' &&
         obj[k] !== null &&
         Object.keys(obj[k]).length > 0
     )
         Object.assign(acc, flattenObject(obj[k], delimiter, pre + k));
     else acc[pre + k] = obj[k];
     return acc;
 }, {});

//test case
const fileSizes = {
  package: 256,
  src: {
    index: 1024,
    styles: {
      main: 128,
      colors: 16
    },
  },
  assets: {
    images: {
      logo: 512,
      background: 512
    },
    fonts: {
      serif: 64
    }
  }
};
console.log("Flattened object:", flattenObject(fileSizes));

 /**
  * CSV to JSON
  */
 const CSVToJSON = (data: string, delimiter: string = ','): object[] => {
    const titles: string[] = data.slice(0, data.indexOf('\n')).split(delimiter);
    return data
        .slice(data.indexOf('\n') + 1)
        .split('\n')
        .map(v => {
            const values: string[] = v.split(delimiter);
            return titles.reduce(
                (obj, title, index) => ((obj[title] = values[index]), obj),
                {}
            );
        });
};

//test case
const data: string = "col1,col2\na,b\nc,d";
console.log("CSV to JSON:", CSVToJSON(data)); // [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
