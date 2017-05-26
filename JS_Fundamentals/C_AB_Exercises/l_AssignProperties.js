function newObject(data) {

    let obj = {};
    obj[data[0]] = data[1];
    obj[data[2]] = data[3];
    obj[data[4]] = data[5];

    console.log(obj);
}

newObject(['name', 'Pesho', 'age', '23', 'gender', 'male']);