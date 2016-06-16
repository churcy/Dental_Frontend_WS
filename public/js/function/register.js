$(function(){
    tools. kfselect();
    regTab();
    register.getCode();
    register.send();
});

function regTab(){
    $(".functionBlockradio").on("click",function(){
        $(".functionBlockradio").removeClass("functionBlockradioAcitve");
        $(this).addClass("functionBlockradioAcitve");
    })
}

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
            var statu=login.checkLogin();
            console.log(statu);
            var obj={};
            obj.uid=$("#username").val();
            obj.yzm=$("#identifying").val();
            obj.psw=$("#password").val();
            obj.psw1=$("#passwordSure").val();
            obj.xieyi=$("#xieyiBnt").val();

        });
    },
}

$(function(){
    $(".protocol").on("click",function(){
        $(".shadow,.model").show();
    });

    $(".modelHd .modelHdClose,.modelBtn>a").on("click",function(){
        $(".shadow,.model").hide();
    });
})