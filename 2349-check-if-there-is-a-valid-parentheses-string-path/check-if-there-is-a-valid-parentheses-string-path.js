/**
 * @param {character[][]} grid
 * @return {boolean}
 */
var hasValidPath = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    
    // Quick check: total path length must be even
    if ((m + n - 1) % 2 !== 0) return false;
    
    // Memoization table: memo[r][c][balance]
    // Max possible balance at any point is m + n
    const memo = Array.from({ length: m }, () => 
        Array.from({ length: n }, () => new Map())
    );
    
    function dfs(r, c, balance) {
        // Update balance based on the current cell
        if (grid[r][c] === '(') {
            balance++;
        } else {
            balance--;
        }
        
        // If balance drops below 0, invalid prefix
        if (balance < 0) return false;
        
        // If we reached the bottom-right cell
        if (r === m - 1 && c === n - 1) {
            return balance === 0;
        }
        
        // Check memoization table
        if (memo[r][c].has(balance)) {
            return memo[r][c].get(balance);
        }
        
        let isValid = false;
        
        // Move Down
        if (r + 1 < m) {
            isValid = isValid || dfs(r + 1, c, balance);
        }
        
        // Move Right
        if (c + 1 < n && !isValid) {
            isValid = isValid || dfs(r, c + 1, balance);
        }
        
        memo[r][c].set(balance, isValid);
        return isValid;
    }
    
    return dfs(0, 0, 0);
};