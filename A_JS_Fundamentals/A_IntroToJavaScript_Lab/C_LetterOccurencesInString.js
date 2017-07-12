
function letterOccurencesCount(word, letter) {
    let count = 0;

    for (let char of word){
        if (char==letter){
            count ++;
        }
    }
    console.log(count);
}

letterOccurencesCount('hello', 'l');
