$(function(){
    getCase();
});
//获取病例列表
function getCase(){
    var str="";
    str+="<div class='filter_ctr h110'>";
    str+="<div class='item clr'><div class='tt'>添加时间：</div><div id='startTime' class='select kfTimePicker' data-model='noweek'></div><div class='tt'>至</div><div class='select kfTimePicker'></div></div>";
    str+="<div class='item cll'><div class='tt'>最近诊断：</div><div id='endTime' data-itemmax='10' class='select kfselect '><div class='kfselectValue noBg'>--- 请选择 ---</div><div class='kfselectCtn'>";
    str+="<div class='kfselectItem'>当天</div>";
    str+="<div class='kfselectItem'>三天以内</div>";
    str+="<div class='kfselectItem'>本周</div>";
    str+="</div></div></div>";
    str+="<div class='btn cancel mr10'>清&nbsp;&nbsp;空</div>";
    str+="<div class='btn search mr20'>确&nbsp;&nbsp;定</div>";
    str+="</div>";
    str+="<div class='filter_list'>";
    str+="<div class='tt'>";
    str+="<div class='item'>姓名</div><div class='item'>性别</div><div class='item'>联系电话</div><div class='item'>最近就诊日期</div><div class='item'>操作</div>";
    str+="</div>";
    str+="<div class='ctn'>";
    str+="</div>";
    str+="</div>";
    $(".work").append(str);
    kfTimePicker();
    getCaseList();

    $(".work .filter_ctr .cancel").click(function(){
        $(".work .filter_list .ctn").html("");
    });
    $(".work .filter_ctr .search").click(function(){
        getCaseList();
    });
}

//获取病例列表
function  getCaseList(){
    var obj={};
    $(".filter_list .ctn").empty();
    $.ajax({
        url:"/users/getFriendList",
        type:"POST",
        data:obj,
        success:function(data){
            var a=eval("("+data+")");
            var str="";
            for(var i in a.friendList){
                if(a.friendList[i][0].status){
                    for(var j=0;j<a.friendList[i].length;j++){
                        str+="<div class='row' data-id='"+a.friendList[i][j].friendUserId+"' data-bookid='"+a.friendList[i][j].bookId+"'>";
                        str+="<div class='item'>"+a.friendList[i][j].friendName+"</div>";
                        if(a.friendList[i][j].friendType == 0){
                            str+="<div class='item'>男</div>";
                        }else if(a.friendList[i][j].friendType == 1){
                            str+="<div class='item'>女</div>";
                        }
                        str+="<div class='item'>"+a.friendList[i][j].mobile+"</div>";
                        if(a.friendList[i][j].visitDate){
                            str+="<div class='item'>"+a.friendList[i][j].visitDate+"</div>";
                        }else{
                            str+="<div class='item'>尚无就诊记录</div>";
                        }
                        str+="<div class='item'><div class='addVisit'>新增就诊</div></div>";
                        str+="</div>";
                    }
                }
            }
            $(".work .filter_list .ctn").append(str);

            $(".work .filter_list .ctn .row").each(function(){
                var row=$(this);
                row.click(function(){
                    var id=$(this).data("bookid");
                    getCareDetail(id);
                });
                row.find(".addVisit").click(function(e){
                    e.stopPropagation();
                    window.location.href="/index/creatRecord?id="+row.data("id");
                });
            });
        }
    });
}

//获取列表详情
function getCareDetail(id){
    var obj={};
    obj.id=id;
    $.ajax({
        url:"/users/medicalList",
        type:'POST',
        data:obj,
        success:function(data){
            var a=eval('( '+data+' )');
            $(".model .basic_info .ctn").html("");
            $(".model .vis_info .ctn").html("");
            for(var i=0;i<a.medicalList.length;i++){
                var medicalId={};
                medicalId.id=a.medicalList[i].medicalId;
                $.ajax({
                    url:"/users/medicalBookDetail",
                    type:"POST",
                    data:medicalId,
                    success:function(data){
                        var b=eval('( '+data+' )');
                        if(b.medical){
                            var str="";
                            var vis="";
                            /*
                            str+="<div class='item'>患者姓名："+ b.medical.realName+"</div>";
                            str+="<div class='item red'>*&nbsp;过敏史：无</div>";
                            if(data.headImg){
                                str+="<img src='"+data.headImg+"'/>";
                            }else{
                                str+="<img src='images/common/defalutHeadImg.png' />";
                            }
                            str+="<div class='item'>出生日期：1990/07/29</div>";
                            if(a.medicalBook.gender == 1){
                                str+="<div class='item'>性别：女</div>";
                            }else if(a.medicalBook.gender == 0){
                                str+="<div class='item'>性别：男</div>";
                            }
                            str+="<div class='item'>年龄：18</div>";
                            str+="<div class='item'>联系方式："+a.medicalBook.phone+"</div>";

                            vis+="</div>";*/

                            vis+="<div class='basicInfo'><div style='margin-right:140px;' class='fl'></div><div class='fl'>XXX医生</div></div>";
                            vis+="<div class='block_form_ctn'>";
                            vis+="<div class='item'><div class='item_tt'>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;诉：</div>";
                            vis+="<div class='item_input'>";
                            vis+="<div>"+b.medical.complaint+"</div>";
                            vis+="</div></div>";
                            vis+="<div class='item'><div class='item_tt'>现&nbsp;病&nbsp;史：</div>";
                            vis+="<div class='item_input'>";
                            vis+="<div>"+b.medical.historyPresentIllness+"</div>";
                            vis+="</div></div>";
                            vis+="<div class='item'><div class='item_tt'>既往病史：</div>";
                            vis+="<div class='item_input'>";
                            vis+="<div>"+b.medical.historyPastIllness+"</div>";
                            vis+="</div></div>";
                            vis+="<div class='item'><div class='item_tt'>检&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查：</div>";
                            vis+="<div class='item_input'>";
                            vis+="<div class='img'>";
                            var inspectNo=b.medical.inspectNo.split(",");
                            vis+="<div class='lt'>"+inspectNo[0]+"</div>";
                            vis+="<div class='rt'>"+inspectNo[1]+"</div>";
                            vis+="<div class='lb'>"+inspectNo[2]+"</div>";
                            vis+="<div class='rb'>"+inspectNo[3]+"</div>";
                            vis+="</div>";
                            vis+="<div  class='editer w80 fr'>"+b.medical.inspect+"</div>";
                            vis+="</div></div>";
                            vis+="<div class='item'><div class='item_tt'>辅助检查：</div>";
                            vis+="<div class='item_input'>";
                            vis+="<div class='img'>";
                            var assistantInspectNo=b.medical.assistantInspectNo.split(",");
                            vis+="<div class='lt'>"+assistantInspectNo[0]+"</div>";
                            vis+="<div class='rt'>"+assistantInspectNo[1]+"</div>";
                            vis+="<div class='lb'>"+assistantInspectNo[2]+"</div>";
                            vis+="<div class='rb'>"+assistantInspectNo[3]+"</div>";
                            vis+="</div>";
                            vis+="<div class='editer w80 fr'>"+b.medical.assistantInspect+"</div>";
                            vis+="</div></div>";
                            vis+="<div class='item'><div class='item_tt'>诊&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;断：</div>";
                            vis+="<div class='item_input'>";
                            vis+="<div class='img'>";
                            var diagnosisNo=b.medical.diagnosisNo.split(",");
                            vis+="<div class='lt'>"+diagnosisNo[0]+"</div>";
                            vis+="<div class='rt'>"+diagnosisNo[1]+"</div>";
                            vis+="<div class='lb'>"+diagnosisNo[2]+"</div>";
                            vis+="<div class='rb'>"+diagnosisNo[3]+"</div>";
                            vis+="</div>";
                            vis+="<div class='editer w80 fr'>"+b.medical.diagnosis+"</div>";
                            vis+="</div></div>";
                            vis+="<div class='item'><div class='item_tt'>治疗计划：</div>";
                            vis+="<div class='item_input'>";
                            vis+="<div class='img'>";
                            var treatmentPlanNo=b.medical.treatmentPlanNo.split(",");
                            vis+="<div class='lt'>"+treatmentPlanNo[0]+"</div>";
                            vis+="<div class='rt'>"+treatmentPlanNo[1]+"</div>";
                            vis+="<div class='lb'>"+treatmentPlanNo[2]+"</div>";
                            vis+="<div class='rb'>"+treatmentPlanNo[3]+"</div>";
                            vis+="</div>";
                            vis+="<div class='editer w80 fr'>"+b.medical.treatmentPlan+"</div>";
                            vis+="</div></div>";
                            vis+="<div class='item'><div class='item_tt'>治&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;疗：</div>";
                            vis+="<div class='item_input'>";
                            vis+="<div class='img'>";
                            var treatmentNo=b.medical.treatmentNo.split(",");
                            vis+="<div class='lt'>"+treatmentNo[0]+"</div>";
                            vis+="<div class='rt'>"+treatmentNo[1]+"</div>";
                            vis+="<div class='lb'>"+treatmentNo[2]+"</div>";
                            vis+="<div class='rb'>"+treatmentNo[3]+"</div>";
                            vis+="</div>";
                            vis+="<div class='editer w80 fr'>"+b.medical.treatment+"</div>";
                            vis+="</div></div>";
                            vis+="<div class='item'><div class='item_tt'>医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;嘱：</div>";
                            vis+="<div class='item_input'>";
                            vis+="<div class='editer'>"+b.medical.orders+"</div>";
                            vis+="</div></div>";
                            vis+="</div>";
                            $(".model .basic_info .ctn").append(str);
                            $(".model .vis_info .ctn").append(vis);
                            $(".model_shadow").show();
                            $(".model").show();
                            $(".model .tools .addRecord").click(function(){
                                $(".model").hide();
                                $(".model_shadow").hide();
                                addVisit(id);
                            });
                        }else{
                            alert("目前没有病例")
                        }
                    }
                })
            }
        }
    });

    $(".model .model_close div").click(function(){
        $(".model_shadow").hide();
        $(".model").hide();

    });
}

