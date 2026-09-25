/**
 * @param {string} expression
 * @return {string[]}
 */
var braceExpansionII = function(expression) {
    let queue = [expression];
    let seen = new Set();
    let result = [];

    while (queue.length > 0) {
        let expr = queue.pop();
        
        // Find the first closing brace '}'
        let j = expr.indexOf('}');
        if (j === -1) {
            if (!seen.has(expr)) {
                seen.add(expr);
                result.push(expr);
            }
            continue;
        }
        
        // Find the matching opening brace '{' before 'j'
        let i = expr.lastIndexOf('{', j);
        
        let before = expr.substring(0, i);
        let middle = expr.substring(i + 1, j);
        let after = expr.substring(j + 1);
        
        let parts = middle.split(',');
        for (let part of parts) {
            queue.push(before + part + after);
        }
    }

    return result.sort();
};