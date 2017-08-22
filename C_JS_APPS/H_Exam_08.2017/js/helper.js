let helper = (()=>{
    ////Helper functions

    //Helper function to check for logged in user
    function checkLoggedStatus(ctx) {
        let isLogged = sessionStorage.getItem('username') !== null;
        ctx.isLogged = isLogged;
        if (isLogged) {
            ctx.username = sessionStorage.getItem('username');
        }
        return ctx;
    }

    function isInputValid(username, password) {
        let userPattern = new RegExp(/^([a-zA-Z]{3,})$/);
        let passPattern =new RegExp(/^([a-zA-Z0-9]{6,})$/);
        if ( !userPattern.test(username) && !passPattern.test(password)){
            helper.showError('Invalid username');
            return false;
        } else if(!passPattern.test(password) && userPattern.test(username)){
            helper.showError('Invalid password');
            return false;
        }else if (!userPattern.test(username) && passPattern.test(password)){
            helper.showError('Invalid username and password');
            return false;
        } else {
            return true;
        }

    }

    function calcTime(dateIsoFormat) {
        let diff = new Date - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);
        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
    }

    function isPostInputValid(url,title) {
        if ((url === '') && (title === '')){
            helper.showError('Url and title should not be empty.');
            return false;
        } else if (url === ''){
            helper.showError('Url should not be empty.');
            return false;
        } else if (title === ''){
            helper.showError('Title should not be empty');
            return false;
        }else if (!url.startsWith('http')){
            helper.showError('Invalid url');
            return false;
        } else {
            return true;
        }
    }

    function showInfo(message) {
        let infoBox = $('#infoBox');
        let span = infoBox.find('span');
        span.text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    function showError(message) {
        let errorBox = $('#errorBox');
        let span = errorBox.find('span');
        span.text(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 3000);
    }

    return {

        isInputValid,
        checkLoggedStatus,
        calcTime,
        isPostInputValid,
        showInfo,
        handleError,
        showError
    }

})();
