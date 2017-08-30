function solve(arr) {
    let modules = {};
    let unspeciFiedModules = [];

    //Extract modules
    for (let input of arr) {
        if (input !== '') {

            if (input.startsWith('$app')) {
                let name = extract(input)[1];
                if (name !== null) {
                    if (modules.hasOwnProperty(name)) {
                        unspeciFiedModules = unspeciFiedModules.filter(m => m !== name);
                    } else {
                        modules[name] = getElementsObject();
                    }
                }
            } else {
                let match = extract(input);
                if (match) {
                    let module = match[3];
                    let element = match[1] + 's';
                    let elementValue = match[2];

                    if (!modules.hasOwnProperty(module)) {
                        unspeciFiedModules.push(module);
                        modules[module] = getElementsObject();
                        modules[module][element].push(elementValue);
                    } else {
                        modules[module][element].push(elementValue);
                    }
                }
            }
        }
    }

    //Delete non existent modules
    if (unspeciFiedModules.length !== 0) {
        for (let module of unspeciFiedModules) {
            delete modules[module];
        }
    }

    //Sort modules
    let sorted = Object.keys(modules).sort((a, b) => {
        let controllersA = modules[a]['controllers'].length;
        let controllersB = modules[b]['controllers'].length;
        let modelsA = modules[a]['models'].length;
        let modelsB = modules[b]['models'].length;

        if (controllersA !== controllersB) {
            return controllersB - controllersA;
        } else if (modelsA !== modelsB) {
            return modelsA - modelsB;
        } else {
            return 0;
        }
    });

    let result = {};
    for (let module of sorted) {
        let currModule = modules[module];
        for (let element in currModule) {
            currModule[element].sort((a, b) => a.localeCompare(b));
        }
        result[module] = modules[module];
    }
    console.log(JSON.stringify(result));

    function getElementsObject() {
        return {
            'controllers': [],
            'models': [],
            'views': []
        }
    }

    function extract(input) {
        let regex = '';
        if (input.startsWith('$app')) {
            regex = /\$app='(.+)'/;
        } else {
            regex = /^\$(controller|model|view)='(.+)'&app='(.+)'/;
        }
        return regex.exec(input);
    }
}

solve([
        "$controller='PHPController'&app='Language Parser'",
        "$controller='JavaController'&app='Language Parser'",
        "$model='C#Controller'&app='Language Parser'",
        "$model='B++Controller'&app='Language Parser'",
        "$model='A++Controller'&app='Language Parser'",
        "$app='Garbage Collector'",
        "$controller='GarbageController'&app='Garbage Collector'",
        "$controller='SpamController'&app='Garbage Collector'",
        "$model='A++Controller'&app='Garbage Collector'",
        "$model='B++Controller'&app='Garbage Collector'",
        "$app='Language Parser'"
    ]
);
