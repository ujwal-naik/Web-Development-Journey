/**
 * @param {number[]} nums1
 * @return {boolean}
 */
var uniformArray = function(nums1) {
    let minVal = Infinity;
    let hasOdd =  false;

    for (const x of nums1){
        if (x < minVal){
            minVal = x;
        }
        if (x % 2 !== 0){
            hasOdd = true;
        }
    }
    if (!hasOdd) return true ;
    return minVal % 2 !==0 ;
};