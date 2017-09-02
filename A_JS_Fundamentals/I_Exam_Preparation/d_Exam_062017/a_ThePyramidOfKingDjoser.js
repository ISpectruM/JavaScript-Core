function solve(base, increment) {
    let height = 0;
    let marble = 0;
    let stone = 0;
    let lazuli = 0;
    let gold = 0;

    while (true){
        if (base === 0) break;
        height ++;
        if (base <= 2){
            gold = Math.pow((base),2) * increment;
            break;
        }
        if (height%5 !== 0){
            marble += (base*4-4)*increment;
            stone += Math.pow((base-2),2) * increment;
            base -=2;
        }else {
            lazuli += (base*4-4)*increment;
            stone += Math.pow((base-2),2) * increment;
            base -=2;
        }
    }

    console.log('Stone required: '+ Math.ceil(stone));
    console.log('Marble required: ' + Math.ceil(marble));
    console.log('Lapis Lazuli required: ' + Math.ceil(lazuli));
    console.log('Gold required: ' + Math.ceil(gold));
    console.log('Final pyramid height: ' +
        Math.floor(height*increment));
}

solve(23,0.5);
