function isOddOrEven(string) {
    if (typeof(string) !== 'string') {
        return undefined;
    }
    let length = string.length % 2;
    if ( length === 0) {
        return "even";
    }

    return "odd";
}

console.log(isOddOrEven(''));

module.exports = {isOddOrEven};
