let auth = (() => {
    function isLogged() {
        return sessionStorage.getItem('username') !== null;
    }

    function saveSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('name', userInfo.name);
    }

    // user/login
    function login(username, password) {
        let userData = {
            username,
            password
        };

        return remote.post('user', 'login',userData, 'basic');
    }

    // user/register
    function register(username, password, name) {
        let userData = {
            username,
            password,
            name
        };

        return remote.post('user', '/', userData,'basic');
    }

    // user/logout
    function logout() {
        let logoutData = {
            authtoken: sessionStorage.getItem('authtoken')
        };

        return remote.post('user', '_logout', logoutData,'kinvey');
    }

    return {
        login,
        register,
        logout,
        saveSession,
        isLogged,
    }
})();