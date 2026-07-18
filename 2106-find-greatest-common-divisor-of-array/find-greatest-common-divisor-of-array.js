/**
 * @param {number[]} nums
 * @return {number}
 */
var findGCD = function(nums) {
    let min = Math.min(...nums);
    let max =Math.max(...nums);

    while (max % min !==0){
        let remainder = max % min;
        max = min;
        min = remainder;
    }   
    return min; 
};