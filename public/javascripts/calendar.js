$(function(){
    color();
    calendarInit();
    bindCtr();
    kfselect();
});

function color(){
    for(var i=0;i<($(".calendar .calendar_ctn .detail .item").length+1);i++){
        if((i+1)%7 == 0 || (i+2)%7 == 0){
            $(".calendar .calendar_ctn .detail .item").eq(i).addClass("red")
        }
    }

}
//初始化日历
function calendarInit(){
    var date=new Date();
    var year=date.getFullYear();
    var month=(date.getMonth() == 11)?1:date.getMonth()+1;
    var now=date.getDate();
    date.setDate(1);
    var week=date.getDay();

    var len=new Date(year,month,0).getDate();
    $(".calendar .calendar_ctr .years .kfselectValue").text(year+"年");
    $(".calendar .calendar_ctr .month .kfselectValue").text(month+"月");
    $(".calendar .calendar_ctr .holday .kfselectValue").text("无");
    setCalendar(year,month,week,len);
    dateCheck(now,week);

}
//绑定控制器
function bindCtr(){
    $(".calendar .calendar_ctr .years .kfselectItem").click(function(){
        changeDate();
    });
    $(".calendar .calendar_ctr .month .kfselectItem").click(function(){
        changeDate();
    });

    $(".bd .bd_ctn .calendar .calendar_ctr .month_add").click(function(){
        var month=$(".calendar .calendar_ctr .month .kfselectValue").text();
        var year=$(".calendar .calendar_ctr .years .kfselectValue").text();
        month= month.substr(0, month.length-1);
        year=year.substr(0,year.length-1);
        if(month == 12){
            $(".calendar .calendar_ctr .month .kfselectValue").text("1月");
            year++;
            $(".calendar .calendar_ctr .years .kfselectValue").text(year+"年");
        }else{
            month++;
            $(".calendar .calendar_ctr .month .kfselectValue").text(month+"月");
        }
        changeDate();
    });

    $(".bd .bd_ctn .calendar .calendar_ctr .month_reduce").click(function(){
        var month=$(".calendar .calendar_ctr .month .kfselectValue").text();
        var year=$(".calendar .calendar_ctr .years .kfselectValue").text();

        month= month.substr(0, month.length-1);
        year=year.substr(0,year.length-1);
        if(month == 1){
            $(".calendar .calendar_ctr .month .kfselectValue").text("12月");
            year--;
            $(".calendar .calendar_ctr .years .kfselectValue").text(year+"年");
        }else{
            month--;
            $(".calendar .calendar_ctr .month .kfselectValue").text(month+"月");
        }
        changeDate();
    });

    $(".bd .bd_ctn .calendar .calendar_ctr .today").click(function(){
        calendarInit();

        initLeftList();
        getScheduleCtr();
    });

    $(".calendar .calendar_ctn .detail .item").click(function(){
        $(".calendar .calendar_ctn .detail .item").removeClass("check");
        $(this).addClass("check");

        initLeftList();
        getScheduleCtr("all");
    });
}

function changeDate(){
    var year=$(".calendar .calendar_ctr .years .kfselectValue").text();
    var month=$(".calendar .calendar_ctr .month .kfselectValue").text();
    year=parseInt(year.substr(0,year.length-1));
    month=parseInt(month.substr(0,month.length-1));
    var date=new Date(year,month-1);

    var week = date.getDay();
    var len=new Date(year,month,0).getDate();

    setCalendar(year,month,week,len);

}

function dateCheck(now,week){
    $(".calendar .calendar_ctn .detail .item").eq(week+now-2).addClass("check");
}

function clearDetail(){
    $(".calendar .calendar_ctn .detail .item").removeClass("check");
    $(".calendar .calendar_ctn .detail .item").removeClass("other");
    $(".calendar .calendar_ctn .detail .item").empty();;
}


function setCalendar(year,month,week,len){
    clearDetail();
    for(var i=week;i<(week+len);i++){
        $(".calendar .calendar_ctn .detail .item").eq(i-1).text(i-week+1);
    }

    var preYear=(month == 0)?year-1:year;
    var preMonth=(month == 0)?12:month-1;
    for(var i=0;i<week;i++){
        var a=new Date(preYear,preMonth,0).getDate();
        if(i>0){
            $(".calendar .calendar_ctn .detail .item").eq(i-1).addClass("other").text(a-week+i+1);
        }

    }
    var nextYear=(month == 11)?year+1:year;
    var nextMonth=(month == 11)?1:month+1;
    for(var i=(week+len);i<36;i++){
        var a=new Date(nextYear,nextMonth,0).getDate();
        $(".calendar .calendar_ctn .detail .item").eq(i-1).addClass("other").text(i-week-len+1);
    }


}



