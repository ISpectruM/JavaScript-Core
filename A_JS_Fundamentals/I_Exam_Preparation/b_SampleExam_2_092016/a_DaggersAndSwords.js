function solve(swords) {
    let result = '<table border="1">\n' +
        '<thead>\n' +
        '<tr><th colspan="3">Blades</th></tr>\n' +
        '<tr><th>Length [cm]</th><th>Type</th><th>Application</th></tr>\n' +
        '</thead>\n' +
        '<tbody>\n';

    for (let length of swords) {
        let currLength = Math.floor(Number(length));
        let type = 'dagger';
        let application ='';

        if (length <= 10) continue;

        if (currLength > 40){
            type = 'sword';
        }

        application = getApplication(currLength);

        result += `<tr><td>${currLength}</td><td>${type}</td><td>${application}</td></tr>\n`
    }

    result += '</tbody>\n' +
        '</table>\n';

    console.log(result);

    function getApplication(length) {
        let indexFingers = length%5;
        let application='';
        switch (indexFingers){
            case 1:
                application = 'blade';
                break;
            case 2:
                application = 'quite a blade';
                break;
            case 3:
                application = 'pants-scraper';
                break;
            case 4:
                application = 'frog-butcher';
                break;
            case 0:
                application = '*rap-poker';
                break;
            default:
                break;
        }

        return application;
    }
}

solve([
    "17.8",
    "19.4",
    "13",
    "55.8",
    "126.96541651",
    "3"
]);
