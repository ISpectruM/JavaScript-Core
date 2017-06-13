function storeCatalog(arrStr) {
    let catalog = new Map();

    for (let product of arrStr) {
        let letter = product[0];
        product = product.split(' : ').join(': ');
        if (!catalog.has(letter)){
            catalog.set(letter,[]);
        }

        catalog.get(letter).push(product);
    }
    let sortedMap = Array.from(catalog.keys()).sort();

    sortedMap.forEach((letters) => {
        console.log(letters);
        catalog.get(letters).sort().forEach(p => console.log(`  ${p}`)
        )
    })
}

storeCatalog([
    'Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10'

]);
