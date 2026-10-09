var minInsertions = function(s) {
    let res = 0;
    let need = 0; // Number of ')' needed
    
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            // Each '(' requires two ')'
            // If we currently need an odd number of ')' (e.g. we had a single ')' previously), 
            // we must insert one ')' to complete the previous pair.
            if (need % 2 !== 0) {
                res++;
                need--;
            }
            // Each '(' adds 2 more ')' to our requirement
            need += 2;
        } else {
            // Encountered ')'
            need--;
            // If need drops below 0, it means we have an extra ')' without an opening '('
            // or an extra single ')' that wasn't preceded by a '(' pair.
            if (need < 0) {
                res++; // Insert a '(' to match this ')'
                need += 2; // This inserted '(' now requires two ')' (one used here, one still needed)
            }
        }
    }
    
    // Any remaining ')' needed at the end must be added to the result
    return res + need;
};
