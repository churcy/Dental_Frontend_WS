$(function(){
    initPage();
    keepLogin();
    basicInfo();
    linkWay();
    changeHead();
    noticeAlert();
    changePassWord();
    changePhone();
    addHelper();
    accountManagement();
    changeSign();
    leftCtr();
});

//根据传参初始化界面
function initPage(){
    if(window.urlData.statu){
        if(window.urlData.statu == "userInfo"){
            $(".leftCtr .block").eq(0).find(".item").eq(0).addClass("checked");
            getBasicInfo();
        }else if(window.urlData.statu == "set"){
            $(".leftCtr .block").eq(1).find(".item").eq(0).addClass("checked");
            getNoticeAlert();

        }else if(window.urlData.statu == "addUser"){
            $(".leftCtr .block").eq(2).find(".item").eq(0).addClass("checked");
            getAddHelper();
        }
    }else{
        $(".leftCtr .block").eq(0).find(".item").eq(0).addClass("checked");
        getBasicInfo();
    }
}

//个人中心左侧菜单栏变色
function leftCtr(){
    $(".leftCtr .item").click(function(){
        $(".leftCtr  .item").removeClass("checked");
        $(this).addClass("checked")
    });
}
//基本信息
function basicInfo(){
    $(".basicInfo").click(function(){
        if(!$(this).hasClass("checked")){
            $(".rightCtn").html("");
            getBasicInfo();
        }
    });
}

//联系方式
function linkWay(){
    $(".linkWay").click(function(){
        if(!$(this).hasClass("checked")){
            $(".rightCtn").html("");
            getLinkWayInfo();
        }
    });
}
//修改头像
function changeHead(){
    $(".changeHead").click(function(){
        if(!$(this).hasClass("checked")){
            $(".rightCtn").html("");
            getChangeHead();
        }
    });
}
//修改基本信息
function getBasicInfo(){
    var str="";
    str+="<div class='block'>";
    str+="<div class='tt'>基本资料</div>";
    str+="<div class='item'><div class='left'><span class='red'>*</span>姓名：</div><div class='right'><input id='docName' class='text' type='text' /></div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span>性别：</div><div class='right'><input type='radio' name='sex' value='man' />&nbsp;男&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' name='sex' value='woman' />&nbsp;女</div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span>生日：</div><div class='right'><select id='birthday' class='select'></select></div></div>";
    str+="<div class='item'><div class='left'><span class='red'>*</span>科室：</div><div class='right'><select id='department' class='select'></select></div></div>";
    str+="<div class='item'><div class='left'><span class='red'>*</span>职位：</div><div class='right'><select id='position' class='select'></select></div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span>个人说明：</div><div class='right'><textarea></textarea></div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span></div><div class='right'><div class='btn submit'>确定</div><div class='btn clear'>清空</div></div></div>";
    str+="</div>";
    $(".rightCtn").append(str);
    var obj={};
    $.ajax({
        url:"/users/physicianDetail",
        type:"POST",
        data:obj,
        success:function(data){
            var a = eval('(' + data + ')');
            $("#docName").val(a.physicianInfo.doctorName);
            $("#birthday").append("<option>"+a.physicianInfo.birthday+"</option>")
            $("#department").append("<option>"+a.physicianInfo.departmentName+"</option>");
            $("#position").append("<option>"+a.physicianInfo.positionName+"</option>");
        }
    });

    $(".submit").on("click",function(){
        $.ajax({
            url:"/users/setUserInfo",
            type:"POST",
            data:obj,
            success:function(data){
                alert(data)
            }
        });
    })
}

//获取联系方式
function getLinkWayInfo(){
    var str="";
    str+="<div class='block'>";
    str+="<div class='tt'>联系方式</div>";
    str+="<div class='item'><div class='left'><span class='red'></span>手机：</div><div class='right'></div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span>邮箱：</div><div class='right'></div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span>微信：</div><div class='right'></div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span>固定电话：</div><div class='right'></div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span>通讯地址：</div><div class='right'></div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span>邮编：</div><div class='right'></div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span>微博：</div><div class='right'></div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span>博客：</div><div class='right'></div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span></div><div class='right'><div class='btn submit'>确定</div><div class='btn clear'>清空</div></div></div>";
    str+="</div>";
    $(".rightCtn").append(str);
}


//修改签名
function getChangeSign(){
    var str="";
    str+="<div class='block'>";
    str+="<div class='tt'>修改签名</div>";
    str+="<div class='item'>上传图片 仅支持JPG、PNG、GIF格式，文件小于3M。</div>";
    str+="<div class='item'>";
    str+="<form id='headImg' method='post' enctype='multipart/form-data' action='http://120.27.194.215:8080/dentalws/uui/setSignature/"+ $.cookie("dId")+"?opt=setSignature' >";
    str+="<div id='preview' class='upload'  >";
    str+="<input id='imgUpload' name='signature'  type='file' />";
    str+="<div class='file_bg'>选择图片</div>";
    str+="</div></div>";
    str+="</form>";
    str+="<div class='item'><div class='right'><button class='btn submit'>确定</button><div class='btn clear'>清空</div></div></div>";
    str+="</div>";
    $(".rightCtn").append(str);

    $("#imgUpload").on("change",function(){
        var file=$("#imgUpload");
        var img=document.getElementById("imgUpload").files[0];
        var src = window.URL.createObjectURL(img);
        var name=img.name;
        var len=name.length;
        var view=false;
        var size=img.size;
        name=name.substr((len-3),len);
        if(size<300000 && (name == "png" || name == "jpg" || name == "gif")){
            view=true;
        }
        if(view){
            $("#preview").css("background","url("+src+")");
            $(".submit").on("click",function(){
                $("#headImg").submit();
            });
            $(".clear").on("click",function(){
                file.after(file.clone().val(""));
                file.remove();
                $("#preview").css("background","rgb(238, 237, 237)");
                $(".submit").off("click");
            })
        }
    });

}
//获取修改头像页面
function getChangeHead(){
    var str="";
    str+="<div class='block'>";
    str+="<div class='tt'>修改头像</div>";
    str+="<div class='item'>上传图片 仅支持JPG、PNG、GIF格式，文件小于3M。</div>";
    str+="<div class='item'>";
    str+="<form id='headImg' method='post' enctype='multipart/form-data' action='http://120.27.194.215:8080/dentalws/uui/userAvatar/"+ $.cookie("accountId")+"?opt=setAvatar' >";
    str+="<div id='preview' class='upload'  >";
    str+="<input id='imgUpload' name='userImg'  type='file' />";
    str+="<div class='file_bg'>选择图片</div>";
    str+="</div></div>";
    str+="</form>";
    str+="<div class='item'><div class='right'><button class='btn submit'>确定</button><div class='btn clear'>清空</div></div></div>";
    str+="</div>";
    $(".rightCtn").append(str);

    $("#imgUpload").on("change",function(){
        var file=$("#imgUpload");
        var img=document.getElementById("imgUpload").files[0];
        var src = window.URL.createObjectURL(img);
        var name=img.name;
        var len=name.length;
        var view=false;
        var size=img.size;
        name=name.substr((len-3),len);
        if(size<300000 && (name == "png" || name == "jpg" || name == "gif")){
            view=true;
        }
        if(view){
            $("#preview").css("background","url("+src+")");
            $(".submit").click(function(){
                $("#headImg").submit();
            })
            $(".clear").on("click",function(){
                file.after(file.clone().val(""));
                file.remove();
                $("#preview").css("background","rgb(238, 237, 237)");
                $(".submit").off("click");
            })
        }
    });
}

//通知提醒
function noticeAlert(){
    $(".noticeAlert").click(function(){
        if(!$(this).hasClass("checked")){
            $(".rightCtn").html("");
            getNoticeAlert();
        }
    });
}
//修改密码
function changePassWord(){
    $(".changePassWord").click(function(){
        if(!$(this).hasClass("checked")){
            $(".rightCtn").html("");
            getChangePassWord();
        }
    });
}
//修改手机号码
function changePhone(){
    $(".changePhone").click(function(){
        if(!$(this).hasClass("checked")){
            $(".rightCtn").html("");
            getChangePhone();
        }
    });
}
function getNoticeAlert(){
    var str="";
    str+="<div class='block'>";
    str+="<div class='tt'>通知提醒</div>";
    str+="<div class='item'><div class='right ml30 mt5'>右下角弹窗提醒</div></div>";
    str+="<div class='item'><div class='left w70'><input class='mr10' type='checkbox' /> 行程提醒</div></div>";
    str+="<div class='item'><div class='left w70'><input class='mr10' type='checkbox' /> 预约提醒</div></div>";
    str+="<div class='line'></div>";
    str+="<div class='item'><div class='right ml30 mt5'>右下角弹窗提醒</div></div>";
    str+="<div class='item'><div class='left w70'><input class='mr10' type='checkbox' /> 行程提醒</div></div>";
    str+="<div class='item'><div class='left w70'><input class='mr10' type='checkbox' /> 预约提醒</div></div>";
    str+="<div class='line'></div>";
    str+="<div class='item'><div class='right ml30 mt5'>右下角弹窗提醒</div></div>";
    str+="<div class='item'><div class='left w70'><input class='mr10' type='checkbox' /> 行程提醒</div></div>";
    str+="<div class='item'><div class='left w70'><input class='mr10' type='checkbox' /> 预约提醒</div></div>";
    str+="<div class='item'><div class='right ml30'><div class='btn submit'>确定</div></div></div>";
    str+="</div>";
    $(".rightCtn").append(str);
}

function getChangePassWord(){
    var str="";
    str+="<div class='block'>";
    str+="<div class='tt'>修改密码</div>";
    str+="<div class='item'><div class='left'><span class='red'>*</span>当前密码：</div><div class='right'><input class='text' type='text' /></div></div>";
    str+="<div class='item'><div class='left'><span class='red'>*</span>新密码：</div><div class='right'><input class='text' type='text' /></div></div>";
    str+="<div class='item'><div class='left'><span class='red'>*</span>确认密码：</div><div class='right'><input class='text' type='text' /></div></div>";
    str+="<div class='item'><div class='left'><span class='red'>*</span>验证码：</div><div class='right'><input class='text' type='text' /></div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span></div><div class='right'><p class='ashy'>输入图中验证码，不区分大小写</p><img class='identifyingCode' src='' /><span class='blue ml10 pointer'>换一张</span></div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span></div><div class='right'><div class='btn submit'>确定</div><div class='btn clear'>清空</div></div></div>";
    str+="</div>";
    $(".rightCtn").append(str);
}


function getChangePhone(){
    var str="";
    str+="<div class='block'>";
    str+="<div class='tt'>更换手机号</div>";
    str+="<div class='item'><div class='left'><span class='red'>*</span>原手机号：</div><div class='right'><input id='orgPhone' class='text' type='text' /></div></div>";
    str+="<div class='item'><div class='left'><span class='red'>*</span>新手机号：</div><div class='right'><input id='phone' class='text' type='text' /><button class='red ml10 pointer getVerificationCode'>获取验证码</button></div></div>";
    str+="<div class='item'><div class='left'><span class='red'>*</span>验证码：</div><div class='right'><input id='smsCode' class='text' type='text' /></div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span></div><div class='right'><div class='btn submit'>确定</div><div class='btn clear'>清空</div></div></div>";
    str+="</div>";
    $(".rightCtn").append(str);

    $(".getVerificationCode").on("click",function(){
        var obj = {};
        obj.phone = $("#phone").val();
        if (!window.phoneValidate.test(obj.phone)) {
            alert("请输入正确的手机号");
        } else {
            $.ajax({
                url: "/users/getSMSCode",
                type: "POST",
                data: obj,
                success: function (data) {
                    var a = eval('(' + data + ')');
                    alert(a.status)
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

    $(".submit").on("click",function(){
        var obj = {};
        obj.phone = $("#phone").val();
        obj.orgPhone=$("#orgPhone").val();
        obj.smsCode=$("#smsCode").val();
        if(window.phoneValidate.test(obj.phone) && window.phoneValidate.test(obj.orgPhone)){
            $.ajax({
                url: "/users/modifyPhone",
                type: "POST",
                data: obj,
                success: function (data) {

                }
            })
        }
    })
}


function addHelper(){
    $(".addHelper").click(function(){
        if(!$(this).hasClass("checked")){
            $(".rightCtn").html("");
            getAddHelper();
        }
    });
}

function accountManagement(){
    $(".accountManagement").click(function(){
        if(!$(this).hasClass("checked")){
            $(".rightCtn").html("");
            getAccountManagement();
        }
    });
}
function getAddHelper(){
    var str="";
    str+="<div class='block'>";
    str+="<div class='tt'>添加助手账户</div>";
    str+="<div class='item'><div class='left'><span class='red'>*</span>账户：</div><div class='right'><input class='text' type='text' /></div></div>";
    str+="<div class='item'><div class='left'><span class='red'>*</span>登录密码：</div><div class='right'><input class='text' type='text' /></div></div>";
    str+="<div class='item'><div class='left'><span class='red'>*</span>确认密码：</div><div class='right'><input class='text' type='text' /></div></div>";
    str+="<div class='item'><div class='left'><span class='red'>*</span>姓名：</div><div class='right'><input class='text' type='text' /></div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span>性别</div><div class='right'><input type='radio' name='sex' value='man' />&nbsp;男&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' name='sex' value='woman' />&nbsp;女</div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span>科室</div><div class='right'><select class='select'></select></div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span>职务</div><div class='right'><select class='select'></select></div></div>";
    str+="<div class='item'><div class='left'><span class='red'></span></div><div class='right'><div class='btn submit'>确定</div><div class='btn clear'>清空</div></div></div>";
    str+="</div>";
    $(".rightCtn").append(str);
}

function getAccountManagement(){
    var str="";
    str+="<div class='block'>";
    str+="<div class='tt'>账户管理</div>";
    str+="<div class='item'>";
    str+="<div class='accountList'>";
    str+="<div class='accountListItem'><div class='fl'><input type='checkbox' />账户A</div><div class='fr pointer blue'>编辑权限</div><div class='accountListItemBox'><div class='accountListItemBoxItem'><input type='checkbox' />允许查看行程</div><div class='accountListItemBoxItem'><input type='checkbox' />允许查看预约</div><div class='accountListItemBoxItem'><input type='checkbox' />允许增加回访纪录</div><div class='accountListItemBoxItem'><input type='checkbox' />允许查看病例</div><div class='accountListItemBoxItem'><input type='checkbox' />允许新增预约</div><div class='accountListItemBoxItem'><input type='checkbox' />全选</div><div class='accountListItemBoxItem'><div class='btn store'>保存</div><div class='btn close'>关闭</div></div></div></div>";
    str+="<div class='accountListItem'><div class='fl'><input type='checkbox' />账户B</div><div class='fr pointer blue'>编辑权限</div><div class='accountListItemBox'><div class='accountListItemBoxItem'><input type='checkbox' />允许查看行程</div><div class='accountListItemBoxItem'><input type='checkbox' />允许查看预约</div><div class='accountListItemBoxItem'><input type='checkbox' />允许增加回访纪录</div><div class='accountListItemBoxItem'><input type='checkbox' />允许查看病例</div><div class='accountListItemBoxItem'><input type='checkbox' />允许新增预约</div><div class='accountListItemBoxItem'><input type='checkbox' />全选</div><div class='accountListItemBoxItem'><div class='btn store'>保存</div><div class='btn close'>关闭</div></div></div></div>";
    str+="</div>";
    str+="</div>";
    str+="<div class='item'><div class='right ml30'><div class='btn submit'>确定</div></div></div>";
    str+="</div>";
    $(".rightCtn").append(str);

    $(".accountList .accountListItem").each(function(){
        $(this).find(".fr").click(function(){
            if($(this).parents(".accountListItem").height() == 35){
                $(this).parents(".accountListItem").css("height","auto");
            }else{
                $(this).parents(".accountListItem").css("height","35px");
            }
        });
    });

    $(".accountList .accountListItem").each(function(){
        $(this).find(".close").click(function(){
            if($(this).parents(".accountListItem").height() == 35){
                $(this).parents(".accountListItem").css("height","auto");
            }else{
                $(this).parents(".accountListItem").css("height","35px");
            }
        });
    });

}
function changeSign(){
    $(".changeSign").click(function(){
        if(!$(this).hasClass("checked")){
            $(".rightCtn").html("");
            getChangeSign();
        }
    });
}

















