function getStats(arrStr) {
    let stats = new Map();

    for (let str of arrStr) {
        let tokens = str.split(/\s*->\s*|\s*:\s*/);
        let [town,product,sales,price] = tokens;
        let income = Number(sales) * Number(price);

        if (!stats.has(town)){
            let products = new Map();
            stats.set(town,products.set(product,income));
        } else {
            if(!stats.get(town).has(product)){
                stats.get(town).set(product,income);
            } else {
                let currIncome = stats.get(town).get(product);
                stats.get(town).set(product,currIncome+income);
            }
        }
    }

    for (let [town,product] of stats) {
        console.log(`Town - ${town}`);
        for (let [pr, income] of product) {
            console.log(`$$$${pr} : ${income}`);
        }
    }
}

getStats([
   'Sofia -> Laptops HP -> 200 : 2000',
   'Sofia -> Raspberry -> 200000 : 1500',
   'Sofia -> Audi Q7 -> 200 : 100000',
   'Montana -> Portokals -> 200000 : 1',
   'Montana -> Qgodas -> 20000 : 0.2',
   'Montana -> Chereshas -> 1000 : 0.3'
]);
