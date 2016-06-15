$(function(){
    get_new_schedule();
});

//获取创建新行程的内容
function get_new_schedule(){
    var str="";
    str+="<div class='block'>";
    str+="<div class='block_ctr'>";
    str+="<div class='block_btn block_btn02 cancel'>取消</div>";
    str+="<div class='block_btn store'>保存</div>";
    str+="</div>";
    str+="</div>";
    str+="<div class='block'>";
    str+="<div class='block_form'>";
    str+="<div class='block_form_tt'><div>行程基本信息</div></div>";
    str+="<div class='block_form_ctn'>";
    str+="<div class='item'><div class='item_tt'>行程主题：</div><div id='subject' class='item_input w40'><input class='text' type='text' /></div></div>";
    str+="<div class='item'><div class='item_tt'>地    点：</div><div id='place' class='item_input w40'><input class='text' type='text' /></div></div>";
    str+="<div class='item'><div class='item_tt'>行程时间：</div><div id='time' class='item_input w40 kfTimePicker' data-model='widthOpen'></div></div>";
    str+="<div class='item'><div class='item_tt'>重    复：</div><div class='item_input w40'>";
    str+="<div class='kfselect blockSelect'><div class='kfselectValue'></div><div class='kfselectCtn'><div class='kfselectItem'>当天</div><div class='kfselectItem'>每天</div><div class='kfselectItem'>每周</div></div></div>";
    str+="</div></div>";
    str+="<div class='item'><div class='item_tt'>行程备注：</div><div id='remark' class='item_input'><textarea class='text row3'></textarea></div>";
    str+="</div>";
    str+="</div>";
    str+="</div>";
    $(".work").append(str);
    kfTimePicker();

    var a=window.urlData.id;
    /*
    if(a){
        var obj={};
        $.ajax({
            url:"/users/getStrokeByDay",
            type:"POST",
            data:obj,
            success:function(data){
                var a=eval("( "+data+" )");
                if(a.status == '000'){
                    $("#subject .text").val(a.subject);
                    $("#place .text").val(a.place);
                    $("#time .kfTimePickerValue").text(a.time);
                    $("#remark .text").val(a.remark);
                }
            }
        });
    }*/
    $(".store").click(function(){
        var obj={};
        obj.subject=$("#subject").find("input").val();
        obj.place=$("#place").find("input").val();
        obj.time=$("#time").data("year")+addZero($("#time").data("month"),2)+addZero($("#time").data("date"),2)+" "+addZero($("#time").find(".startTime").find(".left").text(),2)+":"+addZero($("#time").find(".startTime").find(".right").text(),2)+":"+"00";                                        ;
        if($(".blockSelect .kfselectValue").text() == '当天'){
            obj.repeat="0";
        }else if($(".blockSelect .kfselectValue").text() == '每天'){
            obj.repeat="1";
        }else if($(".blockSelect .kfselectValue").text() == '每周'){
            obj.repeat="2";
        }
        obj.remark=$("#remark").find("textarea").val();
        /*
        if(a){
            obj.id=a;
        }else{
            $.ajax({
                url:"/users/createStroke",
                type:"POST",
                data:obj,
                success:function(data){
                    var a=eval("( "+data+" )");
                    if(a.status == '000'){
                        window.location.href='/index/allSchedule'
                    }
                }
            })
        }*/
        $.ajax({
            url:"/users/createStroke",
            type:"POST",
            data:obj,
            success:function(data){
                var a=eval("( "+data+" )");
                if(a.status == '000'){
                    window.location.href='/index/allSchedule'
                }
            }
        })
    });
    $(".cancel").click(function(){
        $(".new_schedule").removeClass("list_item_checked");
        $(".viewTravel").addClass("list_item_checked");
        var date={};
        date.year=window.nowyear;
        date.month=window.nowmonth;
        date.week=window.nowweek;
        date.day=window.nowday;
        $(".work").html("");
        getScheduleCtr("travel");
    });
}