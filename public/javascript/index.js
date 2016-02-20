    document.onkeydown = function(e) {
        var theEvent = window.event || e;
        var code = theEvent.keyCode || theEvent.which;
        if (code == 13) {
            $("#login").click();
        }
    };

    $("#login").click(function(event) {
        var ref = new Wilddog("https://task-management.wilddogio.com/");
        var email = $(".email-input").val();
        var pass = $(".pass-input").val();
        console.log(pass.length)
        if (email == "" || email == null) {
            alert("请输入邮箱");
        } else if (pass == "" || pass == null) {
            alert("请输入密码");
        } else {
            ref.authWithPassword({ email: email, password: pass },
                function(err, data) {
                    if (err == null) {
                        var b = new Base64();
                        var str = b.encode(pass);
                        window.location.href = "/email/dashbord?pass=" + str;
                    } else {
                        alert("请重新核实用户名密码");
                        console.log("auth failed,msg:", err);
                    }
                })
        }
    })
