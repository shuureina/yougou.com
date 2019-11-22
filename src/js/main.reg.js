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
    // console.log()
        reg.regEv('.reg-sub', 'click');
        reg.regEv('#phone', 'blur');
    reg.render();
});