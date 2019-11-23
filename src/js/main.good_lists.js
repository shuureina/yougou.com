require.config({
    paths: {
        jquery: './jquery.min',
        slider:'./lib/jquery-slider',
        good_lists: './lib/good_lists'
    },
    shim: {
        slider:['jquery']
    }
});

require(['jquery', 'good_lists'], function ($,good_lists) {
    good_lists.render();
    
});