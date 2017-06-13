function solve(arrStr) {
    let heroes = [];
    for (let input of arrStr) {
        let [name,level,itemTokens] = input.split(/\s*\/\s*/)
                                            .filter(e => e !== '');
        let hero = {};
        hero.name = name;
        hero.level = Number(level);

        let items = [];
        if (itemTokens !== undefined){
             items = itemTokens.split(', ').filter(e => e !== '');
        }
        hero.items = items;

        heroes.push(hero);
    }
    console.log(JSON.stringify(heroes));
}
solve([
    'Isacc / 25 / BarrelVest',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 '

]);