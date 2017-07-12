function extract(arr) {
    let current = 0;
    let result = [];
    arr.forEach(e1=> {
        if (e1 >= current){
            current = e1;
            result.push(e1);
        }
    });
    console.log(result.join('\n'));
}

function extractIncreasing(arr) {
    let current = Number.NEGATIVE_INFINITY;
    let result = arr.filter(e => {
        if (e >= current && e !== undefined){
            current = e;
            return true;
        }
    });
    console.log(result.join('\n'));
}

extractIncreasing([1, 3, 8, 4, 10, 12, 3, 2, 24]);
extractIncreasing([1,2,3,4]);
extractIncreasing([20,3,2,15,6,1]
);
