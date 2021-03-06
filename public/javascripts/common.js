//全局变量
window.urlData={};
window.phoneValidate=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
window.codeValidate=/^\d{6}$/;
window.passwordValidate=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){6,20}$/;
window.nowyear=new Date().getFullYear();
window.nowmonth=new Date().getMonth();
window.nowmonth=(window.nowmonth == 11)?1:window.nowmonth+1;
window.nowday=new Date().getDate();
window.nowweek=new Date().getDay();
$(function(){
    extraJs();
    getURLref();
    logout();
    userPullDownList();
    listOut();
    window.workWidth=$(window).width() - 600;
    $(".work").width(window.workWidth);

});

//扩展js的api
function extraJs(){
    String.prototype.replaceAll = function(s1,s2) {
        return this.replace(new RegExp(s1,"gm"),s2);
    };
}

//解析url参数
function getURLref(){
    var url=window.location.search;
    if(url.indexOf("?")!=-1){
        var str = url.substr(1);
        strs = str.split("&");
        var key=new Array(strs.length);
        var value=new Array(strs.length);
        for(i=0;i<strs.length;i++)
        {
            key[i]=strs[i].split("=")[0]
            value[i]=unescape(strs[i].split("=")[1]);
            window.urlData[key[i]] = value[i];
        }
    }
}
//功夫医生下拉框
function kfselect(){

}


//功夫医生时间获取工具
function kfTimePicker(){
    $(".kfTimePicker").each(function(){
        var init=$(this).data("init");
        if(!init){
            var self=$(this);
            self.data("init",1);
            self.append("<div class='kfTimePickerValue'></div><div class='kfTimePickerCtn'></div>");
            var value=self.find(".kfTimePickerValue");
            var ctn=self.find(".kfTimePickerCtn");
            self.css({
                "width":(self.width()-(self.data("border")*2))+"px",
                "height":(self.height()-(self.data("border")*2))+"px",
                "line-height":(self.height()-(self.data("border")*2))+"px"

            })
            value.css({
                "width":(self.width()-(self.data("border")*2))+"px",
                "height":(self.height()-(self.data("border")*2))+"px",
                "line-height":(self.height()-(self.data("border")*2))+"px"
            });
            value.text("--- 请选择 ---");
            ctn.css({
                "top":(self.height()+1)+"px"
            });
            ctn.append("<div class='kfTimePickerYM'></div>");
            ctn.find(".kfTimePickerYM").append("<div class='kfselect fl mr5 kfTimePickerYear' data-itemmax='9' data-wt='70'><div class='kfselectValue'></div><div class='kfselectCtn'></div></div><div class='kfselect kfTimePickerMonth fl' data-itemmax='9' data-wt='50'><div class='kfselectValue'></div><div class='kfselectCtn'></div></div>");

            if(self.data("model") == "widthOpen"){
                ctn.find(".kfTimePickerYM").css("padding","4px 0 4px 35px");
                ctn.find(".kfTimePickerYM").append("<div class='startTime'><div class='left' contenteditable='true'>8</div><div class='center'>:</div><div class='right' contenteditable='true'>30</div></div>");
            }

            if(self.data("model") == "detail"){
                ctn.find(".kfTimePickerYM").css("padding","4px 35px");
                ctn.find(".kfTimePickerYM").html("");
                ctn.find(".kfTimePickerYM").append("<div class='startTime'><div class='left' contenteditable='true'>8</div><div class='center'>:</div><div class='right' contenteditable='true'>30</div></div>");
                ctn.find(".kfTimePickerYM").append("<div class='lastTime'><div class='left' contenteditable='true'>8</div><div class='center'>:</div><div class='right' contenteditable='true'>30</div></div>");
                ctn.find(".kfTimePickerYM").append("<div class='repeat kfselect  fl textIndent0 ml2' data-itemmax='9' data-wt='38'><div class='kfselectValue noBg'>本周</div><div class='kfselectCtn'><div class='kfselectItem textIndent0'>本周</div><div class='kfselectItem textIndent0'>每周</div></div></div>")
            }
            var years="";
            var months="";
            if($(this).data("dir") == "before"){
                for(var i= 0;i<(window.nowyear - 1940);i++){
                    years+="<div class='kfselectItem'>"+(1940+i)+"年</div>";
                }
            }else{
                for(var i= 0;i<10;i++){
                    years+="<div class='kfselectItem'>"+(window.nowyear+i)+"年</div>";
                }
            }

            for(var i=1;i<13;i++){
                months+="<div class='kfselectItem'>"+i+"月</div>";
            }
            ctn.find(".kfTimePickerYear").find(".kfselectCtn").append(years);
            ctn.find(".kfTimePickerMonth").find(".kfselectCtn").append(months);

            kfselect();

            value.click(function(e){
                e.stopPropagation();
                ctn.toggle();
            });
            ctn.find(".kfTimePickerYear").find(".kfselectValue").text(window.nowyear+"年");
            ctn.find(".kfTimePickerMonth").find(".kfselectValue").text(window.nowmonth+"月");

            ctn.append("<div class='kfTimePickerList'><div class='kfTimePickerListTt'></div><div class='kfTimePickerListCtn'></div></div>");
            for(var i=1;i<8;i++){
                var a=i;
                a=(a == 7)?0:a;
                a=changeWeek(a);
                ctn.find(".kfTimePickerListTt").append("<div class='kfTimePickerListTtItem'>"+a+"</div>");
            }
            for(var i=0;i<42;i++){
                ctn.find(".kfTimePickerListCtn").append("<div class='kfTimePickerListCtnItem'></div>")
            }

            kfTimePickerChange(window.nowyear,window.nowmonth,ctn);
            ctn.find(".kfselectItem").click(function(e){
                e.stopPropagation();
                var year=ctn.find(".kfTimePickerYear").find(".kfselectValue").text();
                var month=ctn.find(".kfTimePickerMonth").find(".kfselectValue").text();
                year=year.substr(0,year.length-1);
                month=month.substr(0,month.length-1);
                kfTimePickerChange(year,month,ctn,value);
            });
            ctn.find(".startTime").click(function(e){
                e.stopPropagation();
            });
            ctn.find(".lastTime").click(function(e){
                e.stopPropagation();
            });
            ctn.find(".repeat").click(function(e){
                e.stopPropagation();
            });
            ctn.find(".repeat").find(".kfselectItem").click(function(e){
                e.stopPropagation();
                kfTimePickerChange(window.nowyear,window.nowmonth,ctn);
            });
            ctn.find(".active").click(function(e){
                e.stopPropagation();
                var year=ctn.find(".kfTimePickerYear").find(".kfselectValue").text();
                var month=ctn.find(".kfTimePickerMonth").find(".kfselectValue").text();
                year=year.substr(0,year.length-1);
                month=month.substr(0,month.length-1);
                var startTime=ctn.find(".startTime").find(".left").text()+":"+ctn.find(".startTime").find(".right").text();
                var lastTime=ctn.find(".lastTime").find(".left").text()+":"+ctn.find(".startTime").find(".right").text();
                var day=$(this).text();
                var week=new Date(year,(month-1),day).getDay();

                if(week == 0){
                    self.data("week","00000001");
                }else{
                    var bcd=Math.pow(2,(7-week)).toString(2);
                    bcd=addZero(bcd,7);
                    self.data("week",bcd);
                }
                self.data("year",year);
                self.data("week",week);
                self.data("month",month);
                self.data("date",$(this).text());
                self.data("startTime",addZero(ctn.find(".startTime").find(".left").text(),2)+":"+addZero(ctn.find(".startTime").find(".right").text(),2)+":00");
                self.data("endTime",addZero(ctn.find(".lastTime").find(".left").text(),2)+":"+addZero(ctn.find(".lastTime").find(".right").text(),2)+":00");
                self.data("repeat",(ctn.find(".repeat").find(".kfselectValue").text() == "每周")?1:0);
                week=changeWeek(week);
                if(self.data("model") == "noweek"){
                    value.text(year+"年"+month+"月"+day+"日");
                }else if(self.data("model") == "widthOpen"){
                    value.text(year+"-"+month+"-"+day+" 周"+week+"  "+startTime);
                }else if(self.data("model") == "detail"){
                    value.text("周"+week+"  "+startTime+" 到 "+lastTime);
                }else{
                    value.text(year+"-"+month+"-"+day+" 周"+week);
                }
                ctn.hide();
            });

        }
    });
    $(window).click(function(){
        $(".kfTimePickerCtn").hide();
    });
    function kfTimePickerChange(year,month,ctn){
        ctn.find(".kfTimePickerListCtnItem").text("");
        ctn.find(".kfTimePickerListCtnItem").removeClass("active");
        month=parseInt(month);
        var date=new Date(year,month-1);
        date.setDate(1);
        var week=date.getDay();
        var len=new Date(year,month,0).getDate();
        for(var i=week;i<(week+len);i++){
            ctn.find(".kfTimePickerListCtnItem").eq(i-1).text(i-week+1);
            ctn.find(".kfTimePickerListCtnItem").eq(i-1).addClass("active");
        }

    }
}

//登出
function logout(){
    $(".logout").click(function(e){
        e.stopPropagation();
        $.cookie("dockflogin","",{ expires:0.5, path: '/'});
        $.cookie("uid","",{ expires:0.5, path: '/'});
        $.cookie("name","",{ expires:0.5, path: '/'});
        $.cookie("accountId","",{ expires:0.5, path: '/'});
        $.cookie("doctorId","",{ expires:0.5, path: '/'});
        $.cookie("dId","",{ expires:0.5, path: '/'});
        window.location.href="/login";
    });
}

//刷新登陆状态

function keepLogin(){
    if(!$.cookie("dockflogin")){
        window.location.href="/login";
    }
    $(window).click(function(){
        if(!$.cookie("dockflogin")){
            window.location.href="/login";
        }else{
            $.cookie("dockflogin",true,{ expires:0.5, path: '/'});
            $.cookie("uid",$.cookie("uid"),{ expires:0.5, path: '/'});
            $.cookie("name",$.cookie("name"),{ expires:0.5, path: '/'});
            $.cookie("accountId",$.cookie("accountId"),{ expires:0.5, path: '/'});
            $.cookie("doctorId",$.cookie("doctorId"),{ expires:0.5, path: '/'});
            $.cookie("dId",$.cookie("dId"),{ expires:0.5, path: '/'});
        }
    });
}

//用户下拉菜单
function userPullDownList(){
    $(".userPullDown").click(function(e){
        $(".userPullDownList").toggle();
        e.stopPropagation();
    });
    $(window).click(function(){
        $(".userPullDownList").hide();
    });
}

//左侧层级下拉框
function listOut(){
    $(".list_item").each(function(){
        var self=$(this);
        if(self.hasClass("pullDown")){
            self.click(function(){
                var a=self.nextUntil(".list_item");
                if(self.hasClass("list_item_checked")){
                    self.removeClass("list_item_checked")
                    a.each(function(){
                        if($(this).hasClass("list_item_sec")){
                            $(this).hide();
                        }
                    });
                }else{
                    $(".list").find("*").removeClass("list_item_checked");
                    self.addClass("list_item_checked");
                    a.each(function(){
                        if($(this).hasClass("list_item_sec")){
                            $(this).show();
                        }
                    });
                }
            });
        }
    });

    $(".list_item_sec").each(function(){
        var self=$(this);
        if(self.hasClass("pullDown")){
            self.click(function(){
                var a=self.nextUntil(".list_item");
                var b=self.nextUntil(".list_item_sec");
                if(self.hasClass("list_item_checked")){
                    self.removeClass("list_item_checked");
                    if(b.length < a.length){
                        b.hide();
                    }else{
                        a.hide();
                    }
                }else{
                    $(".list").find("*").removeClass("list_item_checked");
                    self.addClass("list_item_checked")
                    if(b.length < a.length){
                        b.show();
                    }else{
                        a.show();
                    }
                }

            });
        }
    });

    if($(".origin").hasClass("list_item")){
        $(".origin").click(function(){
            $(".list").find("*").removeClass("list_item_checked");
            $(".list .list_item_sec").hide();
            $(".list .list_item_thd").hide();
            $(this).addClass("list_item_checked")
        });
    }else if($(".origin").hasClass("list_item_sec")){
        var a=$(".origin").prevUntil(".list_item");
        var b=$(".origin").nextUntil(".list_item");
        $(".origin").show();
        a.each(function(){
            if($(this).hasClass("list_item_sec")){
                $(this).show();
            }
        });
        b.each(function(){
            if($(this).hasClass("list_item_sec")){
                $(this).show();
            }
        });
    }


    if($(".origin").hasClass("list_item_thd")){
        $(".origin").show();
        var a=$(".origin").prevUntil(".list_item");
        var b=$(".origin").prevUntil(".list_item_sec");
        var c=$(".origin").nextUntil(".list_item");
        var d=$(".origin").nextUntil(".list_item_sec");
        a.each(function(){
            if($(this).hasClass("list_item_sec")){
                $(this).show();
            }
        });
        b.show();
        c.each(function(){
            if($(this).hasClass("list_item_sec")){
                $(this).show();
            }
        });
        d.show();
    }
}




//清空工作台
function clearWork(){
    $(".work").removeClass("work_null");
    $(".work").empty();
}

//将时间戳转换为具体时间
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17)
}


//将星期从数字转化为汉字
function changeWeek(week){
    switch(week){
        case 0:
            return "日";
        case 1:
            return "一";
        case 2:
            return "二";
        case 3:
            return "三";
        case 4:
            return "四";
        case 5:
            return "五";
        case 6:
            return "六";
    }
}

//增加0
function addZero(data,len){
    data=data.toString();
    if(data.length<len){
        var zero="";
        for(var i=0;i<(len-data.length);i++){
            zero+="0";
        }
        data=zero+data;
    }
    return data
}

//获取某个日期前后的日期
function getNearDate(obj){
    var a=obj;
    var year= a.year;
    var month= a.month;
    var day= a.day;
    var prev= a.prev;
    var next= a.next;
    var arr=[];
    for(var i=0;i<prev;i++){
        var thisDate=new Date(year,month,(day-prev+i));
        arr.push({
            year:thisDate.getFullYear(),
            month:thisDate.getMonth(),
            day:thisDate.getDate()
        });
    }
    return arr;
}


//获取某周的开始日期和结束日期
function getSection(date){
    var section={};
    var year= date.year;
    var month= date.month;
    var day= date.day;
    var week=date.week;
    if(day < 8){

    }
    var startDay=new Date(year,month,(day-week+1));
    var endDay=new Date(year,month,(day+7-week));
    section.list=[];
    for(var i=1;i<8;i++){
        var thisDate=new Date(year,month,(day-week+i));
        section.list[i-1]=thisDate.getMonth()+" "+thisDate.getDate();
    }
    section.stratDate=startDay.getFullYear()+addZero(startDay.getMonth(),2)+addZero(startDay.getDate(),2);
    section.endDate=endDay.getFullYear()+addZero(endDay.getMonth(),2)+addZero(endDay.getDate(),2);
    return section;
}


//查看日程管理器
function getScheduleCtr(classify){
    //获取日程控制台
    var str="";
    str+="<div class='schedule_ctr'>";
    str+="<div class='date_type'><div class='item checked'>天</div><div class='item'>周</div><div class='item'>月</div></div>";
    str+="<div class='date'>";
    str+="<div class='date_prev'> < </div>";
    str+="<div class='date_ctn'></div>";
    str+="<div class='date_next'> > </div>";
    str+="</div>";
    str+="</div>";
    str+="<div class='schedule_ctn'>";
    str+="</div>";
    $(".work").append(str);

    //处理参数
    var dateType="day";
    var year,month,day,week;

    if(window.urlData.year && window.urlData.month && window.urlData.date){
        year=window.urlData.year;
        month=window.urlData.month;
        month=(month == 11)?1:month;
        day=window.urlData.date;
        week=new Date(year,(month+1),day).getDay();
        week=(week == 7)?1:(week+1);
    }else{
        year=window.nowyear;
        month=window.nowmonth;
        day=window.nowday;
        week=window.nowweek;
    }
    $(".date_ctn").data("year",year);
    $(".date_ctn").data("month",month);
    $(".date_ctn").data("day",day);
    $(".date_ctn").data("week",week);
    var hanWeek=changeWeek(week);
    var nowDate=year+"年"+month+"月"+day+"日  周"+hanWeek;

    //默认为当天的日程
    $(".work .schedule_ctr .date .date_ctn").text(nowDate);
    storeDate(year,month,day,week);
    scheduleCtnChange(dateType,classify);

    //切换日周年控制器
    $(".work .schedule_ctr .date_type .item").click(function(){
        if(!$(this).hasClass("checked")){
            $(".schedule_ctr .date_type .item").removeClass("checked");
            $(this).addClass("checked");
            var a=$(this).text();
            if(a == "天"){
                dateType="day";
            }else if(a == "周"){
                dateType="week";
            }else if(a == "月"){
                dateType="month";
            }
            storeDate(year,month,day,week);
            scheduleCtnChange(dateType,classify);
        }
    });
    $(".work .schedule_ctr .date .date_prev").click(function(){
        if(dateType == "day"){
            if(day == 1){
                if(month == 1){
                    year--;
                    month=12;
                    day=31;
                    week=(week == 0)?6:week-1;
                    hanWeek=changeWeek(week);
                    nowDate=year+"年"+month+"月"+day+"日  周"+hanWeek;
                    $(".work .schedule_ctr .date .date_ctn").text(nowDate);
                }else{
                    var len=new Date(year,month-1,0).getDate();
                    month--;
                    day=len;
                    week=(week == 0)?6:week-1;
                    hanWeek=changeWeek(week);
                    nowDate=year+"年"+month+"月"+day+"日  周"+hanWeek;
                    $(".work .schedule_ctr .date .date_ctn").text(nowDate);
                }
            }else{
                day--;
                week=(week == 0)?6:week-1;
                hanWeek=changeWeek(week);
                nowDate=year+"年"+month+"月"+day+"日  周"+hanWeek;
                $(".work .schedule_ctr .date .date_ctn").text(nowDate);

            }
            storeDate(year,month,day,week);
            scheduleCtnChange(dateType,classify);
        }else if(dateType == "week"){
            if(day < 8 ){
                if(month == 1){
                    year--;
                    month=12;
                    day=31+day-7;
                    nowDate=year+"年"+month+"月"+day+"日  周"+hanWeek;
                    $(".work .schedule_ctr .date .date_ctn").text(nowDate);
                }else{
                    var len=new Date(year,month-1,0).getDate();
                    month--;
                    day=len+day-7;
                    nowDate=year+"年"+month+"月"+day+"日  周"+hanWeek;
                    $(".work .schedule_ctr .date .date_ctn").text(nowDate);
                }
            }else{
                day=day-7;
                nowDate=year+"年"+month+"月"+day+"日  周"+hanWeek;
                $(".work .schedule_ctr .date .date_ctn").text(nowDate);

            }
            storeDate(year,month,day,week);
            scheduleCtnChange(dateType,classify);
        }else if(dateType == "month"){
            if(month == 1){
                month=12;
                year--;
                nowDate=year+"年"+month+"月"+day+"日  周"+hanWeek;
                $(".work .schedule_ctr .date .date_ctn").text(nowDate);
            }else{
                month--;
                var limit=new Date(year,month,0).getDate();
                if(day > limit){
                    day = limit;
                }
                nowDate=year+"年"+month+"月"+day+"日  周"+hanWeek;
                $(".work .schedule_ctr .date .date_ctn").text(nowDate);
            }
            storeDate(year,month,day,week);
            var str="";
            str+="<div class='month_item'>";
            str+="<div class='month_time'></div>";
            str+="<div class='month_ctn noBorder'>";
            str+="<div class='month_list_tt'>";
            str+="<div class='month_list_item'><p class='week'>周一</p><p class='date'></p></div>";
            str+="<div class='month_list_item'><p class='week'>周二</p><p class='date'></p></div>";
            str+="<div class='month_list_item'><p class='week'>周三</p><p class='date'></p></div>";
            str+="<div class='month_list_item'><p class='week'>周四</p><p class='date'></p></div>";
            str+="<div class='month_list_item'><p class='week'>周五</p><p class='date'></p></div>";
            str+="<div class='month_list_item'><p class='week'>周六</p><p class='date'></p></div>";
            str+="<div class='month_list_item'><p class='week'>周日</p><p class='date'></p></div>";
            str+="</div></div></div>";
            $(".schedule_ctn").append(str);
            scheduleCtnChange(dateType,classify);
        }



    });
    $(".work .schedule_ctr .date .date_next").click(function(){
        if(dateType == "day"){
            var limit=new Date(year,month,0).getDate();
            if(day == limit){
                limit=new Date(year,month+1,0).getDate();
                if(month == 12){
                    year++;
                    month=1;
                    day=31;
                    week=(week == 6)?0:week+1;
                    hanWeek=changeWeek(week);
                    nowDate=year+"年"+month+"月"+day+"日  周"+hanWeek;
                    $(".work .schedule_ctr .date .date_ctn").text(nowDate);
                }else{
                    month++;
                    day=1;
                    week=(week == 0)?6:week-1;
                    hanWeek=changeWeek(week);
                    nowDate=year+"年"+month+"月"+day+"日  周"+hanWeek;
                    $(".work .schedule_ctr .date .date_ctn").text(nowDate);
                }
            }else{
                day++;
                week=(week == 6)?0:week+1;
                hanWeek=changeWeek(week);
                nowDate=year+"年"+month+"月"+day+"日  周"+hanWeek;
                $(".work .schedule_ctr .date .date_ctn").text(nowDate);

            }
            storeDate(year,month,day,week);
            scheduleCtnChange(dateType,classify);
        }else if(dateType == "week"){
            var limit=new Date(year,month,0).getDate();
            if(day > (limit-7)){
                if(month == 12){
                    year++;
                    month=1;
                    day=7+day-limit;
                    nowDate=year+"年"+month+"月"+day+"日  周"+hanWeek;
                    $(".work .schedule_ctr .date .date_ctn").text(nowDate);
                }else{
                    month++;
                    day=7+day-limit;
                    nowDate=year+"年"+month+"月"+day+"日  周"+hanWeek;
                    $(".work .schedule_ctr .date .date_ctn").text(nowDate);
                }
            }else{
                day=day+7;
                nowDate=year+"年"+month+"月"+day+"日  周"+hanWeek;
                $(".work .schedule_ctr .date .date_ctn").text(nowDate);

            }
            storeDate(year,month,day,week);
            scheduleCtnChange(dateType,classify);
        }else if(dateType == "month"){
            if(month == 12){
                month=1;
                year++;
                nowDate=year+"年"+month+"月"+day+"日  周"+hanWeek;
                $(".work .schedule_ctr .date .date_ctn").text(nowDate);
            }else{
                month++;
                var limit=new Date(year,month,0).getDate();
                if(day > limit){
                    day = limit;
                }
                nowDate=year+"年"+month+"月"+day+"日  周"+hanWeek;
                $(".work .schedule_ctr .date .date_ctn").text(nowDate);
            }
            storeDate(year,month,day,week);
            scheduleCtnChange(dateType,classify);
        }

    });
}
//保存date_ctn日期
function storeDate(year,month,day,week){
    $(".work .date_ctn").data("year",year);
    $(".work .date_ctn").data("month",month);
    $(".work .date_ctn").data("day",day);
    $(".work .date_ctn").data("week",week);
}


//日程内容改变
function scheduleCtnChange(dateType,classify){
    var date={};
    date.year=$(".schedule_ctr .date .date_ctn").data("year");
    date.month=$(".schedule_ctr .date .date_ctn").data("month");
    date.week=$(".schedule_ctr .date .date_ctn").data("week");
    date.day=$(".schedule_ctr .date .date_ctn").data("day");
    $(".schedule_ctn").html("");
    if(dateType == "day"){
        getScheduleByDay(classify,date);
    }else if(dateType == "month"){
        getScheduleByMonth(classify,date);
    }else if(dateType == "week"){
        getScheduleByWeek(classify,date);
    }
}
//单天的行程
function getScheduleByDay(classify,date){
    var obj={};
    obj.date=date;
    obj.date.year=obj.date.year.toString();
    obj.date.month=addZero(obj.date.month,2);
    obj.stratDate=obj.date.year+obj.date.month+obj.date.day;
    switch(classify){
        case "all":
            obj.type="0";
            break;
        case "order":
            obj.type="1";
            break;
        case "travel":
            obj.type="2";
            break;
    }
    $.ajax({
        url:"/users/getStrokeByDay",
        type:"POST",
        data:obj,
        success:function(data){
            $(".schedule_ctn").append(data);
            $(".day_item").each(function(){
                var obj=$(this).find(".day_list").find(".day_list_item");
                var len=obj.length;
                obj.width((window.workWidth*0.93/len) - 3);
                obj.find(".tips").css("left",((589-(len*2))/len-20)+"px");
                obj.each(function(){
                    var tip=$(this).find(".tips");
                    var menu=$(this).find(".menu");
                    var timer;
                    $(this).mouseenter(function(e){
                        timer=setTimeout(function(){
                            tip.show();
                        },500)
                    });

                    $(this).mouseleave(function(){
                        if(timer){
                            clearTimeout(timer);
                        }
                        tip.hide();
                        menu.hide();
                    });

                    tip.click(function(e){
                        e.stopPropagation();
                    });

                    obj.find(".addStroke").click(function(){
                        window.location.href="/index/creatSchedul";
                    });
                    obj.find(".editerStroke").click(function(){
                        window.location.href="/index/creatSchedul?id="+obj.data("id");
                    });
                    $(this).click(function(e){
                        if(timer){
                            clearTimeout(timer);
                        }
                        tip.hide();
                        var x= e.pageX - $(this).offset().left;
                        var y= e.pageY - $(this).offset().top;
                        menu.css({
                            "left":x+"px",
                            "top":y+"px"
                        });
                        menu.toggle();
                    });

                    menu.find(".menu_item").click(function(e){
                        e.stopPropagation();
                    });
                });

            });
        }
    })
}
//单周的行程
function getScheduleByWeek(classify,date){
    var obj={};
    var section=getSection(date);
    obj.endDate=section.endDate;
    obj.stratDate=section.stratDate;
    for(var i=0;i<7;i++){
        if(section.list[i]==window.nowmonth+" "+window.nowday){
            section.list[i]="今天";
        }
    }
    switch(classify){
        case "all":
            obj.type="0";
            break;
        case "order":
            obj.type="1";
            break;
        case "travel":
            obj.type="2";
            break;
    }
    $.ajax({
        url:"/users/getStrokeByWeek",
        type:"POST",
        data:obj,
        success:function(data){
            $(".schedule_ctn").html("");
            var str="";
            str+="<div class='week_item' style='height:36px;'>";
            str+="<div class='week_time' style='height:36px;'></div>";
            str+="<div class='week_ctn noBorder' style='height:36px;'>";
            str+="<div class='week_list_tt'>";
            str+="<div class='week_list_item'><p class='week'>周一</p><p class='date'>"+section.list[0]+"</p></div>";
            str+="<div class='week_list_item'><p class='week'>周二</p><p class='date'>"+section.list[1]+"</p></div>";
            str+="<div class='week_list_item'><p class='week'>周三</p><p class='date'>"+section.list[2]+"</p></div>";
            str+="<div class='week_list_item'><p class='week'>周四</p><p class='date'>"+section.list[3]+"</p></div>";
            str+="<div class='week_list_item'><p class='week'>周五</p><p class='date'>"+section.list[4]+"</p></div>";
            str+="<div class='week_list_item'><p class='week'>周六</p><p class='date'>"+section.list[5]+"</p></div>";
            str+="<div class='week_list_item'><p class='week'>周日</p><p class='date'>"+section.list[6]+"</p></div>";
            str+="</div></div></div>";
            $(".schedule_ctn").append(str);
            $(".schedule_ctn").append(data);
        }
    })
}
//单月的行程
function getScheduleByMonth(classify,date){
    var obj={};
    obj.stratDate=date.year+addZero(date.month,2)+"01";
    obj.endDate=date.year+addZero(date.month,2)+(new Date(date.year,date.month,0).getDate());
    obj.year=date.year;
    obj.month=date.month;
    switch(classify){
        case "all":
            obj.type="0";
            break;
        case "order":
            obj.type="1";
            break;
        case "travel":
            obj.type="2";
            break;
    }
    $.ajax({
        url:"/users/getStrokeByMonth",
        type:"POST",
        data:obj,
        success:function(data){
            $(".schedule_ctn").html("");
            $(".schedule_ctn").append(data);
            var len=$(".schedule_ctn .month_item_ctn_item").length;
            for(var i=1;i<len;i++){
                if((i+1)%7 == 0){
                    $(".work .schedule_ctn .month_item_ctn_item").eq(i).css("border-right","0 none");
                }
            }
            $(".month_item_ctn_item").each(function(){
                var self=$(this);
                self.find(".stroke").click(function(){
                    var year=$(".schedule_ctr .date_ctn").data("year");
                    var month=$(".schedule_ctr .date_ctn").data("month");
                    var date=self.children(".date").text();
                    window.location.href="/index/schedul?year="+year+"&&month="+month+"&&date="+date;
                });

                self.find(".reserve").click(function(){
                    var year=$(".schedule_ctr .date_ctn").data("year");
                    var month=$(".schedule_ctr .date_ctn").data("month");
                    var date=self.children(".date").text();
                    window.location.href="/index/order?year="+year+"&&month="+month+"&&date="+date;
                });
            });
        }
    })
}


//打包标号
function pakageNo(obj){
    var lt=obj.find(".lt").text();
    var rt=obj.find(".rt").text();
    var lb=obj.find(".lb").text();
    var rb=obj.find(".rb").text();

    return lt+","+rt+","+lb+","+rb
}


























