/**
 * @param {string} s
 * @return {number}
 */
var minAddToMakeValid = function(s) {
    let openNeeded = 0;   // Closing parentheses '(' needed
    let closeNeeded = 0;  // Opening parentheses ')' needed

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            closeNeeded++;
        } else {
            if (closeNeeded > 0) {
                closeNeeded--;
            } else {
                openNeeded++;
            }
        }
    }

    return openNeeded + closeNeeded;
};