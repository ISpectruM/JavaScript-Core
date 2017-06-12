function towns(arrStr) {

    let result = [];
    for (let key of arrStr.slice(1)) {
        let tokens = key.split(/\s*\|\s*/).filter(e => e!=='');
        let [town,latt,lon] = tokens;
        let obj = {"Town": town, "Latitude":Number(latt), "Longitude":Number(lon)};
        result.push(obj);
    }
    console.log(JSON.stringify(result));
}

towns(['| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |']
);
