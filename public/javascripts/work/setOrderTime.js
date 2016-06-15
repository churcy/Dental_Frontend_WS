$(function(){
    getSetAppointmentTime();
});

//获取设置预约列表的页面
function getSetAppointmentTime(){
    var obj={};
    $.ajax({
        url:"/users/physicianTime",
        type:'POST',
        data: obj,
        success:function(data){
            var a=eval("( "+data+" )");
            if(a.status == 000){
                var str="";
                str+="<div class='block'>";
                str+="<div class='block_form'>";
                str+="<div class='block_form_tt'><div>可预约时段</div></div>";
                str+="<div class='block_form_ctn'>";
                for(var i=0;i< a.timeList.length;i++){
                    if(a.timeList[i].repeatStatus == "重复"){
                        str+="<div class='item'><div class='item_tt w15'>可预约时段：</div><div>"+ a.timeList[i].weekDay+" "+a.timeList[i].startDate+" 到 "+a.timeList[i].endDate+"</div></div>";
                    }else{
                        str+="<div class='item'><div class='item_tt w15'>可预约时段：</div><div>"+ a.timeList[i].todayDate+" "+a.timeList[i].startDate+" 到 "+a.timeList[i].endDate+"</div></div>";
                    }
                }
                str+="<div class='item'><div class='item_tt w15'>可预约时段：</div><div class='item_input w40 kfTimePicker' data-model='detail'></div><div class='addAppointmentTime'>+</div></div>";
                str+="</div>";
                str+="</div>";
                str+="</div>";

                $(".work").append(str);
                $(".addAppointmentTime").click(function(){
                    obj.weekDays=$(".kfTimePicker").data("week");
                    obj.startTime=$(".kfTimePicker").data("startTime");
                    obj.endTime=$(".kfTimePicker").data("endTime");
                    obj.repeat=$(".kfTimePicker").data("repeat");
                    obj.count=5;
                    $.ajax({
                        url:"/users/setOrderTime",
                        type:"POST",
                        data:obj,
                        success:function(data){
                            var b=eval("( "+data+" )");
                            if(b.status == "000"){
                                clearWork();
                                getSetAppointmentTime();
                            }
                        }
                    })
                });
                kfTimePicker();
            }
        }
    });
}