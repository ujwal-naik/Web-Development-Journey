/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} invocations
 * @return {number[]}
 */
var remainingMethods = function(n, k, invocations) {
    // 1. Build adjacency list for invocation graph
    const graph = Array.from({ length: n }, () => []);
    for (const [u, v] of invocations) {
        graph[u].push(v);
    }

    // 2. Traversal to mark all methods reachable from k as suspicious
    const isSuspicious = new Array(n).fill(false);
    isSuspicious[k] = true;
    const queue = [k];
    let head = 0;

    while (head < queue.length) {
        const current = queue[head++];
        for (const neighbor of graph[current]) {
            if (!isSuspicious[neighbor]) {
                isSuspicious[neighbor] = true;
                queue.push(neighbor);
            }
        }
    }

    // 3. Check if any non-suspicious method invokes a suspicious method
    for (const [u, v] of invocations) {
        if (!isSuspicious[u] && isSuspicious[v]) {
            // Cannot remove suspicious methods -> return all methods [0 ... n-1]
            return Array.from({ length: n }, (_, i) => i);
        }
    }

    // 4. Otherwise, collect and return only non-suspicious methods
    const remaining = [];
    for (let i = 0; i < n; i++) {
        if (!isSuspicious[i]) {
            remaining.push(i);
        }
    }
    return remaining;
};