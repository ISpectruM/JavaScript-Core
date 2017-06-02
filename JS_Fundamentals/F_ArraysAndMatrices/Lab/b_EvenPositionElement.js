function evenPosition(arr) {
    let result = [];
    for (let element in arr) {
        if (element % 2 === 0){
            result.push(arr[element]);
        }
    }

    console.log(result.join(' '));
}

function evenPositionNew(arr) {
    console.log(arr.filter((e,i) => i % 2 === 0).join(" "));
}

// (arr) => arr.filter((e,i) => i % 2 === 0).join(" ");

evenPosition(['20', '30', '40']);