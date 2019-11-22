require.config({
    paths: {
        jquery: './jquery.min',
        md5: './jquery.md5',
        login: './lib/login'
    },
    shim: {
        md5: ['jquery']
    }
});
require(['jquery', 'login'], function ($, login) {
    login.logEv('.log-sub');
})