function getDistance(x, y, x1, y1) {
    let firstPoint = {x:x,y:y};
    let secPoint = {x:x1,y:y1};

    let xDiff = Math.pow(firstPoint.x - secPoint.x,2);
    let yDiff = Math.pow(firstPoint.y - secPoint.y,2);

    console.log(Math.sqrt(xDiff + yDiff))
}
