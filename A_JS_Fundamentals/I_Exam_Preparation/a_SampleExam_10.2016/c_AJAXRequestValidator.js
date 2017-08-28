function solve(input) {
    let arr = input.filter(e => e !== '');
    let hash = arr[arr.length - 1];

    let methodPattern = /^Method: (GET|PUT|DELETE|POST)$/;
    let authorisationPattern = /^Credentials: (Bearer|Basic) ([A-Za-z0-9]+)$/;
    let contentPattern = /^Content: [.A-Za-z0-9]+$/;

    //Cycle through AJAX requests
    for (let i = 0; i < arr.length - 1; i += 3) {
        let methodTokens = arr[i];
        let methodMatch = methodPattern.exec(methodTokens);
        let method = '';

        let authTokens = arr[i + 1];
        let authMatch = authorisationPattern.exec(authTokens);
        let authType = '';
        let requestHeader = '';

        let contentTokens = arr[i + 2];
        let contentMatch = contentPattern.exec(contentTokens);


        //Check the method validity
        if (!isMethodValid()) continue;

        //Check authentication token validity
        if (!isAuthDataValid()) continue;

        //Check content validity
        if (!isContentValid()) continue;

        //Check for method and auth type match
        if (method !== 'GET' && authType !== 'Bearer') {
            displayResult(401);
            continue;
        }

        //Decode authorisation token
        decodeAuthToken();

        function isMethodValid() {
            if (!methodMatch) {
                displayResult(400);
                return false;
            }
            method = methodMatch[1];
            return true;
        }

        function isAuthDataValid() {
            if (!authMatch) {
                displayResult(400);
                return false;
            }
            authType = authMatch[1];
            requestHeader = authMatch[2];
            return true;
        }

        function isContentValid() {
            if (!contentMatch) {
                displayResult(400);
                return false;
            }
            return true;
        }

        function decodeAuthToken() {
            let hashPattern = /(\d)([A-Za-z])/g;
            let match;
            let code = 0;

            while (match = hashPattern.exec(hash)) {
                let count = Number(match[1]);
                let letter = match[2];

                let occurrence = countLetter(letter);
                if (occurrence === count) {
                    code = 200;
                    break;
                }
            }

            code === 200 ? displayResult(200) : displayResult(403);

            function countLetter(letter) {
                let count = 0;
                requestHeader.split('').forEach(char => {
                    if (letter === char) count++;
                });
                return count;
            }
        }

        function displayResult(code) {
            let result = '';
            switch (code) {
                case 200:
                    result = `Response-Method:${method}&Code:200&Header:${requestHeader}`;
                    break;
                case 400:
                    result = 'Response-Code:400';
                    break;
                case 401:
                    result = `Response-Method:${method}&Code:401`;
                    break;
                case 403:
                    result = `Response-Method:${method}&Code:403`;
                    break;
            }
            console.log(result);
        }
    }
}

solve([
    "Method: GET",
    "Credentials: Bearer asd918721jsdbhjslkfqwkqiuwjoxXJIdahefJAB",
    "Content: users.asd.1782452.278asd",
    "Method: POST",
    "Credentials: Basic 028591u3jtndkgwndsdkfjwelfqkjwporjqebhas",
    "Content: Johnathan",
    "2q",
    ""
]);


