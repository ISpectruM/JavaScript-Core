function makeCrystal(data) {
    let targetWidth = data[0];

    let cutOp = (ore) => ore/4;
    let lapOp = (ore) => ore - (ore*20)/100;
    let grindOp = (ore) => ore - 20;
    let etchOp = (ore) => ore - 2;
    let xRayOp = (ore) => ore + 1;
    let washOp = (ore) => washIt(ore);

    for (let i = 1; i < data.length; i++) {
        let ore = data[i];
        console.log(`Processing chunk ${ore} microns`);

        ore = processOre(ore,'Cut',cutOp);
        ore = processOre(ore,'Lap',lapOp);
        ore = processOre(ore,'Grind',grindOp);
        ore = processOre(ore,'Etch',etchOp);

        if (ore === targetWidth-1){
            ore = xRayOp(ore);
            console.log(`X-ray x1`);
        }

        console.log(`Finished crystal ${ore} microns`);
    }

    function processOre(initial,strOp,oper) {
        let counter = 0;
        let newSize =  oper(initial);

        while (newSize >= targetWidth || Math.floor(targetWidth - newSize) === 1){
            initial = newSize;
            newSize = oper(initial);
            counter++;
        }

        if (counter > 0){
            console.log(`${strOp} x${counter}`);
            initial = washOp(initial);
        }
        return initial;
    }

    function washIt(ore) {
        console.log('Transporting and washing');
        return Math.floor(ore);
    }
}

makeCrystal([50, 49]);

