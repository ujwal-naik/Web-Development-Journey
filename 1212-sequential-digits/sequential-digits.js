/**
 * @param {number} low
 * @param {number} high
 * @return {number[]}
 */
var sequentialDigits = function(low, high) {
    const res =[];
    const digits = "123456789";

    const lowLen = low.toString().length;
    const highLen = high.toString().length;

    for (let length = lowLen; length <= highLen ; length++){
         for (let start = 0; start <= 9 -length; start++){
            const num = parseInt (digits.substring(start,start+ length));
            if (num >=low && num <= high ){
                res.push(num);
            }
        }
    }
    return res;
    
};