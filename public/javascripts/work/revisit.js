$(function(){
    getReturnVisitCtr();

});

//获取回访的控制台
function getReturnVisitCtr(){
    var str="";
    str+="<div class='filter_ctr'>";
    str+="<div class='item'><div class='tt'>回访时间：</div>";
    str+="<div class='select start kfTimePicker'></div>";
    str+="<div class='tt'>至</div>";
    str+="<div class='select end kfTimePicker'></div>";
    str+="</div>";
    str+="<div class='cll item radio_box'><input type='radio' name='returnVisitStatu' value='returnVisited' />已回访<input type='radio' name='returnVisitStatu' value='waitForReturnVisit' />待回访<input type='radio' name='returnVisitStatu' value='waitForHandle' />待跟进<input type='radio' name='returnVisitStatu' value='all' />全部</div>";
    str+="<div class=' btn search  '>确定</div>";
    str+="<div class=' btn mr10 cancel  '>清空</div>";
    str+="</div>";
    str+="<div class='returnVisitList'>";
    str+="<div class='returnVisitList_tt'><div class='item01'>姓名</div><div class='item02'>回访人</div><div class='item03'>回访日期</div><div class='item04'>预定回访时间</div><div class='item05'>操作</div></div>";
    str+="<div class='returnVisitList_ctn'>";
    str+="</div>";
    str+="</div>";
    $(".work").append(str);
    getReturnVisitDetail();
    kfTimePicker();
    $(".filter_ctr .start .kfTimePickerValue").text(window.nowyear+"-"+tools.addZero(window.nowweek,2)+"-"+tools.addZero(window.nowday,2)+" 周"+tools.changeWeek(window.nowweek));
    $(".filter_ctr .end .kfTimePickerValue").text(window.nowyear+"-"+tools.addZero(window.nowweek,2)+"-"+tools.addZero(window.nowday,2)+" 周"+tools.changeWeek(window.nowweek));
    $(".work .filter_ctr .cancel").click(function(){
        $(".work .returnVisitList .returnVisitList_ctn").html("");
    });

    $(".work .filter_ctr .search").click(function(){
        getReturnVisitDetail();
    });
}

//获取回访的详细数据
function getReturnVisitDetail(){
    var obj={};
    $(".returnVisitList_ctn").empty();
    $.ajax({
        url:"/users/rebackList",
        type:"POST",
        data:obj,
        success:function(data){
            var a=eval("( "+data+" )");
            var str="";
            if(a.status == 000){
                if(a.rebackList){
                    for(var i=0;i<a.rebackList.length;i++){
                        str+="<div class='row'>";
                        str+="<div class='item01'>"+a.rebackList[i].realName+"</div>";
                        str+="<div class='item02'>"+a.rebackList[i].visitorName+"</div>";
                        str+="<div class='item03'>"+a.rebackList[i].visitTime+"</div>";
                        str+="<div class='item04'>"+a.rebackList[i].visitTime+"</div>";
                        str+="<div class='item05'></div>";
                        str+="</div>";
                    }
                    $(".returnVisitList_ctn").append(str)
                }
                else{
                    $(".work .returnVisitList .returnVisitList_ctn").append("<div class='textCenter'>没有回访</div>")
                }
            }
            $(".work .returnVisitList .row").click(function(){
                getCareDetail();
            });
            $(".work .newreturnVisit").each(function(){
                $(this).click(function(e){
                    e.stopPropagation();
                    clearWork();
                    getNewReturnVisit();
                });
            });
        }
    });
}