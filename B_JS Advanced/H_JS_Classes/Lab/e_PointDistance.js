class PointDistance{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    static distance(a,b){
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        return Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
    }
}
