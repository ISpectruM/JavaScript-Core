function getBill(arr) {
    let products = arr.filter((e,i) => i % 2 === 0);
    let prices = arr.filter((e,i) => i % 2 !== 0).map(Number);

    console.log(`You purchased ${products.join(", ")} for a total sum of ${prices.reduce((e1,e2) => e1+e2)}`);
}