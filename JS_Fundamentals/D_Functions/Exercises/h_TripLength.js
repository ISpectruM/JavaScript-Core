function tripLength(data) {

    let firstPoint = {x:data[0],y:data[1]};
    let secPoint = {x:data[2],y:data[3]};
    let thirdPoint = {x:data[4],y:data[5]};

    let firstDist = getDistance(firstPoint,secPoint);
    let secondDist = getDistance(secPoint,thirdPoint);
    let thirdDist = getDistance(thirdPoint,firstPoint);

    let result = getShortestRoute(firstDist,secondDist,thirdDist);

    console.log(result);

    function getShortestRoute(firstDist, secondDist, thirdDist) {
        let minDistance = Number.MAX_VALUE;
        let result = '';
        if (firstDist + secondDist < minDistance){
            minDistance = firstDist+secondDist;
            result = `1->2->3: ${minDistance}`;
        }
        if(secondDist + thirdDist < minDistance){
            minDistance = secondDist + thirdDist;
            result = `1->3->2: ${minDistance}`;
        }
        if(firstDist + thirdDist < minDistance){
            minDistance = firstDist + thirdDist;
            result = `2->1->3: ${minDistance}`;
        }

        return result;
    }

    function getDistance(point1,point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
}

tripLength([0, 0, 2, 0, 4, 0]);