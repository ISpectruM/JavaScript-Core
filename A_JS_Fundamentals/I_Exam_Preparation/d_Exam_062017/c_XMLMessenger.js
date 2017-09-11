function solve(message) {
    let messagePatt = /^<message((\s*[a-z]+="[ a-zA-Z0-9.]+"\s*)+)>([\s\S]*?)<\/message>$/m;
    let toPatt = /(?:\s+)to="([ a-zA-Z0-9.]+)"/;
    let fromPatt = /(?:\s+)from="([ a-zA-Z0-9.]+)"/;

    let match = messagePatt.exec(message);
    if(!match){
        console.log("Invalid message format");
    } else {
        let attributes = match[1];
        let to = toPatt.exec(attributes);
        let from = fromPatt.exec(attributes);
        let messages = match[3].split(/[\n\r]/);

        if (!to || !from) console.log("Missing attributes");
        else {
            let result = '<article>\n' +
                '  <div>From: <span class="sender">' + from[1] + '</span></div>\n'+
                '  <div>To: <span class="recipient">' + to[1] + '</span></div>\n'+
                '  <div>\n';
            for (let currMessage of messages) {
                result += '    <p>' + currMessage + '</p>\n';
            }
            result += '  </div>\n' +
                '</article>\n';

            console.log(result);
        }
    }
}
solve('<message mailto="everyone" from="Grandma" to="Everyone">FWD: FWD: FWD: FWD: Forwards from grandma</message>');