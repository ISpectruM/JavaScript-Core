function expressionSplit(str) {
    let codeParts = str.trim().split(/[,;(). \t\r\n]+/g).filter(e => e!=='');
    codeParts.map(e => e.trim()).forEach(e =>console.log(e));
}
expressionSplit('let sum = 4 * 4,b = "wow";');
expressionSplit('let sum = 1 + 2;if(sum > 2){\tconsole.log(sum);}');