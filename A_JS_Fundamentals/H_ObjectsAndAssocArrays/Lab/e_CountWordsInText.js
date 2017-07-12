function countWords(arr) {
    let text = arr.join('\n');
    let words = text.split(/[^\w]+/).filter(w => w !== '');
    let wordsCount = {};

    for (let word of words) {
        if (!wordsCount.hasOwnProperty(word)){
            wordsCount[word] = 1;
        }else {
            wordsCount[word] += 1;
        }
    }

    return JSON.stringify(wordsCount);
}

console.log(countWords(["Far too slow, you're far too slow."]));
