function negativePositive(arr) {
    let result = [];

    for (let num of arr) {
        if(num >= 0){
            result.push(num);
        } else {
            result.unshift(num);
        }
    }

    console.log(result.join('\n'));
}

function negPositNum(arr) {
    let solve2 = arr => {
        let result = [];
        arr.forEach(e => (e<0) ? result.unshift(e) : result.push(e));
        return result;
    }
}

negativePositive([3, -2, 0, -1]);