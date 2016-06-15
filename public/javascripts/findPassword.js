$(function(){
    getVerificationCode();
    postnewPassword();
});
//获取验证码
function getVerificationCode() {
    $(".getVerificationCode").click(function () {
        var obj = {};
        obj.phone = $("#phone").val();
        if (!window.phoneValidate.test(obj.phone)) {
            $("#phone").parents(".item").next().text("请输入正确的手机号");
        } else {
            $("#phone").parents(".item").next().text("");
            $.ajax({
                url: "/users/getSMSCode",
                type: "POST",
                data: obj,
                success: function (data) {
                    var a = eval('(' + data + ')');

                }
            });
            var countDown = 60;
            $(".getVerificationCode").text(countDown + "秒后发送");
            $(".getVerificationCode").attr("disabled", "disabled");
            var a = setInterval(function () {
                countDown--;
                $(".getVerificationCode").text(countDown + "秒后重新发送");
                if (countDown == 1) {
                    $(".getVerificationCode").removeAttr("disabled");
                    $(".getVerificationCode").text("重新发送");
                    clearInterval(a);
                }
            }, 1000)
        }
    })
}
//发送新密码
function postnewPassword(){
    $(".postnewPassword").click(function(){
        var post=checkPost();
        var obj = {};
        obj.phone=$("#phone").val();
        obj.verificationCode=$("#verificationCode").val();
        obj.newPassword=$("#newPassword").val();
        if(post){
            $.ajax({
                url:"/users/modifyPassword",
                type:"post",
                data:obj,
                success:function(data){
                    var a = eval('(' + data + ')');
                    if(a.status == "000"){
                        window.location.href='/login';
                    }
                }
            })
        }
    });
}

//检测错误
function checkPost(){
    var checkresult=true;
    var phone=$("#phone").val();
    var verificationCode =$("#verificationCode").val();
    var newPassword=$("#newPassword").val();
    var repeatPassword=$("#repeatPassword").val();
    if(!window.phoneValidate.test(phone)){
        $("#phone").parents(".item").next().text("请输入正确的手机号");
        checkresult=false;
    }else{
        $("#phone").parents(".item").next().text("");
    }

    if(!/\d{6}/i.test(verificationCode)){
        $("#verificationCode").parents(".item").next().text("验证码格式错误");
        checkresult=false;
    }else{
        $("#verificationCode").parents(".item").next().text("");
    }

    if(newPassword.length < 6 ){
        $("#newPassword").parents(".item").next().text("密码格式不对");
        checkresult=false;
    }else{
        $("#newPassword").parents(".item").next().text("");
    }

    if(repeatPassword.length < 6 ){
        $("#repeatPassword").parents(".item").next().text("密码格式不对");
        checkresult=false;
    }else{
        $("#repeatPassword").parents(".item").next().text("");
    }

    if(newPassword.length > 6 && repeatPassword.length > 6){
        if(newPassword != repeatPassword){
            $("#repeatPassword").parents(".item").next().text("请输入相同密码");
            checkresult=false;
        }else{
            $("#repeatPassword").parents(".item").next().text("");
            $("#newPassword").parents(".item").next().text("");
        }
    }

    return checkresult;
}















