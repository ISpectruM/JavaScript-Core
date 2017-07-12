function isPrime(n) {
    let prime = true;
    let maxNum = Math.ceil(Math.sqrt(n));

    for (let i = 2; i <= maxNum ; i++){
        if (n == i) continue;
        if (n % i == 0){
            prime = false;
            break;
        }
    }

    return prime && (n > 1);
}