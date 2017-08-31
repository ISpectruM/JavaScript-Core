function solve(arr) {

    for (let inputLine of arr) {
        let cleared = inputLine.replace(/(%20|\+)+/g,' ');
        let pairs = cleared.split(/&|\?/);
        let results = new Map();

        for (let pair of pairs) {
            if (pair.indexOf('=') >=0){
                let tokens = pair.split('=');
                let key = tokens[0].trim();
                let value = tokens[1].trim();

                if (!results.has(key)){
                    results.set(key, []);
                }
                results.get(key).push(value);
            }
        }
        let result='';
        results.forEach((v,k) => {
            result += `${k}=[${v.join(', ')}]`;
        });
        console.log(result);
    }
}

solve([
    "field=value1&field=value2&field=value3",
    "http://example.com/over/there?name=ferret"

]);