/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function(nums, fn, init) {
    let j=init;
    if (!nums.length) {
     return init;
   }
    for (let i= 0 ;i<nums.length;i++)
    {  
            j = fn(j,nums[i]);
    }
    return j;   
};