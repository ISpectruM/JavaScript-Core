function createFigure(n) {
    let rows = n%2 === 0 ? n-1 : n;
    let result = '';
    for (let row = 1; row <= rows; row++){

        if (row === 1 || row === Math.ceil(rows/2) || row === rows){
            for(let col = 1; col <=2*n-1; col++){
                if (col === 1 || col === n || col ===2*n-1){
                    result += '+';
                } else {
                    result += '-';
                }
            }
            result += '\n'
        }else {
            for(let col = 1; col <=2*n-1; col++){
                if (col === 1 || col === n || col ===2*n-1){
                    result += '|';
                } else {
                    result += ' ';
                }
            }
            result += '\n'
        }
    }

    console.log(result);
}

createFigure(7);