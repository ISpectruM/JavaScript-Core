function extractWords(string) {
    let stringUpper = string.toUpperCase();
    let words  = extract();
    words = words.filter(w => w !== "");

    return words.join(', ');

    function extract() {
        return stringUpper.split(/\W+/);
    }
}

console.log(extractWords('Hi, how are you?'));
