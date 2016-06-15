$(function(){
    register.getCode();
    register.send();
});





var register={
    getCode:function(){
        $(".getCode").on("click",register.sendPhone)
    },
    sendPhone:function(){
        var telephone=$("#username").val();
        var check= register.checkPhone(telephone);
        var btn=$(".getCode");
        if(check){
            var obj={};
            obj.phone = telephone;
            $.ajax({
                url: "/users/getSMSCode",
                type: "POST",
                data: obj,
                success: function (data) {
                    var a = eval('(' + data + ')');
                    if(a.status == "000"){
                        btn.off("click");
                        var time;
                        var last=59;
                        btn.text("60秒后重新发送");
                        if(time){
                            clearInterval(time);
                        }
                        time=setInterval(function(){
                            btn.text(last+"秒后重新发送");
                            last--;
                            if(!last){
                                clearInterval(time);
                                btn.text("重新发送");
                                btn.on("click",register.sendPhone);
                            }
                        },1000)
                    }
                }
            });
        }
    },
    checkPhone:function(telephone){

        if( telephone .match(window.phoneValidate)){
            return true;
        }else{
            return false;
        }
    },
    send:function(){
        $(".login_btn").on("click",function(){
            var check=register.checkAll();

            if(check){
                $.ajax({

                })
            }
        })
    },
    checkAll:function(){
        var phone=$("#username").val();
        var code=$("#code").val();
        var password=$("#password").val();
        var pswRe=$("#passwordRepeat").val();
        var agree=$(".login_ctr input").prop("checked");

        if(!phone  ||  !phone.match(window.phoneValidate)){
            alert("手机号格式不对");
            return false;
        }

        if(!code || !code.match(window.codeValidate)){
            alert("验证码格式不对");
            return false;
        }


        if(!password  ||  !password.match(window.passwordValidate)){
            alert("请输入以字母开头的6-20位密码");
            return false;
        }

        if(!pswRe || !pswRe.match(window.passwordValidate)){
            alert("请输入以字母开头的6-20位密码");
            return false;
        }

        if(password != pswRe){
            alert("两次密码输入不一致");
            return false;
        }

        if(!agree){
            alert("请选择同意功夫医生用户协议");
            return false;
        }

        return true;
    }
};






















