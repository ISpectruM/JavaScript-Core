function sumDiagonalElements(matrix) {
    let firstDiagSum = 0;
    let secondaryDiagSum = 0;

    matrix.forEach(
        (row,index) => {
        row.forEach(
            (e,colIndex) => {
                if(index === colIndex){
                    firstDiagSum += e;
                }
            })
        });

    matrix.forEach(
        (row,index) => {
            row.forEach(
                (e,colIndex) => {
                    if(index + colIndex === matrix.length-1){
                        secondaryDiagSum += e;
                    }
                })
        });
    console.log(`${firstDiagSum} ${secondaryDiagSum}`);
}

sumDiagonalElements([[3, 5, 17],
    [-1, 7, 14],
    [1, -8, 89]]
);