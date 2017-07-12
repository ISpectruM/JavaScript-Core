function gradToRadian(gradian) {
    let degree = gradian * 0.9;

    if (degree >= 0){
        console.log(degree % 360);
    } else {
        console.log(360 - (-degree % 360));
    }
}

gradToRadian(-50);