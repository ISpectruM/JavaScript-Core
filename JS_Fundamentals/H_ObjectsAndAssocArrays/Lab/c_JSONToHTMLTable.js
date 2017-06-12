function jsonToHtml(json) {
    let objects = JSON.parse(json);

    let result = '<table>\n';

    result += '  <tr>';
    for (let key of Object.keys(objects[0])) {
        result += `<th>${escape(key)}</th>`;
    }
    result += '</tr>\n';

    for (let obj of objects) {
        result += '  <tr>';
        for (let key of Object.keys(obj)) {
            result += `<td>${escape(obj[key])}</td>`;
        }
        result += '</tr>\n';
    }
    result += '</table>';

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

jsonToHtml('[{"Name":"Tomatoes & Chips","Price":2.35},{"Name":"J&B Chocolate","Price":0.96}]');
