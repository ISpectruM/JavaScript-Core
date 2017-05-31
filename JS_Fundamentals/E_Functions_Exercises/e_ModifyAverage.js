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

modifyAverage(5835);