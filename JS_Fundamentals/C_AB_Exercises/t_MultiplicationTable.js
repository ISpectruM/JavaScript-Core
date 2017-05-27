function createTable(n) {

    let result = '<table border="1">\n';
    result += '  <tr><th>x</th>';
    for (let col = 1; col <= n; col++) {
        result += `<th>${col}</th>`;
    }
    result += '</tr>\n';

    for (let col = 1; col <= n; col++) {
        result += `  <tr><th>${col}</th>`;
        for (let row = 1; row <= n; row++) {
            result += `<td>${col * row}</td>`;
        }

        result += '</tr>\n';
    }
    result+= '</table>';

    console.log(result);
}

createTable(5);