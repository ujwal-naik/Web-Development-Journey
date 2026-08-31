/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nodesBetweenCriticalPoints = function(head) {
    if (!head || !head.next || !head.next.next) {
        return [-1, -1];
    }

    let prev = head;
    let curr = head.next;
    let index = 1;

    let firstCriticalIndex = -1;
    let prevCriticalIndex = -1;
    let minDistance = Infinity;

    while (curr.next !== null) {
        const isLocalMaxima = curr.val > prev.val && curr.val > curr.next.val;
        const isLocalMinima = curr.val < prev.val && curr.val < curr.next.val;

        if (isLocalMaxima || isLocalMinima) {
            if (firstCriticalIndex === -1) {
                firstCriticalIndex = index;
            } else {
                minDistance = Math.min(minDistance, index - prevCriticalIndex);
            }
            prevCriticalIndex = index;
        }

        prev = curr;
        curr = curr.next;
        index++;
    }

    if (minDistance === Infinity) {
        return [-1, -1];
    }

    const maxDistance = prevCriticalIndex - firstCriticalIndex;
    return [minDistance, maxDistance];
};