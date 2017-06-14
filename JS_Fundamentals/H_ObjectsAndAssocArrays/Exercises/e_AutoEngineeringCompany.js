function produceCars(arrStr) {
    let cars = new Map();
    for (let str of arrStr) {
        let [brand,model,amount] = str.split(' \| ');

        if (!cars.has(brand)){
            cars.set(brand,new Map());
        }
        if (!cars.get(brand).has(model)){
            cars.get(brand).set(model,0);
        }
        let currAmount = cars.get(brand).get(model);
        cars.get(brand).set(model,currAmount+Number(amount));
    }

    [...cars].forEach(([brand,models]) => {
        console.log(brand);
        [...models].forEach(([model,amount]) => {
            console.log(`###${model} -> ${amount}`);
        })

    })

}
produceCars([
    'Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10'
]);