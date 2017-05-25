function calculateInterest(data) {
    let [principal, interest, compPeriod, years] = [data[0],data[1],data[2],data[3]];
    let frequency = 12/compPeriod;

    let compoundInterest = principal * Math.pow((interest/100) / frequency + 1, years*frequency);

    console.log(compoundInterest.toFixed(2));
}

calculateInterest([100000, 5, 12, 25]);