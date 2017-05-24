function calcAreaAndVolume(R, h) {
    let slantHeigh = Math.sqrt(R*R+h*h);
    let area = Math.PI*R*(R+slantHeigh);

    let volume = 1/3*(Math.PI*R*R*h);

    console.log(`volume = ${volume}`);
    console.log(`area = ${area}`)
}

calcAreaAndVolume(3.3,7.8);