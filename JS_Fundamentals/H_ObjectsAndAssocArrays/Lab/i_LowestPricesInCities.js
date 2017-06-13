function getLowestPrice(arrStr) {
    let products = new Map();

    for (let str of arrStr) {
        let tokens = str.split(/\s*\|\s*/).filter(e => e !=='');
        let [town,product,price] = tokens;

        if (!products.has(product)){
            let towns = new Map();
            towns.set(town,Number(price));
            products.set(product, towns);
        }else{
            products.get(product).set(town,Number(price));
        }
    }

    [...products].forEach(([product,prices]) => {
        let some = [...prices].sort((e1,e2) => e1[1] - e2[1]).shift();
        let [town,price] = some;
        console.log(`${product} -> ${price} (${town})`);
    });
}
getLowestPrice([
    'Sofia City | Audi | 100000',
    'Sofia City | BMW | 100000',
    'Sofia City | Mitsubishi | 10000',
    'Sofia City | Mercedes | 10000',
    'Sofia City | NoOffenseToCarLovers | 0',
    'Mexico City | Audi | 1000',
    'Mexico City | BMW | 99999',
    'New York City | Mitsubishi | 10000',
    'New York City | Mitsubishi | 1000',
    'Mexico City | Audi | 100000',
    'Washington City | Mercedes | 1000'
]);
