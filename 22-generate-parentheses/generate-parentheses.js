/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const result = [];

    function backtrack(currentStr, openCount, closeCount) {
        // Base case: when the string length reaches 2 * n, we have a valid combination
        if (currentStr.length === 2 * n) {
            result.push(currentStr);
            return;
        }

        // We can add an opening bracket if we haven't used all n open brackets yet
        if (openCount < n) {
            backtrack(currentStr + '(', openCount + 1, closeCount);
        }

        // We can add a closing bracket if the count of closing brackets is less than opening brackets
        if (closeCount < openCount) {
            backtrack(currentStr + ')', openCount, closeCount + 1);
        }
    }

    backtrack('', 0, 0);
    return result;
};