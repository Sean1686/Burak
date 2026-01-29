// MIT task M
function getSquareNumbers(numbers: number[]) {
  return numbers.map(num => ({
    number: num,
    square: num * num
  }));
}
console.log(getSquareNumbers([1, 2, 3, 4, 5]));



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



/* Project Standards
 - Logging Stantardards
 - Naming Standards
    - Function, Method, and Variable => Camel Case (e.g., myFunction, calculateTotal)
    - Class and Interface => Pascal Case (e.g., MyClass, IUser)
    - Folders and Files => Kebab Case (e.g., my-folder, user-service.ts)
    - CSS => Snake Case (e.g., my_style.css)
*/



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