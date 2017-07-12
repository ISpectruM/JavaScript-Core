function findNames(string) {
    let regex = /\b(?:_)([A-Za-z0-9]+)\b/g;
    let result = [];
    let match = regex.exec(string);
    while (match){
        result.push(match[1]);
        match = regex.exec(string);
    }
    console.log(result.join(','));
}

findNames('The _id and _age variables are both integers.');
findNames('Calculate the _area of the _perfectRectangle object.');
findNames('__invalidVariable _evenMoreInvalidVariable_ _validVariable');
