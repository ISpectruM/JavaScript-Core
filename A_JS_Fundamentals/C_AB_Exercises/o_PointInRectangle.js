function isPointInside(coordinates) {
    let x = coordinates[0];
    let y = coordinates[1];
    let xMin = coordinates[2];
    let xMax = coordinates[3];
    let yMin = coordinates[4];
    let yMax = coordinates[5];

    if (x < xMin || y < yMin || x > xMax || y > yMax){
        console.log('outside')
    } else {
        console.log('inside');
    }
}

