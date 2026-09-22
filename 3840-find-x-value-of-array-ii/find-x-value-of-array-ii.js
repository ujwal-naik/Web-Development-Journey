/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number[][]} queries
 * @return {number[]}
 */
var resultArray = function(nums, k, queries) {
    const n = nums.length;
    
    // Each segment tree node stores:
    // prod: total product of the segment modulo k
    // cnt: array of length k where cnt[r] is the count of non-empty prefixes
    //      in this segment whose cumulative product modulo k equals r
    const treeProd = new Int32Array(4 * n);
    const treeCnt = new Int32Array(4 * n * k);

    function merge(p, left, right) {
        const pProd = (treeProd[left] * treeProd[right]) % k;
        treeProd[p] = pProd;

        const leftOffset = left * k;
        const rightOffset = right * k;
        const pOffset = p * k;
        const lProd = treeProd[left];

        for (let r = 0; r < k; r++) {
            treeCnt[pOffset + r] = treeCnt[leftOffset + r];
        }

        for (let r = 0; r < k; r++) {
            const count = treeCnt[rightOffset + r];
            if (count > 0) {
                const newRem = (lProd * r) % k;
                treeCnt[pOffset + newRem] += count;
            }
        }
    }

    function build(node, l, r) {
        if (l === r) {
            const val = nums[l] % k;
            treeProd[node] = val;
            treeCnt[node * k + val] = 1;
            return;
        }
        const mid = (l + r) >> 1;
        const left = node << 1;
        const right = left | 1;
        build(left, l, mid);
        build(right, mid + 1, r);
        merge(node, left, right);
    }

    function update(node, l, r, idx, val) {
        if (l === r) {
            const nodeOffset = node * k;
            for (let i = 0; i < k; i++) {
                treeCnt[nodeOffset + i] = 0;
            }
            const rem = val % k;
            treeProd[node] = rem;
            treeCnt[nodeOffset + rem] = 1;
            return;
        }
        const mid = (l + r) >> 1;
        const left = node << 1;
        const right = left | 1;
        if (idx <= mid) {
            update(left, l, mid, idx, val);
        } else {
            update(right, mid + 1, r, idx, val);
        }
        merge(node, left, right);
    }

    // Temporary storage for accumulating range query results
    let curProd = 1;
    const curCnt = new Int32Array(k);
    const nextCnt = new Int32Array(k);

    function query(node, l, r, ql, qr) {
        if (ql <= l && r <= qr) {
            const nodeOffset = node * k;
            for (let i = 0; i < k; i++) nextCnt[i] = curCnt[i];

            for (let rem = 0; rem < k; rem++) {
                const count = treeCnt[nodeOffset + rem];
                if (count > 0) {
                    const newRem = (curProd * rem) % k;
                    nextCnt[newRem] += count;
                }
            }

            for (let i = 0; i < k; i++) curCnt[i] = nextCnt[i];
            curProd = (curProd * treeProd[node]) % k;
            return;
        }
        const mid = (l + r) >> 1;
        const left = node << 1;
        const right = left | 1;
        if (ql <= mid) {
            query(left, l, mid, ql, qr);
        }
        if (qr > mid) {
            query(right, mid + 1, r, ql, qr);
        }
    }

    build(1, 0, n - 1);

    const m = queries.length;
    const ans = new Array(m);

    for (let i = 0; i < m; i++) {
        const [idx, val, start, x] = queries[i];
        
        update(1, 0, n - 1, idx, val);

        // Reset accumulation for range [start, n - 1]
        curProd = 1;
        for (let j = 0; j < k; j++) curCnt[j] = 0;

        query(1, 0, n - 1, start, n - 1);

        ans[i] = curCnt[x];
    }

    return ans;
};