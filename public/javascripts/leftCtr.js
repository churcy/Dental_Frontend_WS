$(function(){
    keepLogin();
    schedulingProgram();
    fullSchedule();
    caseManage();
    travelManagement();
    setAppointmentTime();
    viewAppointment();
    new_schedule();
    reservationManagement();
    newReservation();
    viewTravel();
    patientsReturnVisit();
    answerOnline();
    browsingProblem();
    answeredQuestion();
});

//病例管理
function caseManage(){
    $(".case_manage").click(function(){
        if(!$(this).hasClass("list_item_checked")){
            clearLeftList();
            getCase();
        }
    });
}





//创建某个病历本的新就诊纪录
function addVisit(id){
    var obj={};
    obj.id=id;
    $.ajax({
        url:"/users/addVisit",
        type:"POST",
        data:obj,
        success:function(data){
            clearWork();
            var str="";
            str+="<div class='block'>";
            str+="<div class='block_ctr'>";
            str+="<div class='block_btn block_btn02 cancel_record'>取消</div><div class='block_btn store_record'>保存</div>";
            str+="</div>";
            str+="</div>";
            str+="<div class='block'>";
            str+="<div class='block_form'>";
            str+="<div class='block_form_tt pt10'><div>患者就诊信息</div></div>";
            str+="<div class='block_form_ctn'>";
            str+="<div class='item'><div class='item_tt'>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;诉：</div><div class='item_input'><input id='complaint' class='text' type='text' /></div></div>";
            str+="<div class='item'><div class='item_tt'>现&nbsp;病&nbsp;史：</div><div class='item_input'><textarea id='historyPresentIllness' class='text row3'></textarea></div></div>";
            str+="<div class='item'><div class='item_tt'>既往病史：</div><div class='item_input'><textarea id='historyPastIllness' class='text row2'></textarea></div></div>";
            str+="<div class='item'><div class='item_tt'>检&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查：</div><div class='item_input'><div class='box'><div id='inspectNo' class='img'><div class='br bt' contenteditable='true'></div><div class='bt' contenteditable='true'></div><div class='br' contenteditable='true'></div><div class='' contenteditable='true'></div></div><div id='inspect' class='editer' contenteditable='true'></div></div></div></div>";
            str+="<div class='item'><div class='item_tt'>辅助检查：</div><div class='item_input'><div class='box'><div id='assistantInspectNo' class='img'><div  class='br bt' contenteditable='true'></div><div class='bt' contenteditable='true'></div><div class='br' contenteditable='true'></div><div class='' contenteditable='true'></div></div><div id='assistantInspect'  class='editer' contenteditable='true'></div></div></div></div>";
            str+="<div class='item'><div class='item_tt'>诊&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;断：</div><div class='item_input'><div class='box'><div id='diagnosisNo' class='img'><div class='br bt' contenteditable='true'></div><div class='bt' contenteditable='true'></div><div class='br' contenteditable='true'></div><div class='' contenteditable='true'></div></div><div id='diagnosis' class='editer' contenteditable='true'></div></div></div></div>";
            str+="<div class='item'><div class='item_tt'>治疗计划：</div><div class='item_input'><div class='box'><div id='treatmentPlanNo' class='img'><div class='br bt' contenteditable='true'></div><div class='bt' contenteditable='true'></div><div class='br' contenteditable='true'></div><div class='' contenteditable='true'></div></div><div id='treatmentPlan' class='editer' contenteditable='true'></div></div></div></div>";
            str+="<div class='item'><div class='item_tt'>治&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;疗：</div><div class='item_input'><div class='box'><div id='treatmentNo' class='img'><div class='br bt' contenteditable='true'></div><div class='bt' contenteditable='true'></div><div class='br' contenteditable='true'></div><div class='' contenteditable='true'></div></div><div id='treatment' class='editer' contenteditable='true'></div></div></div></div>";
            str+="</div>";
            str+="</div>";
            str+="</div>";
            str+="<div class='revisit'>";
            str+="加入待回访列表：<input type='radio' checked='checked' name='revisit' value='1' />是<input type='radio' name='revisit' value='0' />否"
            str+="</div>";
            str+="<div class='orderRevisit rebackDate'>";
            str+="<div class='fl'>预定回访时间：</div><div class='kfTimePicker'></div>";
            str+="</div>";
            str+="<div class='orderRevisit nextVisitDate'>";
            str+="<div class='fl'>下次就诊时间：</div><div class='kfTimePicker'></div>";
            str+="</div>";
            str+="<div class='doc'>";
            str+="主治医生：<img src='images/common/sign.png' />";
            str+="</div>";
            $(".work").append(str);
            kfTimePicker();
            $(".work .revisit input[value='1']").click(function(){
                $(".rebackDate").show();
            });
            $(".work .revisit input[value='0']").click(function(){
                $(".rebackDate").hide();
            });

            $(".cancel_record").click(function(){
                getCase();
            });
        }
    });
}




//日程安排
function schedulingProgram(){
    clearLeftList();
    $(".schedulingProgram").click(function(){
        var a=$(this).nextUntil(".list_item");
        a.each(function(){
            if($(this).hasClass("list_item_sec")){
                $(this).show();
            }
        });
    });
}







//预约管理
function reservationManagement(){
    $(".reservationManagement").click(function(){
        if(!$(this).hasClass("list_item_checked")){
            $(".list .list_item_thd").hide();
            $(this).nextUntil(".list_item").show();
        }
    });
}


//查看预约
function viewAppointment(){
    $(".viewAppointment").click(function(){
        if(!$(this).hasClass("list_item_checked")){
            clearWork();
            getScheduleCtr("order");
        }
    });
}
//新增预约
function newReservation(){
    $(".newReservation").click(function(){
        if(!$(this).hasClass("list_item_checked")){
            clearWork();
            var str="";
            str+="<div class='block'>";
            str+="<div class='block_ctr'>";
            str+="<div class='block_btn block_btn02'>取消</div>";
            str+="<div class='block_btn'>保存</div>";
            str+="</div>";
            str+="</div>";
            str+="<div class='block'>";
            str+="<div class='block_form'>";
            str+="<div class='block_form_tt'><div>患者基本信息</div></div>";
            str+="<div class='block_form_ctn'>";
            str+="<div class='item_half'><div class='item_tt'>患者姓名：</div><div class='item_input'><input class='text' type='text' /></div></div>";
            str+="<div class='item_half'><div class='item_tt red'>*&nbsp;过敏史：</div><div class='item_input'><input class='text' type='text' /></div></div>";
            str+="<div class='item_half'><div class='item_tt'>出生日期：</div><div class='item_input'><div data-itemmax='5' data-wt='60' class='kfselect year mr10 mt5 fl'><div class='kfselectValue'></div><div class='kfselectCtn'><div class='kfselectItem'>2016</div></div></div><div data-itemmax='5' data-wt='54' class='kfselect year mr10 mt5 fl'><div class='kfselectValue'></div><div class='kfselectCtn'><div class='kfselectItem'>01</div></div></div><div data-itemmax='5' data-wt='60' class='kfselect year mr10 mt5 fl'><div class='kfselectValue'></div><div class='kfselectCtn'><div class='kfselectItem'>15</div></div></div></div></div>";
            str+="<div class='item_half'><div class='item_tt'>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</div><div class='item_input'><input class='radio' type='radio' value='man' name='sex' />男<input class='radio' value='woman' type='radio' name='sex' />女</div></div>";
            str+="<div class='item_half'><div class='item_tt'>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：</div><div class='item_input'><input class='text' type='text' /></div></div>";
            str+="<div class='item_half'><div class='item_tt'>联系方式：</div><div class='item_input'><input class='text' type='text' /></div></div>";
            str+="</div>";
            str+="</div>";
            str+="</div>";
            str+="<div class='block'>";
            str+="<div class='block_form'>";
            str+="<div class='block_form_tt'><div>患者预约信息</div></div>";
            str+="<div class='block_form_ctn'>";
            str+="<div class='item'><div class='item_tt'>预约医生：</div><div class='item_input w40'>";
            str+="<div class='kfselect blockSelect'><div class='kfselectValue'>--- 请选择 ---</div><div class='kfselectCtn'><div class='kfselectItem'>当天</div><div class='kfselectItem'>每天</div><div class='kfselectItem'>工作日</div></div></div>";
            str+="</div></div>";
            str+="<div class='item'><div class='item_tt'>预约时段：</div><div class='item_input  w40 kfTimePicker'></div></div>";
            str+="<div class='item'><div class='item_tt'>预约事项：</div><div class='item_input'>";
            str+="<div class='checkbox_item'><input type='checkbox' />补牙</div>";
            str+="<div class='checkbox_item'><input type='checkbox' />拔牙</div>";
            str+="<div class='checkbox_item'><input type='checkbox' />拆线</div>";
            str+="<div class='checkbox_item'><input type='checkbox' />换药</div>";
            str+="<div class='checkbox_item'><input type='checkbox' />牙周上药</div>";
            str+="<div class='checkbox_item'><input type='checkbox' />备牙</div>";
            str+="<div class='checkbox_item'><input type='checkbox' />牙周刮治</div>";
            str+="<div class='checkbox_item'><input type='checkbox' />戴牙</div>";
            str+="<div class='checkbox_item'><input type='checkbox' />根冲</div>";
            str+="<div class='checkbox_item'><input type='checkbox' />加力</div>";
            str+="<div class='checkbox_item'><input type='checkbox' />手术</div>";
            str+="<div class='checkbox_item'><input type='checkbox' />其它<div contenteditable='true'></div></div>";
            str+="</div></div";
            str+="<div class='item'><div class='item_tt'>预约备注：</div><div class='item_input'><textarea class='text row3'></textarea></div>";
            str+="</div>";
            str+="</div>";
            str+="</div>";
            $(".work").append(str);
            kfTimePicker();
        }
    });
}

//患者回访
function patientsReturnVisit(){
    if(!$(this).hasClass("list_item_checked")){
        $(".patientsReturnVisit").click(function(){
            clearWork();
            clearLeftList();
            getReturnVisitCtr();
        });
    }
}



//获取创建新回访的界面
function getNewReturnVisit(){
    var str="";
    str+="<div class='block'>";
    str+="<div class='block_ctr'>";
    str+="<div class='block_btn block_btn02'>取消</div>";
    str+="<div class='block_btn'>保存</div>";
    str+="</div>";
    str+="</div>";
    str+="<div class='block'>";
    str+="<div class='block_form'>";
    str+="<div class='block_form_tt tab_ctr'><div class='basicInfo'>患者基本信息</div><div class='unChecked reVisitReword'>回访记录</div></div>";
    str+="<div class='block_form_ctn tab_ctn'>";
    str+="<div class='item_half'><div class='item_tt'>患者姓名：</div><div class='item_input'>阿森纳</div></div>";
    str+="<div class='item_half'><div class='item_tt red'>*&nbsp;过敏史：</div><div class='item_input'>无</div></div>";
    str+="<div class='item_half'><div class='item_tt'>出生日期：</div><div class='item_input'>4444-44-44</div></div>";
    str+="<div class='item_half'><div class='item_tt'>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</div><div class='item_input'>男</div></div>";
    str+="<div class='item_half'><div class='item_tt'>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：</div><div class='item_input'>108</div></div>";
    str+="<div class='item_half'><div class='item_tt'>联系方式：</div><div class='item_input'>112233</div></div>";
    str+="</div>";
    str+="</div>";
    str+="</div>";
    str+="<div class='block'>";
    str+="<div class='block_form'>";
    str+="<div class='block_form_tt'><div>患者回访信息</div></div>";
    str+="<div class='block_form_ctn'>";
    str+="<div class='item'><div class='item_tt'>回访日期：</div><div class='item_input  w40 kfTimePicker'></div></div>";
    str+="<div class='item'><div class='item_tt'>回访人员：</div><div class='item_input w40'>";
    str+="<div class='kfselect blockSelect'><div class='kfselectValue'></div><div class='kfselectCtn'><div class='kfselectItem'>当天</div><div class='kfselectItem'>每天</div><div class='kfselectItem'>工作日</div></div></div>";
    str+="</div></div>";
    str+="<div class='item'><div class='item_tt'>回访内容：</div><div class='item_input'><textarea class='text row3'></textarea></div>";
    str+="<div class='item'><div class='item_tt'>回访结果：</div><div class='item_input'><textarea class='text row3'></textarea></div>";
    str+="</div>";
    str+="</div>";
    str+="</div>";
    $(".work").append(str);
    kfTimePicker();
    $(".basicInfo").click(function(){
        if($(this).hasClass("unChecked")){
            $(".work .block .block_form .tab_ctr").addClass("unChecked");
            $(this).removeClass("unChecked");
            $(".work .block .block_form .tab_ctn").html("");
            var str="";
            str+="<div class='item_half'><div class='item_tt'>患者姓名：</div><div class='item_input'>阿森纳</div></div>";
            str+="<div class='item_half'><div class='item_tt red'>*&nbsp;过敏史：</div><div class='item_input'>无</div></div>";
            str+="<div class='item_half'><div class='item_tt'>出生日期：</div><div class='item_input'>4444-44-44</div></div>";
            str+="<div class='item_half'><div class='item_tt'>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</div><div class='item_input'>男</div></div>";
            str+="<div class='item_half'><div class='item_tt'>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：</div><div class='item_input'>108</div></div>";
            str+="<div class='item_half'><div class='item_tt'>联系方式：</div><div class='item_input'>112233</div></div>";
            $(".work .block .block_form .tab_ctn").append(str);
        }
    });

    $(".reVisitReword").click(function(){
        $(".work .block .block_form .tab_ctr div").addClass("unChecked");
        $(this).removeClass("unChecked");
        $(".work .block .block_form .tab_ctn").html("");
        var str="";
        str+="<div class='returnVisitList border-top'>";
        str+="<div class='returnVisitList_tt'><div class='row'><div class='item01'>姓名</div><div class='item02'>回访人</div><div class='item03'>回访日期</div><div class='item04'>预定回访日期</div><div class='item05'>操作</div></div></div>";
        str+="<div class='returnVisitList_ctn'></div>";
        $(".work .block .block_form .tab_ctn").append(str);
        getReturnVisitDetail();
    });
}











