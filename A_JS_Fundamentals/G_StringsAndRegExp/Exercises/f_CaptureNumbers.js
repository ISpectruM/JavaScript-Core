function captureNumbers(strings) {
    let regex = /[\d]+/g;
    let match = '';
    let result = [];
    strings.map(s => {
        match = regex.exec(s);
        while(match){
            result.push(match[0]);
            match = regex.exec(s);
        }
    });
    console.log(result.join(' '))
}
captureNumbers(['The300',
                'What is that?',
                'I think it’s the 3rd movie.',
                'Lets watch it at 22:45']
);