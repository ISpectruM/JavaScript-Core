function parseData(strArr) {
    let regex = /^([A-Z][a-zA-Z]*) - ([1-9][0-9]*) - ([A-z\- 0-9]+)$/;

    let data =[];
    for (let str of strArr) {
        if (data = regex.exec(str)){
            console.log(`Name: ${data[1]}\nPosition: ${data[3]}\nSalary: ${data[2]}`);
        }
    }
}

parseData(['Isacc - 1000 - CEO','Ivan- 500 - Employee','Peter - 500 - Employee']);