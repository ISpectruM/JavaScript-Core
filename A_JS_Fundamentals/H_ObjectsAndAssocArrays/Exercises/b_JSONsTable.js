function parseJson(arrStr) {
    let result = '<table>\n';

    for (let json of arrStr) {
        result += '    <tr>\n';

        let person = JSON.parse(json);
        result += `        <td>${escape(person.name)}</td>\n`;
        result += `        <td>${escape(person.position)}</td>\n`;
        result += `        <td>${escape(person.salary)}</td>\n`;

        result += '    <tr>\n';
    }
    result+= '</table>';

    console.log(result);

    function escape(string) {
        if(typeof(string)==='string') {
            return string
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                ;
        }
        return string;
    }

}

parseJson([
    '{"name":"Pesho&","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}'

]);