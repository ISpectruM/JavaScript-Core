function printColorRows (n) {
    let result = '<ul>\n';
    for (let i = 1; i <= n; i++){
        let color="";
        if (i % 2 === 0){
            color = 'blue';
        } else {
            color = 'green';
        }

        result += `<li><span style='color:${color}'>${i}</span></li>\n`;
    }
    result += '</ul>\n';

    return(result);
}