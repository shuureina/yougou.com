require.config({
    paths: {
        jquery: './jquery.min',
        md5: './jquery.md5',
        reg: './lib/reg'
    },
    shim: {
        md5: ['jquery']
    }
   
});

require(['jquery', 'reg'], function ($, reg) {
    if ($('.form-group input').val() && $('.from-group1 input').prop('checked')) {
        reg.regEv('.reg-sub', 'click');
    }
    if ($('#phone').val()) {
        reg.regEv('#phone', 'blur');
    }
    reg.RegExps();
});