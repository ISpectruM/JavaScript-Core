function myFunc() {
    let argsCount ={};
    for (let i = 0; i < arguments.length; i++) {
        let value = arguments[i];
        let type = typeof arguments[i];
        console.log(`${type}: ${value}`);

        if (!argsCount[type]){
            argsCount[type] = 1;
        } else {
            argsCount[type]++;
        }
    }

    let sortedResults = [];
    for (let prop in argsCount) {
        sortedResults.push([prop, argsCount[prop]]);
    }

    sortedResults.sort((a, b) => {
        return b[1]-a[1];
    }).forEach(([a,b]) => {
        console.log(`${a} = ${b}`);
    });
}

myFunc('cat', 42, 55, function () { console.log('Hello world!'); });