function emailValidation(str) {
    let pattern = /^[a-zA-Z0-9]+[@]{1}[a-z]+\.{1}[a-z]+$/;

    if (pattern.test(str)){
        return 'Valid';
    }
    return 'Invalid';
}

console.log(emailValidation('invalid@emai1.bg'));
