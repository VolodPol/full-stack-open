function highestRating(ratings) {
    let mostVotes = Number.MIN_VALUE;
    let idx = 0;
    for (let i = 0; i < ratings.length; i++) {
        if (ratings[i] > mostVotes) {
            mostVotes = ratings[i];
            idx = i;
        }
    }
    return idx;
}

export default highestRating;