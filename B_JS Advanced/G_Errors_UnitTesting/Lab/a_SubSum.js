function sum(arr, startIndex, endIndex) {

    if (!Array.isArray(arr))return NaN;
    if (startIndex < 0 || startIndex > arr.length-1) startIndex = 0;
    if (endIndex > arr.length-1) endIndex = arr.length-1;

    let sumArr = arr.slice(startIndex,endIndex+1);
    if (arr.length === 0){
        return 0;
    }
    let total = sumArr.reduce((a,b)=> {
        if (!Number(a) || !Number(b)){
            return NaN;
        } else {
            return Number(a) + Number(b);
        }
    });
    if (total !== Math.trunc(total)){
        return Number(total.toFixed(1));
    }
    return total;
}

console.log(sum([10, 20, 30, 40, 50, 60], 3, 300));
console.log(sum([1.1, 2.2, 3.3, 4.4, 5.5], -3, 1));
console.log(sum([10, 'twenty', 30, 40], 0, 2));
console.log(sum([1], 1, 2));
console.log(sum('text', 0, 2));
