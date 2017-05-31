function validateDistance(data) {
    let [x1,y1,x2,y2] = [data[0],data[1],data[2],data[3]];

    let firstToZero = checkValidity(x1,y1,0,0);
    let secondToZero = checkValidity(x2,y2,0,0);
    let pointToPoint = checkValidity(x1,y1,x2,y2);

    ([firstToZero,secondToZero,pointToPoint]).forEach(result => console.log(result));

    function checkValidity(x1, y1, x2, y2) {
        let distance = getDistance(x1, y1, x2, y2);
        let result = isInteger(distance);
        return (`{${x1}, ${y1}} to {${x2}, ${y2}} is ${result}`)
    }

    function isInteger(dist){
        if ((dist*10)%10 === 0){
            return 'valid';
        }
        return 'invalid';
    }

    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2-y1,2));
    }
}

validateDistance([2, 1, 1, 1]);
