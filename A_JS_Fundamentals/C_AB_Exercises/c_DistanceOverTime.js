function calculateDistance(numbers) {
    let v1 = numbers[0];
    let v2 = numbers[1];
    let time = numbers[2]/3600;

    let firstDistance = (v1 * (time))*1000;
    let secondDistance = (v2 * (time))*1000;
    let distanceBetween = Math.abs(firstDistance - secondDistance);
    console.log(distanceBetween);
}

calculateDistance([11, 10, 120]);