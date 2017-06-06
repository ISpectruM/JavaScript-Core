function escape(arr) {
    let result = '<ul>\n';

    for (let str of arr) {

        let escaped = str
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#39;')
        ;

        result +=`  <li>${escaped}</li>\n`;
    }

   return result += '</ul>';
}

console.log(escape(['<b>unescaped& text&</b>', 'normal text']));
