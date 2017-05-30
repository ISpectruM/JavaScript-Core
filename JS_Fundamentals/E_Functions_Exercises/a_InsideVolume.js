function isInsideTheVolume(points) {

    for (let i = 0; i < points.length; i+=3) {
        let x = points[i];
        let y = points[i+1];
        let z = points[i+2];

        if (isInside(x,y,z,check)){
            console.log("inside");
        } else {
            console.log("outside");
        }
    }

    function isInside(x,y,z,check){
        return check(x,y,z);
    }

    function check(x, y, z) {
        if (x < 10 || x>50 ||
            y < 20 || y>80 ||
            z < 15 || z>50){
            return false;
        } else {
            return true;
        }
    }
}

isInsideTheVolume([13.1, 50, 31.5,
    50, 80, 50,
    -5, 18, 43]
);
