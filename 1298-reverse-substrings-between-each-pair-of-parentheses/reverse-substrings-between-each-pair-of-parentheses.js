/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function(s) {
    let stack = [];
    
    for (let char of s) {
        if (char === ')') {
            let temp = [];
            // Pop characters until the matching opening parenthesis is found
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                temp.push(stack.pop());
            }
            // Pop the '(' itself
            stack.pop();
            
            // Push the reversed characters back into the stack
            for (let c of temp) {
                stack.push(c);
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.join('');
};