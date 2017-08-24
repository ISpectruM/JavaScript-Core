let helper = (() => {
    function getCommonPartials() {
        return {
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
        }
    }

    function getUsername() {
        return sessionStorage.getItem('username')
    }

    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    function showInfo(message) {
        let infoBox = $('#infoBox');
        let span = infoBox.find('span');
        span.text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    function showError(message) {
        let errorBox = $('#errorBox');
        let span = errorBox.find('span');
        span.text(message);
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 3000);
    }


    return {
        getCommonPartials,
        getUsername,
        handleError,
        showInfo,
        showError,
    }

})();