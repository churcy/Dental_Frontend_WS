var tools={
    selector:function(){
        $(".wjfSelector").each(function(){
            var self=$(this);
            if(!self.data("structed")){
                self.data("structed",1);
                self.append("<div class='selectorValue'></div><div class='selectorList'></div>");
                var list=self.data("itemList");
                for(var i=0;i<list.length;i++){
                    self.find(".selectorList").append("<div class='selectorListItem'>"+list[i]+"</div>");
                }
            }
        });
    },
    addZero:function(num,len){
        var data=num.toString();
        if(data.length<len){
            var zero="";
            for(var i=0;i<(len-data.length);i++){
                zero+="0";
            }
            data=zero+data;
        }
        return data
    },
    unique:function(arr,sort){
        var result = [], isRepeated;
        for (var i = 0, len = arr.length; i < len; i++) {
            isRepeated = false;
            for (var j = 0, len1 = result.length; j < len1; j++) {
                if (arr[i] == result[j]) {
                    isRepeated = true;
                    break;
                }
            }
            if (!isRepeated) {
                result.push(arr[i]);
            }
        }
        if(sort){
            result=result.sort();
        }
        return result;
    },
    getNearDate:function(obj){
        var a=obj;
        var year= parseInt(a.year);
        var month= parseInt(a.month);
        var day= parseInt(a.day);
        var prev= day - parseInt(a.prev);
        var next= parseInt(a.next) + parseInt(day);
        var arr=[];
        for(var i=0;i< a.prev;i++){
            if((prev+i)<1){
                if(month == 1){
                    arr.push({
                        year:(year - 1),
                        month:12,
                        day:(31+prev+i)
                    })
                }else if(month<=12 && month > 1){
                    var prevLimit=new Date(year,month-1,0).getDate();
                    arr.push({
                        year:year,
                        month:(month - 1),
                        day:(prevLimit+prev+i)
                    });

                }else{
                    console.log("月份错误")
                }
            }else if((prev+i) >= 1){
                arr.push({
                    year:year,
                    month:month,
                    day:(prev+i)
                });
            }
        }
        arr.push({
            year:year,
            month:month,
            day:day
        });
        for(var i=a.next;i>0 ;i--){
            var nextLimit=new Date(year,month,0).getDate();
            if((next-i+1)>nextLimit){
                if(month == 12){
                    arr.push({
                        year:(parseInt(year) + 1),
                        month:1,
                        day:(next-30-i)
                    })
                }else if(month < 12 && month >= 1){
                    arr.push({
                        year:year,
                        month:(month + 1),
                        day:(next-nextLimit-i+1)
                    });
                }else{
                    console.log("月份错误")
                }
            }else if((next-i+1) <= nextLimit){
                arr.push({
                    year:year,
                    month:month,
                    day:(next-i+1)
                });
            }
        }
        return arr;
    },
    scrollWith:function(){
        $(document).scroll(function(){
            var tp=$(document).scrollTop();
            var wt=$(".scrollWith").width();
            if(tp > 95){
                $(".scrollWith").addClass("scrollWithActive");
                $(".work .scrollWithActive").css({
                    "width":wt,
                    "margin-left":"-"+(wt/2+95)+"px"
                })
            }else{
                $(".scrollWith").removeClass("scrollWithActive");
                $(".work .scrollWith").css({
                    "width":wt,
                    "margin-left":0+"px"
                })
            }
        });
    },
    changeWeek:function(week){
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
    },
    kfselect:function(){
        $(".kfselect").each(function(){
            var init=$(this).data("init");
            if(!init){
                var slc=$(this);
                slc.data("init",1);
                var ctn=slc.find(".kfselectCtn");
                var value=slc.find(".kfselectValue");
                var len=ctn.find(".kfselectItem").length;
                slc.width(slc.data("wt"));
                ctn.css("max-height",slc.data("itemmax")*20+"px");
                ctn.width(slc.width());
                value.click(function(e){
                    ctn.toggle();
                    e.stopPropagation();
                });

                slc.find(".kfselectItem").click(function(e){
                    value.text($(this).text());
                    ctn.hide();
                    e.stopPropagation();
                });
            }
        });
        $(window).click(function(){
            $(".kfselect .kfselectCtn").hide();
        })
    },
    kfTimePicker:function(){
        $(".kfTimePicker").each(function(){
            var self=$(this);
            self.append("<div class='kfTimePickerValue'></div><div class='kfTimePickerCtn'></div>");
            var value=self.find(".kfTimePickerValue");
            var ctn=self.find(".kfTimePickerCtn");
            value.css({
                "width":(self.width()-(self.data("border")*2))+"px",
                "height":(self.height()-(self.data("border")*2))+"px",
                "line-height":(self.height()-(self.data("border")*2))+"px"
            });
            value.text("点击选择日期");
            ctn.css({
                "top":(self.height()+1)+"px"
            });
            ctn.append("<div class='kfTimePickerYM'></div>");
            ctn.find(".kfTimePickerYM").append("<div class='kfselect fl mr5 kfTimePickerYear' data-itemmax='9' data-wt='70'><div class='kfselectValue'></div><div class='kfselectCtn'></div></div><div class='kfselect kfTimePickerMonth fl' data-itemmax='9' data-wt='50'><div class='kfselectValue'></div><div class='kfselectCtn'></div></div>");
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

            tools.kfselect();

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

                var day=$(this).text();
                var week=new Date(year,(month-1),day).getDay();

                if(week == 0){
                    self.data("week","00000001");
                }else{
                    var bcd=Math.pow(2,(7-week)).toString(2);
                    bcd=tools.addZero(bcd,7);
                    self.data("week",bcd);
                }
                self.data("year",year);
                self.data("week",week);
                self.data("month",month);
                self.data("date",$(this).text());
                self.data("startTime",tools.addZero(ctn.find(".startTime").find(".left").text(),2)+":"+tools.addZero(ctn.find(".startTime").find(".right").text(),2)+":00");
                self.data("endTime",tools.addZero(ctn.find(".lastTime").find(".left").text(),2)+":"+tools.addZero(ctn.find(".lastTime").find(".right").text(),2)+":00");
                self.data("repeat",(ctn.find(".repeat").find(".kfselectValue").text() == "每周")?1:0);
                week=tools.changeWeek(week);
                value.text(year+"-"+month+"-"+day);

                ctn.hide();
            });
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
};
$(function(){
    var arr=tools.getNearDate({
        year:"2016",
        month:"3",
        day:"3",
        prev:"10",
        next:"1"
    });

})