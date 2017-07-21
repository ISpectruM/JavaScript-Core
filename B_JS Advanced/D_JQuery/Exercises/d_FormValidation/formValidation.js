function validate() {
    let usernameInput = $('#username');
    let emailInput = $('#email');
    let passInput = $('#password');
    let confirmPass = $('#confirm-password');
    let companyNum = $('#companyNumber');
    let checkBtn = $('#company');
    checkBtn.change(isChecked);
    $('#submit').on('click',checkForms);


    function isChecked() {
        if(checkBtn.is(":checked")){
            $('#companyInfo').css('display','block');
        } else {
            $('#companyInfo').css('display','none');
        }
    }
    
    function checkForms(event) {
        event.preventDefault();
        validateForms();
    }

    function validateForms() {
        let isValid = true;
        let userPatt = /^[a-zA-Z0-9]{3,20}$/g;
        let emailPatt = new RegExp(/^.*?@.*?\..*$/g);

        isFieldValid(usernameInput,userPatt);
        isFieldValid(emailInput, emailPatt);

        if ( passInput.val() === confirmPass.val()) {
            isFieldValid(passInput, /^\w{5,15}$/g);
            isFieldValid(confirmPass, /^\w{5,15}$/g);
        } else {
            passInput.css("border", "solid red");
            confirmPass.css("border", "solid red");
            isValid = false;
        }

        if (checkBtn.is(':checked')) {
            if (+companyNum.val() < 1000 ||
                +companyNum.val() > 9999 ) {
                companyNum.css("border", "solid red");
                isValid = false;
            }else{
                companyNum.css("border", "none");
            }
        }

        if (isValid) {
            $('#valid').css("display", "block");
        } else {
            $('#valid').css("display", "none");
        }

        function isFieldValid(input, regex) {
            if (regex.test(input.val())) {
                input.css("border", "none");
            } else {
                input.css("border", "solid red");
                isValid = false;
            }
        }
    }
}
