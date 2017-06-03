function rotate(arr) {
    let step = Number(arr.pop());

    let forMoving = arr.splice(arr.length-step,step);
    let result = forMoving.concat(arr);

    console.log(result.join(' '));
}

rotate(['dsa', 'asd', 'test', 'tset', 2]);
