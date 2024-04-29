// ALGORITHMS

/**
 * Selection sort
 */
const selectionSort = arr => {
    const a = [...arr];
    for (let i = 0; i < a.length; i++) {
      const min = a
        .slice(i + 1)
        .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
      if (min !== i) [a[i], a[min]] = [a[min], a[i]];
    }
    return a;
  };
//test cases
selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

/**
 * Heap sort
 */
const heapsort = arr => {
    const a = [...arr];
    let l = a.length;
  
    const heapify = (a, i) => {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let max = i;
      if (left < l && a[left] > a[max]) max = left;
      if (right < l && a[right] > a[max]) max = right;
      if (max !== i) {
        [a[max], a[i]] = [a[i], a[max]];
        heapify(a, max);
      }
    };
  
    for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
    for (i = a.length - 1; i > 0; i--) {
      [a[0], a[i]] = [a[i], a[0]];
      l--;
      heapify(a, 0);
    }
    return a;
  };
//test cases
heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

/** 
 * Count substrings of string
*/
const countSubstrings = (str, searchValue) => {
    let count = 0,
      i = 0;
    while (true) {
      const r = str.indexOf(searchValue, i);
      if (r !== -1) [count, i] = [count + 1, r + 1];
      else return count;
    }
};
//test cases
countSubstrings('tiktok tok tok tik tok tik', 'tik'); // 3
countSubstrings('tutut tut tut', 'tut'); // 4

/**
 * Binary search
 */
const binarySearch = (arr, item) => {
    let l = 0,
      r = arr.length - 1;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      const guess = arr[mid];
      if (guess === item) return mid;
      if (guess > item) r = mid - 1;
      else l = mid + 1;
    }
    return -1;
  };
//test cases
binarySearch([1, 2, 3, 4, 5], 1); // 0
binarySearch([1, 2, 3, 4, 5], 5); // 4
binarySearch([1, 2, 3, 4, 5], 6); // -1

// MATH

/**
 * Luhn algorithm
 */
 const luhnCheck = num => {
    const arr = `${num}`
      .split('')
      .reverse()
      .map(x => Number.parseInt(x));
    const lastDigit = arr.shift();
    let sum = arr.reduce(
      (acc, val, i) =>
        i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val),
      0
    );
    sum += lastDigit;
    return sum % 10 === 0;
  };
//test cases
luhnCheck('4485275742308327'); // true
luhnCheck(6011329933655299); //  true
luhnCheck(123456789); // false

/**
 * Integer to roman numeral
 */
 const lookup = [
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
  
const toRomanNumeral = num =>
    lookup.reduce((acc, [k, v]) => {
      acc += k.repeat(Math.floor(num / v));
      num = num % v;
      return acc;
    }, '');
//test cases
toRomanNumeral(3); // 'III'
toRomanNumeral(11); // 'XI'
toRomanNumeral(1998); // 'MCMXCVIII'

/**
 * Prime factors for integer
 */
 const primeFactors = n => {
    let a = [],
      f = 2;
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
//test cases
  primeFactors(147); // [3, 7, 7]

/**
 * Ranking of an array
 */
const ranking = (arr, compFn) =>
 arr.map(a => arr.filter(b => compFn(a, b)).length + 1);

//test cases
ranking([8, 6, 9, 5], (a, b) => a < b);
// [2, 3, 1, 4]
ranking(['c', 'a', 'b', 'd'], (a, b) => a.localeCompare(b) > 0);
// [3, 1, 2, 4]

// OBJECTS

/**
 * Flatten an object
 */
const flattenObject = (obj, delimiter = '.', prefix = '') =>
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
//test cases
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
flattenObject(fileSizes, '/');
  /* {
    'package': 256,
    'src/index': 1024,
    'src/styles/main': 128,
    'src/styles/colors': 16,
    'assets/images/logo': 512,
    'assets/images/background': 512,
    'assets/fonts/serif': 64
  } */

 /**
  * CSV to JSON
  */

 const CSVToJSON = (data, delimiter = ',') => {
    const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
    return data
      .slice(data.indexOf('\n') + 1)
      .split('\n')
      .map(v => {
        const values = v.split(delimiter);
        return titles.reduce(
          (obj, title, index) => ((obj[title] = values[index]), obj),
          {}
        );
      });
  };
//test cases
CSVToJSON('col1,col2\na,b\nc,d');
// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];
CSVToJSON('col1;col2\na;b\nc;d', ';');
// [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}];