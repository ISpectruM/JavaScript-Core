function findBiggest(matrix) {
    let biggest = Number.NEGATIVE_INFINITY;

    matrix.forEach(
        row => row.forEach(
            e => {
            if (e > biggest){
                biggest = e;
            }
        }
    ));
    console.log(biggest);
}

// matrix => Math.max.apply(null,matrix.reduce((row1,row2) => row1.concat(row2)));


