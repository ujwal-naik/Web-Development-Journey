/**
 * @param {number[]} nums
 * @return {number}
 */
var sortableIntegers = function(nums) {
    const n = nums.length;
    // Create the fully sorted version of nums to compare against
    const sortedNums = [...nums].sort((a, b) => a - b);
    let totalSum = 0;

    // Iterate through all possible divisors k of n
    for (let k = 1; k <= n; k++) {
        if (n % k !== 0) continue;

        let isSortable = true;

        // Check every block of length k
        for (let i = 0; i < n; i += k) {
            const block = nums.slice(i, i + k);
            const targetBlock = sortedNums.slice(i, i + k);

            // Check if block is a cyclic rotation of the corresponding targetBlock
            if (!isCyclicRotation(block, targetBlock)) {
                isSortable = false;
                break;
            }
        }

        if (isSortable) {
            totalSum += k;
        }
    }

    return totalSum;
};

// Helper function to check if 'block' is a cyclic rotation of 'targetBlock'
function isCyclicRotation(block, targetBlock) {
    const k = block.length;
    if (k === 1) return block[0] === targetBlock[0];

    const doubleTarget = targetBlock.concat(targetBlock);
    
    for (let i = 0; i < k; i++) {
        let match = true;
        for (let j = 0; j < k; j++) {
            if (doubleTarget[i + j] !== block[j]) {
                match = false;
                break;
            }
        }
        if (match) return true;
    }
    return false;
};