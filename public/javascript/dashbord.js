(function() {
    /*密码处理结束*/
    var ref = new Wilddog("https://task-management.wilddogio.com");
    var uidObj = {}
    var authData = ref.getAuth();
    var uid = authData.uid.split(':'); //去掉冒号
    var uid = uid.join(''); //去掉冒号
    var auth_user = authData.password.email;

    /***************************************fengexian******************************************/
    var refEmail = new Wilddog("https://task-management.wilddogio.com/" + uid);

    //初始化
    function init() {
        refEmail.once('value', function(snapshot) {
            snapshot.forEach(function(snap) {
                // console.log(snap.val())
                var appendParentNode = $("<ul class = 'detials'></ul>");
                var appendChildTimeNode = $("<div class='timestamp'></div> ");
                var appendChildSubNode = $("<li> Subject:<input type = 'text ' class='subject' ></li>")
                var appendChildConNode = $("<li> Content: <textarea class='content'></textarea></li > ")
                var appendChildClockNode = $("<li> Time: <input type = 'text' class='time'></li> ")
                var appendChildCloseNode = $("<i class='icon-58 cancel'></i>")
                    // console.log(snap.key())
                $(".emails").append(appendParentNode);
                appendParentNode.append(appendChildTimeNode);
                appendParentNode.append(appendChildSubNode);
                appendParentNode.append(appendChildConNode);
                appendParentNode.append(appendChildClockNode);
                appendParentNode.append(appendChildCloseNode);
                //append
                appendChildTimeNode.text(snap.key());
                appendChildSubNode.children('.subject').attr("value", snap.val().Subject);
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

    $("#add").click(function() {
        var appendNode = $("<ul class = 'detials'><div class='timestamp'></div> <li> Subject:<input type = 'text ' class= 'subject' ></li> <li> Content: <textarea class='content ' > </textarea> </li > <li> Time: <input type = 'text' class='time'></li></ul>");
        var sendButton = $("<button class='send'>Send</button>");
        var timeStamp = showTime();
        $(this).parent("ul").append(appendNode);
        appendNode.append(sendButton);
        $(this).siblings('ul:last-child').children('.timestamp').text(timeStamp);

        sendButton.click(function(event) {
            var creatObj = {};
            var subject = $(this).siblings('li').children('.subject').val();
            var to = auth_user;
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
        var str = "" + mydate.getFullYear() + "-";
        str += (mydate.getMonth() + 1) + "-";
        str += mydate.getDate() + "-";
        str += mydate.getHours() + "-";
        str += mydate.getMinutes() + "-";
        str += mydate.getSeconds() ;
        return str;
    };

})()
