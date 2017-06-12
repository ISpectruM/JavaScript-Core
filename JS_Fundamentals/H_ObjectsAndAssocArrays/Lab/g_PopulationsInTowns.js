function sumPopulation(arrStr) {
    let towns = new Map();

    for (let pair of arrStr) {
        let currTown = pair.split('<->')
            .map(e => e.trim())
            .filter(e => e!=='');
        let town = currTown[0];
        let population = Number(currTown[1]);

        if (!towns.has(town)){
            towns.set(town,population);
        } else {
            let currPopulation = towns.get(town);
            towns.set(town,population+currPopulation);
        }
    }

    [...towns].forEach(([town,pop]) => console.log(`${town} : ${pop}`))
}

sumPopulation([
    'Sofia <-> 1200000',
    'Montana <-> 20000',
    'New York <-> 10000000',
    'Washington <-> 2345000',
    'Las Vegas <-> 1000000'
]);
