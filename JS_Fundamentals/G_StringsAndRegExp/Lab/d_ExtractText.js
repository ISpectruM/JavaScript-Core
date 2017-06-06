function extract(text) {
    let result = [];

    let startIndex = text.indexOf('(');
    let endIndex = text.indexOf(')');
    while (startIndex !== -1 && endIndex !== -1){
        if (startIndex < endIndex){
            result.push(text.substring(++startIndex,endIndex));
        }

        startIndex = text.indexOf('(',endIndex+1);
        endIndex = text.indexOf(')',endIndex+1);
    }

    console.log(result.join(", "));
}
extract('Rakiya (Bulgarian brandy) is self-made liquor (alcoholic drink)');
