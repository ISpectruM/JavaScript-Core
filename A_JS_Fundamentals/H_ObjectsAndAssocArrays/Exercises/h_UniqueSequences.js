function getUnique(arrJson) {
    let arrays = [];

    for (let json of arrJson) {
        let currArr = JSON.parse(json).sort((a,b)=> b-a);
        if (!isEqual(currArr,arrays)){
            arrays.push(currArr);
        }
    }

    let sorted = arrays.sort((a,b) => a.length-b.length);
    sorted.forEach(a => {
        console.log(`[${a.join(', ')}]`);
    });

    function isEqual(arrA, arrB) {
        for (let arr of arrB) {
            if (arrA.length === arr.length &&
                arrA.every(el => arr.includes(el))){
                return true;
            }
        }
        return false;
    }
}

getUnique(
    ["[-3, -2, -1, 0, 1, 2, 3, 4]",
    "[10, 1, -17, 0, 2, 13]",
    "[4, -3, 3, -2, 2, -1, 1, 0]"]
);

getUnique([
        "[7.14, 7.180, 7.339, 80.099]",
        "[7.339, 80.0990, 7.140000, 7.18]",
        "[7.339, 7.180, 7.14, 80.099]"
]);
