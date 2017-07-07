function constructCar(obj) {
    let engines = [
        { power: 90, volume: 1800 },
        { power: 120, volume: 2400 },
        { power: 200, volume: 3500 }
    ];

    let newCar = {};
    newCar.model = obj.model;

    for (let prop in obj) {
        if (prop === 'power'){
            let needed = obj[prop];
            for (let engine of engines) {
                if (engine.power >= needed){
                    newCar.engine = engine;
                    break;
                }
            }
        }else if(prop === 'carriage'){
            newCar.carriage = {type:obj[prop],color:obj.color};
        } else if(prop === 'wheelsize'){
            let size  = Math.floor(obj[prop]);
            size = size %2 ===0 ? size-1 : size;
            newCar.wheels = [size,size,size,size];
        }
    }
    return newCar;
}

console.log(constructCar({
        model: 'Opel Vectra',
        power: 110,
        color: 'grey',
        carriage: 'coupe',
        wheelsize: 17
    }
));