/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findMissingElements = function(nums) {
    const min = Math.min(...nums);
    const max = Math.max(...nums);

    const numSet  = new Set(nums);
    const missing = [];
    for (let i= min +1; i< max;i++){
        if(!numSet.has(i)){
            missing.push(i);
        }
    }
    return missing;
};