function fillBottles(arrStr) {
    let bottles = new Map();
    let juices = new Map();

    for (let input of arrStr) {
        let tokens = input.split(' => ').filter(e => e !== '');
        let name = tokens[0];
        let quantity = Number(tokens[1]);

        if (!juices.has(name)){
            if (quantity >= 1000){
                bottles.set(name,Math.floor(quantity/1000));
            }
            juices.set(name,quantity%1000);
        } else {
            let newQuantity = juices.get(name) + quantity;
            if (newQuantity >= 1000){
                if (!bottles.has(name)){
                    bottles.set(name,Math.floor(newQuantity/1000));
                }else{
                    let currBottles = bottles.get(name);
                    bottles.set(name,Math.floor(newQuantity/1000) + currBottles);
                }
            }
            juices.set(name,newQuantity%1000);
        }
    }

    [...bottles].forEach(([juice,amount]) => {
        console.log(`${juice} => ${amount}`);
    })
}

fillBottles([
    'Kiwi => 0',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789'

]);
