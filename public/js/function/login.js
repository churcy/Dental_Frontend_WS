$(function(){
    login.init();
});

var login={
    init:function(){
        $(document).keydown(function(e){
            if(e.keyCode == 13){
                $(".login_btn").click();
            }
        });
        $(".functionBtn").on("click",function(){
            var statu=login.checkLogin();
            console.log(statu);
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
                        $(".functionBlockText").removeClass("functionBlockTextError").next().hide();
                        if(a.status == "02008"){
                            $("#username").addClass("functionBlockTextError").next().show();
                            $("#password").addClass("functionBlockTextError").next().show();
                        }else if(a.status == "02009"){
                            $("#username").addClass("functionBlockTextError").next().show();
                            $("#password").addClass("functionBlockTextError").next().show();
                        }else if(a.status == "000"){
                            if(!a.doctorId){
                                alert("您的医师资格还没有认证，请在app上认证之后再行登录");
                                return false;
                            }else{
                                $.cookie("dockflogin","true",{ expires:7, path: '/'});
                                $.cookie("accountId",a.accountId,{ expires:7, path: '/'});
                                $.cookie("doctorId", a.doctorId,{ expires:7, path: '/'});
                                $.cookie("userId",a.userId,{ expires:7, path: '/'});
                                $.cookie("name",a.realName,{ expires:7, path: '/'});
                                console.log($.cookie("userId"))
                                window.location.href="/index";
                            }
                        }
                    }
                });
            }
        });
    },
    checkLogin:function(){
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
};










