function modifyAverage(num) {
    let arr = Array.from(num.toString()).map(Number);
    let sum = calculateSum(arr);

    while (!(sum / arr.length > 5)){
        arr.push(9);
        sum = calculateSum(arr);
    }

    function calculateSum(arr) {
        return arr.reduce((total,currNum)=>(total+currNum),0);
    }

    console.log(arr.join(""));
}

function modify(num) {
    let numAsStr = num.toString();
    let sum = sum(numAsStr);

    while (sum / numAsStr.length <= 5){
        numAsStr += '9';
        sum = sum(numAsStr);
    }

    console.log(numAsStr);

    function sum(numAsString) {
        let sum = 0;

        for (let num of numAsString) {
            sum += Number(num);
        }

        return sum;
    }
}

modifyAverage(5835);