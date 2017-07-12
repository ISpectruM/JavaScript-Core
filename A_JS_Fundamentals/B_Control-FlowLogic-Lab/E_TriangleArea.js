function getTriangleArea(a, b, c) {
    let p = (a+b+c)/2;
    let area = Math.sqrt(p*(p-a)*(p-b)*(p-c));
    console.log(area);
}

getTriangleArea(2,3.5,4);