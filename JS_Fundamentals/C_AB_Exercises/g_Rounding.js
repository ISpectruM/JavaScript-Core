function round(data) {
    let number = data[0];
    let precision = data[1];
    let strNum = number.toString();

    if (precision > 15){
        precision = 15;
    }

    let numLength = strNum.length;
    let pointIndex = strNum.indexOf('.')+1;
    if (precision > (numLength-pointIndex)){
        precision = numLength - pointIndex;
    }

    let fractionOperator = Math.pow(10,precision);
    let num = Math.round(number * fractionOperator) / fractionOperator;
    console.log(num);
}

round([Math.PI, 2]);
