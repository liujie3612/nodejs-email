(function() {
    $('#register').click(function() {
        var ref = new Wilddog("https://task-man.wilddogio.com");
        var email_input = $(".email-input").val();
        var pass_input = $("#pass-input").val();
        var re_pass_input = $("#re-pass-input").val();
        if (email_input == "" || pass_input == "" || re_pass_input == "") {
            alert("填写完整信息");
        } else if (!validateEmail(email_input)) {
            alert("请检查邮箱格式")
            return false;
        } else if (pass_input != re_pass_input) {
            alert("两次密码输入不一致");
            return false;
        } else {
            ref.createUser({ email: email_input, password: pass_input },
                function(err, data) {
                    if (err != null) {
                        alert("该账号已经被创建");
                    } else {
                        alert("用户创建成功");
                        window.location.href = "/"
                    }
                });
        }
    })

    function validateEmail(email) {
        var myreg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        return myreg.test(email);
    }
})();
