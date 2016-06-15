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