function getResult(arr) {

    let processor = (function () {
        let text = '';

        return function processor(commandString) {
            let tokens = commandString.split(' ');

            switch(tokens[0]){
                case 'append':
                    text += tokens[1];
                    break;
                case 'removeStart':
                    text = text.slice(Number(tokens[1]));
                    break;
                case 'removeEnd':
                    text = text.slice(0,text.length-Number(tokens[1]));
                    break;
                case 'print':
                    console.log(text);
                    break;
            }
        }
    })();

    for (let commands of arr) {
        processor(commands);
    }
}
