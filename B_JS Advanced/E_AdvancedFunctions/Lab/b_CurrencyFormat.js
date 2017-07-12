function formatCurrency(separator, currency, currFirst, value) {
    let result = Math.trunc(value) + separator;
    result += value.toFixed(2).substr(-2,2);
    if (currFirst){
        return currency +' '+ result;
    } else {
        return result +' '+ currency;
    }
}

function formatDollars(formatFunc) {
    function dollarFormatter(value) {
        return formatFunc(',','$',true,value);
    }
    return dollarFormatter;
}

let dollars = formatDollars(formatCurrency);

console.log(dollars(5000));