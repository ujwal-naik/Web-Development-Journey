/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var averageOfSubtree = function(root) {
    let matchingCount = 0;

    function dfs(node) {
        if (!node) {
            return [0, 0]; // [sum, count]
        }

        const [leftSum, leftCount] = dfs(node.left);
        const [rightSum, rightCount] = dfs(node.right);

        const currentSum = node.val + leftSum + rightSum;
        const currentCount = 1 + leftCount + rightCount;

        if (Math.floor(currentSum / currentCount) === node.val) {
            matchingCount++;
        }

        return [currentSum, currentCount];
    }

    dfs(root);
    return matchingCount;
};