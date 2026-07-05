/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function(functions) {
    
    return function(x) {
        
       let currentVal = x;
       for (let i=functions.length-1;i>=0;i--)
       {
        currentVal = functions[i](currentVal);
       }
       return currentVal; 
    }
};

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */