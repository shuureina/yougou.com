require.config({
    paths: {
        jquery: './jquery.min',
        good_lists: './lib/good_lists'
    },
    shim: {}
});

require(['jquery', 'good_lists'], function ($,good_lists) {
    good_lists.render();
});