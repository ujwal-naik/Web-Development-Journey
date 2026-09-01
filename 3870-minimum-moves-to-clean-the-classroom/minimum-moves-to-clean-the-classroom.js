/**
 * @param {string[]} classroom
 * @param {number} energy
 * @return {number}
 */
var minMoves = function(classroom, energy) {
    const m = classroom.length;
    const n = classroom[0].length;
    
    let startR = -1, startC = -1;
    const litterMap = Array.from({ length: m }, () => Array(n).fill(-1));
    let litterCount = 0;
    
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (classroom[r][c] === 'S') {
                startR = r;
                startC = c;
            } else if (classroom[r][c] === 'L') {
                litterMap[r][c] = litterCount++;
            }
        }
    }
    
    // If there is no litter to collect
    if (litterCount === 0) return 0;
    
    const targetMask = (1 << litterCount) - 1;
    
    // bestEnergy[r][c][mask] stores the maximum remaining energy seen so far
    const bestEnergy = Array.from({ length: m }, () => 
        Array.from({ length: n }, () => 
            new Int16Array(1 << litterCount).fill(-1)
        )
    );
    
    // BFS Queue: [r, c, mask, remainingEnergy, moves]
    // Using an array with head pointer for fast queue operations
    const queue = [[startR, startC, 0, energy, 0]];
    let head = 0;
    bestEnergy[startR][startC][0] = energy;
    
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    while (head < queue.length) {
        const [r, c, mask, e, moves] = queue[head++];
        
        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;
            
            // Out of bounds or obstacle
            if (nr < 0 || nr >= m || nc < 0 || nc >= n || classroom[nr][nc] === 'X') {
                continue;
            }
            
            let ne = e - 1;
            if (ne < 0) continue;
            
            let nmask = mask;
            const cellType = classroom[nr][nc];
            
            if (cellType === 'L') {
                nmask |= (1 << litterMap[nr][nc]);
            }
            
            // Check if all litter is collected
            if (nmask === targetMask) {
                return moves + 1;
            }
            
            // Reset energy at 'R' cells
            if (cellType === 'R') {
                ne = energy;
            }
            
            // Cannot continue further if energy is 0 and not on a reset cell
            if (ne === 0) continue;
            
            // Prune states that reach the same position and mask with <= energy
            if (ne <= bestEnergy[nr][nc][nmask]) continue;
            
            bestEnergy[nr][nc][nmask] = ne;
            queue.push([nr, nc, nmask, ne, moves + 1]);
        }
    }
    
    return -1;
};