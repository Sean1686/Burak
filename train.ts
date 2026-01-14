// MIT task H

function getPositive(numbers: number[]) {
    return numbers.filter(num => num > 0).join('')    
}

console.log(getPositive([1, -2, 3, -4, 5]));


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