/* Project Standards
 - Logging Stantardards
 - Naming Standards
    - Function, Method, and Variable => Camel Case (e.g., myFunction, calculateTotal)
    - Class and Interface => Pascal Case (e.g., MyClass, IUser)
    - Folders and Files => Kebab Case (e.g., my-folder, user-service.ts)
    - CSS => Snake Case (e.g., my_style.css)
*/



// MIT task J

function findLongestWord(str: string): string {
  const words: string[] = str.split(" ");
  let longestWord: string = "";

  for (const word of words) {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  }

  return longestWord;
}


console.log(findLongestWord("I am from Uzbekistan"));
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