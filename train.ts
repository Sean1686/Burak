function countOccurrences(obj: Record<string, any>, keyName: string) {
  let count = 0;
  for (let key in obj) {
    const value = obj[key];
    if(key === keyName) {
      count ++
    } else if (typeof value === "object" && value !== null) {
            count ++

    }
  }
  return count
}

console.log(countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model'))

// W task

// function chunkArray(arr: number[], size: number) {
//     let result = [];
//     let i = 0;
//     for(let i = 0; i < arr.length; i = i + size){
//       const chunk = arr.slice(i, i + size)
//         result.push(chunk)
//     }
//         return result;
// }

// const result1 = chunkArray([1,2,3,4,5,6,7,8,9,10], 3);
// console.log(result1)


// V task 

// function countChars(char: string) {
//     let result: Record<string, number> = {};
//     for(let c of char) {
//         if(result[c]) {
//             result[c]++
//         } else {
//             result[c] = 1
//         }
//     }
//     return result
// }
// console.log(countChars("hello"))

// function sumOdds( parametr: number) {

// let i = 0;
// let counter = 0;
// for (i = 0; i < parametr; i++) {
// if (i%2 === 1) {
// counter++
// }
// }
// return counter
// }
// const result = sumOdds(9);
// const result2 = sumOdds(15);
// console.log(result)
// console.log(result2)

// Task T

// function mergeSortedArrays(arr1: number[], arr2:number[]) {
//   let result = [];   // natijani yig'adigan yangi array
//   let i = 0;         // arr1 uchun ko'rsatkich
//   let j = 0;         // arr2 uchun ko'rsatkich

//   // ikkala arrayda ham element bor ekan — solishtiramiz
//   while (i < arr1.length && j < arr2.length) {

//     if (arr1[i] < arr2[j]) {
//       result.push(arr1[i]); // kichik elementni resultga qo'sh
//       i++;                  // arr1 dan oldik → i oldinga siljiydi
//     } else {
//       result.push(arr2[j]); // aks holda arr2 dan olamiz
//       j++;                  // arr2 dan oldik → j siljiydi
//     }
//   }

//   // arr1 tugamagan bo'lsa — qolganlarini qo'shamiz
//   while (i < arr1.length) {
//     result.push(arr1[i]);
//     i++;
//   }

//   // arr2 tugamagan bo'lsa — qolganlarini qo'shamiz
//   while (j < arr2.length) {
//     result.push(arr2[j]);
//     j++;
//   }

//   return result;
// }

// console.log(mergeSortedArrays([0,3,4,31], [4,6,30]));




//MIT task Q

// function missingNumber(nums: number[]): number {
//   for(let  i = 0; i <= nums.length; i++ ) {
//     if(!nums.includes(i)) {
//       return i
//     }
//   }
//   return -1
// }
// console.log(missingNumber([3,0,1]))


// function getCalculate(numbers: string): number {
//   const parts = numbers.split("+");

//   const num1 = Number(parts[0]);
//   const num2 = Number(parts[1]);
   
//   return num1 + num2;
// }
// console.log(getCalculate("1+3"));
// console.log(getCalculate("5+5"));

// function hasProperty<T extends object>(
//   obj: T,
//   prop: PropertyKey
// ): prop is keyof T {
//   return Object.prototype.hasOwnProperty.call(obj, prop);
// }
// const car = { name: "BMW", model: "M3" };

// console.log(hasProperty(car, "model")); // true
// console.log(hasProperty(car, "year"));  // false


// function objectToArray(obj: Record<string, number>): [string, number][] {
//   return Object.entries(obj);
// }

// Misol:
// console.log(objectToArray({ a: 10, b: 20 }));
// [["a", 10], ["b", 20]]


//MIT task O

//  function calculateSumOfNumbers(arr: any[]): number {
//   let sum = 0;

//   for (const item of arr) {
//     if (typeof item === "number")
//       sum += item
//   }
//   return sum
//  }
//  console.log(calculateSumOfNumbers([10, "10", {son: 10}, true, 35]))


// MIT task N
// function paldromCheck(str: string): boolean {
//   return str === str.split('').reverse().join("");
// }

//   console.log(paldromCheck("dad"));
//   console.log(paldromCheck("son"));

// MIT task M
// function getSquareNumbers(numbers: number[]) {
//   return numbers.map(num => ({
//     number: num,
//     square: num * num
//   }));
// }
// console.log(getSquareNumbers([1, 2, 3, 4, 5]));



// MIT task L
// function reversedSentence(str: string): string {
//   return str
//     .split(' ')
//     .map((word: string) => word.split('').reverse().join(''))
//     .join(' ');
// }

// const result = reversedSentence("We like coding");
// console.log(result); 

//MIT task K 

// function countVowels(input: string): number {
//   const inputString: string = "aeiouAEIOU";
//   let vowels: number = 0;

//   for ( const char of input) {
//     if (inputString.includes(char)) {
//       vowels++;
//     }
//   }

//   return vowels;
// }
// console.log(countVowels("string"));






// MIT task J


// MIT task H2
// function majorityElement(arr: number[]): number | null {
//   const count: Record<number, number> = {};
//   let maxCount: number = 0;
//   let result: number | null = null;

//   for (const num of arr) {
//     count[num] = (count[num] ?? 0) + 1;

//     if (count[num] > maxCount) {
//       maxCount = count[num];
//       result = num;
//     }
//   }

//   return result;
// }

// // Test
// console.log(majorityElement([1, 2, 3, 4, 5, 4, 3, 4])); // 4



// MIT task H

// function getPositive(numbers: number[]) {
//     return numbers.filter(num => num > 0).join('')    
// }

// console.log(getPositive([1, -2, 3, -4, 5]));


// MIT task G

// function getTheHigestIndex(highest) {
//     let max = highest[0];
//     let maxIndex = 0;

//     highest.forEach((value, index) => {
//         if(value > max) {
//             max = value
//         maxIndex = index
//         }
//     }); 

//     return maxIndex
// }

// console.log(getTheHigestIndex([5, 77, 23, 11, 10]));