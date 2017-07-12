function count(arrStr) {
    let text = arrStr.join('\n');
    let words = text.split(/[^\w]+/).filter(w => w !== '').map(w => w.toLowerCase());
    let wordCount = new Map();

    for (let word of words) {
        if(!wordCount.has(word)){
            wordCount.set(word,1);
        } else {
            let currValue = wordCount.get(word);
            wordCount.set(word,currValue+1);
        }
    }
    let sorted = Array.from(wordCount.keys()).sort();

    for (let key of sorted) {
        console.log(`'${key}' -> ${wordCount.get(key)} times`);
    }
}
count(["Far too slow, you're far too slow."]);