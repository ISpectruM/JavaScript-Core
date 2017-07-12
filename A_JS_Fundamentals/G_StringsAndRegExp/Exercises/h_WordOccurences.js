function wordOccurences(string, word) {
    let pattern = `\\b${word}\\b`;
    let regex = new RegExp(pattern,"gmi");

    let counter = 0;
    let match = regex.exec(string);
    while (match){
        counter++;
        match = regex.exec(string);
    }

    console.log(counter);
}

wordOccurences('There was one. Therefore I bought it. I wouldn’t buy it otherwise.','there');
wordOccurences('How do you plan on achieving that? How? How can you even think of that?','how');
