(function() {
    var refAuth = new Wilddog("https://task-management.wilddogio.com/Auth");
    var refEmail = new Wilddog("https://task-management.wilddogio.com/Email");
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
                    // var appendChildButtonNode = $("<button class='send'>Send</button>")
                $(".emails").append(appendParentNode);
                appendParentNode.append(appendChildTimeNode);
                appendParentNode.append(appendChildSubNode);
                appendParentNode.append(appendChildToNode);
                appendParentNode.append(appendChildConNode);
                appendParentNode.append(appendChildClockNode);
                // appendParentNode.append(appendChildButtonNode);
                //append
                appendChildTimeNode.text(snap.key());
                appendChildSubNode.children('.subject').attr("value", snap.val().Subject);
                appendChildToNode.children('.to').attr("value", snap.val().To);
                appendChildConNode.children('.content').text(snap.val().Content);
                appendChildClockNode.children('.time').attr("value", snap.val().Time);
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
