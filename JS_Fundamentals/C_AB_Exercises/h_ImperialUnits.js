function inchesToFeet(num) {
    let inches = num;
    let feet = inches * 0.083333;
    let rounded = Math.round(feet * 10) / 10;
    let fraction = Math.round((rounded - Math.floor(rounded))*10);

    if (fraction !== 0){
        feet = Math.floor(num*0.083333);
    } else {
        feet = rounded;
    }

    inches = inches - Math.round(feet/0.083333);
    console.log(`${feet}'-${inches}"`);
}
inchesToFeet(12);