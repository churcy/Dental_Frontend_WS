$(function(){
    login();
});
function login(){
    $(document).keydown(function(e){
        if(e.keyCode == 13){
            $(".login_btn").click();
        }
    });
    $(".login_btn").on("click",function(){
        var statu=checkLogin();
        var obj={};
        obj.uid=$("#username").val();
        obj.psw=$("#password").val();
        if(statu){
            $.ajax({
                type:"POST",
                data:obj,
                url:"/users/login",
                success:function(data){
                    var a = eval('(' + data + ')');
                    if(a.status == "02008"){
                        alert("密码错误")
                    }else if(a.status == "02009"){
                        alert("账号不存在")
                    }else if(a.status == 000){
                        $.cookie("dockflogin","true",{ expires:0.5, path: '/'});
                        $.cookie("uid",obj.uid,{ expires:0.5, path: '/'});
                        if(!a.doctorId){
                            alert("您的医师资格还没有认证，请在app上认证之后再行登录")
                            return false;
                        }
                        $.cookie("dId",a.doctorId,{ expires:0.5, path: '/'});
                        if($(".login_ctr").find("input").is(':checked')){
                            $.cookie("psw",obj.psw,{ expires:0.5, path: '/'});
                        }else{
                            $.cookie("psw",null);
                        }
                        obj.accountId= a.accountId;
                        $.cookie("accountId",obj.accountId,{ expires:0.5, path: '/'});
                        $.ajax({
                            type:"POST",
                            data:obj,
                            url:"/users/queryUserInfo",
                            success:function(data){
                                var b=eval('(' + data + ')');
                                $.cookie("name", b.userInfo.realName,{ expires:0.5, path: '/'});
                                $.cookie("doctorId",b.userInfo.id,{ expires:0.5, path: '/'});
                                window.location.href="/index";
                            }
                        });
                    }
                }
            });
        }
    });
}




function checkLogin(){
    var statu=true;

    var username=$("#username").val();

    var password=$("#password").val();

    if(!username){
        statu=false;
    }

    if(!password){
        statu=false;
    }

    return statu;
}









