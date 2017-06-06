function getNames(arr) {
    let result = [];
    for (let str of arr) {
        let data = str.split('@');
        let user = data[0].trim();
        let domain = data[1].split('.');
        let dom= domain.map(s => s[0]).join('');
        result.push(user+'.'+dom)
    }
    console.log(result.join(', '));
}

function getResult(arr) {
    let data = arr.map(
        s => s.split('@')).map(
            ([user,domain]) => user +'.'+domain.split('.').map(
                s => s[0]).join('')).join(", ");
    console.log(data);
}
getResult(['peshoo@gmail.com', 'todor_43@mail.dir.bg', 'foo@bar.com']);
