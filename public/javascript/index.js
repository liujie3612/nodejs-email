var refAuth = new Wilddog("https://task-management.wilddogio.com/Auth");
var refEmail = new Wilddog("https://task-management.wilddogio.com/Email");

//初始化
function init() {
    refAuth.on('value', function(snap) {
        $("#user").attr("value", snap.val().User);
        $("#pass").attr("value", snap.val().Pass);
    });

    refEmail.on('value', function(snapshot) {
        var snapshotLength = snapshot.numChildren();
        console.log(snapshotLength);
        for (var i = 0; i < snapshotLength; i++) {
            var appendNode = $("<ul class = 'detials'><div class='timestamp'></div> <li> Subject:<input type = 'text ' class= 'subject' ></li> <li> To: <input type = 'text ' class = 'to ' > </li> <li> Content: <textarea class='content ' > </textarea> </li > <li> Time: <input type = 'text' class='time' > </li> <button class='send'>Send</button> </ul>");
            $(".emails").append(appendNode);
        };

        snapshot.forEach(function(snap) {
            $(".timestamp").text(snap.key());
            console.log(snap.val());
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
    var appendNode = $("<ul class = 'detials'><div class='timestamp'></div> <li> Subject:<input type = 'text ' class= 'subject' ></li> <li> To: <input type = 'text ' class = 'to ' > </li> <li> Content: <textarea class='content ' > </textarea> </li > <li> Time: <input type = 'text' class='time' > </li> <button class='send'>Send</button> </ul>");
    var timeStamp = showTime();
    $(this).parent("ul").append(appendNode);
    $(this).siblings('ul:last-child').children('.timestamp').text(timeStamp);
    $(".send").click(function() {
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
