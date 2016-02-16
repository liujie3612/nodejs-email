var refAuth = new Wilddog("https://task-management.wilddogio.com/Auth");
var refEmail = new Wilddog("https://task-management.wilddogio.com/Email");

$("#confirm").click(function() {
    var user = $("#user").val();
    var pass = $("#pass").val();
    refAuth.update({
        "User": user,
        "Pass": pass
    })
});

$("#send").click(function() {
    var creatObj = {};
    var timeStamp = showTime();
    var subject = $("#subject").val();
    var to = $("#to").val();
    var content = $("#content").val();
    var time = $("#time").val();
    creatObj[timeStamp] = {
        "Subject": subject,
        "To": to,
        "Content": content,
        "Time": time
    };
    refEmail.update(creatObj);
});

function showTime() {
    var mydate = new Date();
    var str = "" + mydate.getFullYear() + "年";
    str += (mydate.getMonth() + 1) + "月";
    str += mydate.getDate() + "日";
    str += mydate.getHours() + "时";
    str += mydate.getMinutes() + "分";
    return str;
}
