function scoreToHtml(string) {
    let objects = JSON.parse(string);

    let result = '<table>\n';
    result += '  <tr><th>name</th><th>score</th></tr>\n';

    for (let obj of objects) {
        result += `  <tr><td>${escape(obj.name)}</td><td>${Number(obj.score)}</td></tr>\n`;
    }

    result += '</table>';
    console.log(result);

    function escape(string) {
            return string
                .replace(/&/g,'&amp;')
                .replace(/</g,'&lt;')
                .replace(/>/g,'&gt;')
                .replace(/"/g,'&quot;')
                .replace(/'/g,'&#39;')
            ;
    }
}

scoreToHtml('[{"name":"Pesho","score":479},{"name":"Gosho","score":205}]');
