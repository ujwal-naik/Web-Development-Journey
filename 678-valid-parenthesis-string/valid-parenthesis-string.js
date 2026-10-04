/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function(s) {
    let low = 0;
    let high = 0;
    
    for (let char of s) {
        if (char === '(') {
            low++;
            high++;
        } else if (char === ')') {
            low--;
            high--;
        } else { // char === '*'
            low--; // treat '*' as ')'
            high++; // treat '*' as '('
        }
        
        // low cannot go below 0 because unmatched ')' cannot be balanced retroactively without '('
        if (low < 0) {
            low = 0;
        }
        
        // If high < 0, it means we have more ')' than '(' and '*' combined
        if (high < 0) {
            return false;
        }
    }
    
    // If low is 0, all opening brackets have been validly matched
    return low === 0;
};