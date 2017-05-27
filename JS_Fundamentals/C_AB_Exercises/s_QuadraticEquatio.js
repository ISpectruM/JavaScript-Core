function quadratic(a,b,c) {
    if (a !== 0){
        let discriminant = Math.pow(b,2)-(4*a*c);
        if (discriminant > 0){
            let firstRoot = (-b - Math.sqrt(discriminant)) / (2*a);
            let secRoot = (-b + Math.sqrt(discriminant)) / (2*a);
            console.log(Math.min(firstRoot,secRoot));
            console.log(Math.max(firstRoot,secRoot));
        } else if (discriminant === 0){
            console.log(-b / (2*a));
        } else {
            console.log('No');
        }
    } else {
        console.log('No')
    }
}

quadratic(5,2,1);