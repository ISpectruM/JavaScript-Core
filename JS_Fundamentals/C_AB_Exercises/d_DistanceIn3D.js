function getDistance(c) {
    let [x,y,z,x1,y1,z1] = [c[0],c[1],c[2],c[3],c[4],c[5]];
    let firstPoint = {x:x, y:y, z:z};
    let secPoint = {x:x1, y:y1, z:z1};

    let xDiff = Math.pow(firstPoint.x - secPoint.x,2);
    let yDiff = Math.pow(firstPoint.y - secPoint.y,2);
    let zDiff = Math.pow(firstPoint.z - secPoint.z,2);

    console.log(Math.sqrt(xDiff + yDiff + zDiff));
}

getDistance([3.5, 0, 1, 0, 2, -1]);