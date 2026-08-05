/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} invocations
 * @return {number[]}
 */
var remainingMethods = function(n, k, invocations) {
    // 1. Build adjacency list using pre-allocated arrays
    const graph = Array.from({ length: n }, () => []);
    for (let i = 0; i < invocations.length; i++) {
        const [u, v] = invocations[i];
        graph[u].push(v);
    }

    // 2. Traversal using a fast Uint8Array for boolean flags
    const isSuspicious = new Uint8Array(n);
    isSuspicious[k] = 1;

    // Fixed-size BFS queue using typed array
    const queue = new Uint32Array(n);
    queue[0] = k;
    let head = 0;
    let tail = 1;

    while (head < tail) {
        const current = queue[head++];
        const neighbors = graph[current];
        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            if (!isSuspicious[neighbor]) {
                isSuspicious[neighbor] = 1;
                queue[tail++] = neighbor;
            }
        }
    }

    // 3. Early check: Can any non-suspicious method reach a suspicious method?
    for (let i = 0; i < invocations.length; i++) {
        const u = invocations[i][0];
        const v = invocations[i][1];
        if (!isSuspicious[u] && isSuspicious[v]) {
            // Cannot remove suspicious methods -> return all indices [0 ... n-1]
            const all = new Int32Array(n);
            for (let j = 0; j < n; j++) all[j] = j;
            return Array.from(all);
        }
    }

    // 4. Collect non-suspicious methods
    const remaining = [];
    for (let i = 0; i < n; i++) {
        if (!isSuspicious[i]) {
            remaining.push(i);
        }
    }
    return remaining;
};