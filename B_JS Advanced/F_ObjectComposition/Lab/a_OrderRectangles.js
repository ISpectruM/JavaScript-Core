function orderRectangles(arr) {
    let rectangles = [];
    for (let data of arr) {
        let width = data[0];
        let height = data[1];
        let rect = createRect(width,height);
        rectangles.push(rect);
    }

    return rectangles.sort((a, b) => a.compareTo(b));

    function createRect(width, height) {
        let rect =  {
            width:width,
            height:height,
            area: ()=> rect.width * rect.height,
            compareTo: function(other) {
                let result = other.area() - rect.area();
                return result || (other.width - rect.width);
            }
        };
        return rect;
    }
}


console.log(orderRectangles([[10, 5], [5, 12]]));
console.log(orderRectangles([[10,5], [3,20], [5,12]]));