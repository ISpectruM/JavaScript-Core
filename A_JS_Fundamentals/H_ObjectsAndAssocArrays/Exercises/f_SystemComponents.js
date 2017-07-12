function registerComponents(arrStr) {
    let system = new Map();

    for (let str of arrStr) {
        let [name,component,sub] = str.split(/\s*\|\s*/);

        if(!system.has(name)){
            system.set(name,new Map());
        }

        if (!system.get(name).has(component)){
            system.get(name).set(component,[]);
        }

        system.get(name).get(component).push(sub);
    }

    let sortedSystem = Array.from(system.keys()).sort((a,b) => {
        if(system.get(a).size !== system.get(b).size){
            return system.get(b).size - system.get(a).size;
        } else {
            if(a < b){
                return -1;
            } else if (a>b){
                return 1;
            }
            return 0;
        }
    });

    sortedSystem.forEach( s => {
        let sk = s;
        console.log(s);
        let sortedComponents = [...system.get(s)].sort((a,b) =>
        b[1].length - a[1].length);
        sortedComponents.forEach(c => {
            console.log(`|||${c[0]}`);
            c[1].forEach(s => console.log(`||||||${s}`))
        });
    });
}

registerComponents([
    'SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security'

]);