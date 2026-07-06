/**
 * @param {number[]} nums
 * @param {number[]} 
*/
var findErrorNums = function(nums) {
    let duplicate= -1,missing = -1;

    for (let i =0;i<nums.length;i++){
        let idx=Math.abs(nums[i])-1;
        if (nums[idx] < 0){
            duplicate = Math.abs(nums[i]);
        }
        else
        {
            nums[idx] = -nums[idx];
        }
    }
    for(let i = 0; i<nums.length;i++){
        if (nums[i] > 0){
            missing = i+1;
            break;

        }
    }
    return [duplicate,missing];
};