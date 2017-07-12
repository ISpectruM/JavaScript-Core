function check(number) {
    let fractionReminder = (number*10)%10;

    if (number % 2 === 0){
        console.log("even");
    } else if (fractionReminder === 0){
        console.log("odd");
    } else {
        console.log("invalid");
    }
}

check(4);