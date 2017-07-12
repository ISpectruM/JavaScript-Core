function validateRequest(obj) {
    let defaultProps = ['Method','URI','Version','Message'];
    let objProps = Object.keys(obj);
    for (let i = 0; i < defaultProps.length; i++) {
        if (objProps[i] !== defaultProps[i].toLowerCase()){
            throw new Error(`Invalid request header: Invalid ${defaultProps[i]}`)
        }
    }

    for (let param in obj) {
        if (obj.hasOwnProperty(param)){
            checkValues(param);
        }
    }

    function checkValues(param) {
        let paramValue = obj[param];
        switch (param){
            case 'method':
                checkMethod(paramValue);
                break;
            case 'uri':
                checkUri(paramValue);
                break;
            case 'version':
                checkVersion(paramValue);
                break;
            case 'message':
                checkMessage(paramValue);
                break;
        }

        function checkVersion(value) {
            if (value !== 'HTTP/0.9' &&
                value!== 'HTTP/1.0' &&
                value !== 'HTTP/1.1' &&
                value !== 'HTTP/2.0'){
                throw new Error(getErrorMsg());
            }
        }

        function checkMessage(value) {
            let regex = /^[^<>\\&'"]*$/g;
            let match = value.match(regex);
            if (match === null){
                throw new Error(getErrorMsg());
            }
        }

        function checkUri(value) {
            let regex = /^(\.*|[a-z0-9A-Z]*)[a-z0-9A-Z]+(\.*|[a-z0-9A-Z]*)+$|^\*$/gm;

            let match = value.match(regex);

            if (match === null){
                throw new Error(getErrorMsg());
            }
        }

        function checkMethod(value) {
            if (value !== 'GET' &&
            value!== 'POST' &&
            value !== 'DELETE' &&
            value !== 'CONNECT'){
                throw new Error(getErrorMsg());
            }
        }

        function getErrorMsg() {
            let outputParam;
            if (param === 'uri'){
                outputParam = 'URI';
            } else {
                outputParam = param.slice(0,1).toUpperCase() + param.slice(1);
            }
            return `Invalid request header: Invalid ${outputParam}`;
        }
    }
    return obj;
}

console.log(validateRequest({
    method: 'POST',
    uri: '',
    version: 'HTTP/1.1',
    message: 'rm -rf /*'

}));
