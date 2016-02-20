(function() {
    function UrlSearch() {
        var name, value;
        var str = window.location.href; //取得整个地址栏 
        var num = str.indexOf("?");
        /*   console.log(num)*/ //获得问号在url中的位置
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
        var arr = str.split("&"); //各个参数放到数组里
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                this[name] = value;
            }
            // console.log(arr)
        }
    };
    var Request = new UrlSearch(); //实例化
    var str_pass = decodeURI(Request.pass);
    // console.log(str_pass);
    var str_pass_length = str_pass.length;
    var b = new Base64();
    if (str_pass == 'undefined') {
        str_pass = "";
    } else {
        var arr = new Array;
        for (i = 0; i < str_pass_length; i++) {
            arr.push(str_pass[i]);
        };
        urlPass = b.decode(str_pass);
    };

    /*密码处理结束*/
    var ref = new Wilddog("https://task-management.wilddogio.com");
    var uidObj = {}
    var authData = ref.getAuth();
    console.log(authData);
    var uid = authData.uid.split(':'); //去掉冒号
    var uid = uid.join(''); //去掉冒号
    var auth_user = authData.password.email;
    Auth = {
        User: auth_user,
        Pass: urlPass
    }
    ref.child(uid).child('Auth').update(Auth);

    /***************************************fengexian******************************************/
    var refAuth = new Wilddog("https://task-management.wilddogio.com/" + uid + "/Auth");
    var refEmail = new Wilddog("https://task-management.wilddogio.com/" + uid + "/Email");

    //初始化
    function init() {
        refAuth.once('value', function(snap) {
            $("#user").attr("value", snap.val().User);
            $("#pass").attr("value", snap.val().Pass);
        });

        refEmail.once('value', function(snapshot) {
            snapshot.forEach(function(snap) {
                var appendParentNode = $("<ul class = 'detials'></ul>");
                var appendChildTimeNode = $("<div class='timestamp'></div> ");
                var appendChildSubNode = $("<li> Subject:<input type = 'text ' class='subject' ></li>")
                var appendChildToNode = $("<li> To: <input type = 'email ' class='to'></li>")
                var appendChildConNode = $("<li> Content: <textarea class='content'></textarea></li > ")
                var appendChildClockNode = $("<li> Time: <input type = 'text' class='time'></li> ")
                var appendChildCloseNode = $("<i class='icon-58 cancel'></i>")
                    // console.log(snap.key())
                $(".emails").append(appendParentNode);
                appendParentNode.append(appendChildTimeNode);
                appendParentNode.append(appendChildSubNode);
                appendParentNode.append(appendChildToNode);
                appendParentNode.append(appendChildConNode);
                appendParentNode.append(appendChildClockNode);
                appendParentNode.append(appendChildCloseNode);
                //append
                appendChildTimeNode.text(snap.key());
                appendChildSubNode.children('.subject').attr("value", snap.val().Subject);
                appendChildToNode.children('.to').attr("value", snap.val().To);
                appendChildConNode.children('.content').text(snap.val().Content);
                appendChildClockNode.children('.time').attr("value", snap.val().Time);

                appendChildCloseNode.click(function() {
                    $(this).parents('.detials').hide();
                    refEmail.child(snap.key()).remove();
                });
            });
        });

    };
    init();

    $("#confirm").click(function() {
        var user = $("#user").val();
        var pass = $("#pass").val();
        refAuth.update({
            "User": user,
            "Pass": pass
        })
    });

    $("#add").click(function() {
        var appendNode = $("<ul class = 'detials'><div class='timestamp'></div> <li> Subject:<input type = 'text ' class= 'subject' ></li> <li> To: <input type = 'text ' class = 'to'></li><li> Content: <textarea class='content ' > </textarea> </li > <li> Time: <input type = 'text' class='time'></li></ul>");
        var sendButton = $("<button class='send'>Send</button>");
        var timeStamp = showTime();
        $(this).parent("ul").append(appendNode);
        appendNode.append(sendButton);
        $(this).siblings('ul:last-child').children('.timestamp').text(timeStamp);

        sendButton.click(function(event) {
            var creatObj = {};
            var subject = $(this).siblings('li').children('.subject').val();
            var to = $(this).siblings('li').children('.to').val();
            var content = $(this).siblings('li').children('.content').val();
            var time = $(this).siblings('li').children('.time').val();
            creatObj[timeStamp] = {
                "Subject": subject,
                "To": to,
                "Content": content,
                "Time": time
            };
            refEmail.update(creatObj);
            window.location.reload(true);
        });
    });

    function showTime() {
        var mydate = new Date();
        var str = "" + mydate.getFullYear() + "年";
        str += (mydate.getMonth() + 1) + "月";
        str += mydate.getDate() + "日";
        str += mydate.getHours() + "时";
        str += mydate.getMinutes() + "分";
        str += mydate.getSeconds() + "秒";
        return str;
    };

})()
