let baseUrl = "http://127.0.0.1:8080/yougou.com";
define(['jquery', 'md5'], function ($, md5) {
    return {
        logEv: function (selector) {
            $(selector).on('click', function () {
               $.ajax({
                   type: "post",
                   url: `${baseUrl}/lib/login.php`,
                   data: {
                       username: $('#username').val(),
                       password: $.md5($('#password').val()),
                       email: $('#email').val(),
                       phone:$('#phone')
                   },
                   success: function (res) {
                       console.log(res);
                   }
               }); 
            });
        }
    }
})