$(function(){
    setTimeout(function(){
        patientGroup.init();
    },500)
});

var patientGroup={
    init:function(){
        patientGroup.tab();
        patientGroup.getGroupDetail();
        $(".patientListModelClose").click(function(){
            patientGroup.modelHide();
        });
    },
    tab:function(){
        $("#allPatient").click(function(){
            if(!$(this).hasClass("patientListTabItemChecked")){
                $(".patientListTabItem").removeClass("patientListTabItemChecked");
                $(this).addClass("patientListTabItemChecked");
                patientGroup.getGroupDetail();
            }
        });
        $("#todayPatient").click(function(){
            if(!$(this).hasClass("patientListTabItemChecked")){
                $(".patientListTabItem").removeClass("patientListTabItemChecked");
                $(this).addClass("patientListTabItemChecked");
                patientGroup.getTodayGroupDetail();
            }
        });
    },
    getGroupDetail:function(){
        var obj={};
        $.ajax({
            url:"/users/getGroupList",
            type:"POST",
            data:obj,
            success:function(data){
                var a=eval("("+data+")");
                var str="";
                var str1="";
                var str2="";
                str1+="<div class='patientListModeltableCtrMove kfselect'>";
                str1+="<div class='kfselectValue'>"+a.groupList[0].groupName+"</div>";
                str1+="<div class='kfselectCtn'>";
                for(var i=0;i< a.groupList.length;i++){
                    str+="<div class='patientListCtnItem' data-id='"+a.groupList[i].groupId+"' data-swt='close'>";
                    str+="<div class='tt'><div class='arrow'></div><div><span>"+a.groupList[i].groupName+"</span>（"+a.groupList[i].size+"）</div>";
                    str+="<div class='patientListCtnItemMenu'>";
                    str+="<div class='patientListCtnItemMenuItem addGroup'>新建分组</div>";
                    str+="<div class='patientListCtnItemMenuItem manageGroup'>管理分组</div>";
                    str+="<div class='patientListCtnItemMenuItem deleteGroup'>删除分组</div>";
                    str+="</div>";
                    str+="</div>";
                    str+="</div>";

                    str1+="<div class='kfselectItem'>"+a.groupList[i].groupName+"</div>";

                    str2+="<div class='patientListModelGroupListItem'>"+a.groupList[i].groupName+"</div>";
                }
                str1+="</div>";
                str1+="</div>";
                $(".patientListCtn ").append(str);
                $(".patientListModeltableCtr .fl").after(str1);
                $(".patientListModelGroupList").append(str2);
                kfselect();
                patientGroup.menu();
                patientGroup.modelCtr();
            }
        })
    },
    menu:function(){
        $(".patientListCtnItem").each(function(){
            var self=$(this);
            var tt=self.find(".tt");
            var menu=self.find(".patientListCtnItemMenu");
            var add=self.find(".addGroup");
            var manage=self.find(".manageGroup");
            var delet=self.find(".deleteGroup");
            tt.mousedown(function(e){
                if(e.which == 3){
                    var x= e.pageX - tt.offset().left;
                    var y= e.pageY - tt.offset().top;
                    menu.css({
                        "left":x+"px",
                        "top":y+"px"
                    });
                    menu.show();
                }else if(e.which == 1){
                    menu.hide();
                    patientGroup.getGroupMenber(self);
                }
            }).bind('contextmenu',function(e){
                e.preventDefault();
                return false;
            });
            tt.mouseleave(function(){
                menu.hide();
            });

            add.mousedown(function(e){
                e.stopPropagation();
                if(e.which == 1){
                    menu.hide();
                    patientGroup.addGroup(self);
                }
            });

            delet.mousedown(function(e){
                e.stopPropagation();
                if(e.which == 1){
                    menu.hide();
                    patientGroup.deleteGroup(self);
                }
            });

            manage.mousedown(function(e){
                e.stopPropagation();
                if(e.which == 1){
                    menu.hide();
                    patientGroup.modelShow();
                    patientGroup.modelInit(self.find("span").text());
                }
            });
        })
    },
    getGroupMenber:function(self){
        if(self.data("swt") == "close"){
            self.data("swt","open");
            var obj={};
            obj.id=self.data("id");
            $.ajax({
                url:"/users/getGroupMenber",
                type:"POST",
                data:obj,
                success:function(data){
                    var a=eval("("+data+")");
                    var str="";
                    for(var i=0;i< a.groupMembers.length;i++){
                        str+="<div class='item'>"+a.groupMembers[i].userName+"</div>";
                    }
                    self.append(str);
                    $(".patientListCtnItem .item").each(function(){
                        var self=$(this);
                        self.mousedown(function(e){
                            e.stopPropagation();
                            if(e.which == 1){
                                patientGroup.modelShow();
                                patientGroup.modelInit(self.parents(".patientListCtnItem").find("span").text());
                            }
                        })
                    });
                }
            })
        }else if(self.data("swt") == "open"){
            self.data("swt","close");
            self.find(".item").remove();
        }
    },
    addGroup:function(self){
        self.after("<div class='patientListCtnItem'><div class='tt'><div class='arrow'></div><div style='height:29px;width:200px;float:left;cursor:text;' id='addGroup' contenteditable='true' ></div></div></div>")
        $("#addGroup").keypress(function(e){
            if(e.which == 13){
                var obj={};
                obj.name=$("#addGroup").text();
                obj.id= $.cookie("doctorId");
                $.ajax({
                    url:"/users/addGroup",
                    type:"POST",
                    data:obj,
                    success:function(data){
                        var a=eval("("+data+")");
                        if(a.status == "000"){
                            location=location;
                        }
                    }
                })
            }
        });
    },
    deleteGroup:function(self){
        var obj={};
        obj.id= $.cookie("doctorId");
        obj.gId=self.data("id");
        $.ajax({
            url:"/users/deleteGroup",
            type:"POST",
            data:obj,
            success:function(data){
                var a=eval("("+data+")");
                if(a.status == "000"){
                    location=location;
                }
            }
        })
    },
    modelShow:function(){
        $(".model_shadow").show();
        $(".patientListModel").show();
    },
    modelHide:function(){
        $(".model_shadow").hide();
        $(".patientListModel").hide();
    },
    modelInit:function(name){
        $(".patientListModelGroupListItem").each(function(){
            var obj={};
            if($(this).text() == name){
                $(".patientListModelGroupListItem").removeClass("patientListModelGroupListItemChecked");
                $(this).addClass("patientListModelGroupListItemChecked");
                $.ajax({
                    url:"/users/getFriendList",
                    type:"POST",
                    data:obj,
                    success:function(data){
                        $(".patientListModeltableListRow").remove();
                        var a=eval("("+data+")");
                        var str="";
                        for(var i in a.friendList){
                            if(i == name){
                                if(a.friendList[i][0].friendUserId){
                                    for(var j=0;j<a.friendList[i].length;j++){
                                        str+="<div class='patientListModeltableListRow' data-id='"+a.friendList[i][j].friendUserId+"'>";
                                        str+="<div class='column01'><input type='checkbox' ></div>";
                                        str+="<div class='column02'>"+a.friendList[i][j].friendName+"</div>";
                                        str+="<div class='column03'></div>";
                                        str+="<div class='column04'></div>";
                                        str+="<div class='column05'>"+a.friendList[i][j].mobile+"</div>";
                                        if(a.friendList[i][j].visitDate){
                                            str+="<div class='column06'>"+a.friendList[i][j].visitDate+"</div>";
                                        }else{
                                            str+="<div class='column06'>尚无就诊记录</div>";
                                        }
                                        str+="<div class='column07'>"+a.friendList[i][j].groupName+"</div>";
                                        str+="</div>";
                                    }
                                    $(".patientListModeltableList").append(str);
                                }
                            }
                        }
                    }
                })
            }
        });
    },
    modelCtr:function(){
        $(".patientListModelGroupListItem").each(function(){
            var self=$(this);
            self.click(function(){
                $(".patientListModelGroupListItem").removeClass("patientListModelGroupListItemChecked");
                $(this).addClass("patientListModelGroupListItemChecked");
                $(".patientListModeltableListRow").remove();
                var name=self.text();
                var obj={};
                $.ajax({
                    url:"/users/getFriendList",
                    type:"POST",
                    data:obj,
                    success:function(data){
                        $(".patientListModeltableListRow").remove();
                        var a=eval("("+data+")");
                        var str="";
                        for(var i in a.friendList){
                            if(i == name){
                                if(a.friendList[i][0].friendUserId){
                                    for(var j=0;j<a.friendList[i].length;j++){
                                        str+="<div class='patientListModeltableListRow' data-id='"+a.friendList[i][j].friendUserId+"'>";
                                        str+="<div class='column01'><input type='checkbox' ></div>";
                                        str+="<div class='column02'>"+a.friendList[i][j].friendName+"</div>";
                                        str+="<div class='column03'></div>";
                                        str+="<div class='column04'></div>";
                                        str+="<div class='column05'>"+a.friendList[i][j].mobile+"</div>";
                                        if(a.friendList[i][j].visitDate){
                                            str+="<div class='column06'>"+a.friendList[i][j].visitDate+"</div>";
                                        }else{
                                            str+="<div class='column06'>尚无就诊记录</div>";
                                        }
                                        str+="<div class='column07'>"+a.friendList[i][j].groupName+"</div>";
                                        str+="</div>";
                                    }
                                    $(".patientListModeltableList").append(str);
                                }
                            }
                        }
                    }
                })
            })
        });

        $(".patientListModeltableCtrDelete").click(function(){
            var id=[];
            var obj={};
            $(".patientListCtnItem").each(function(){
                if($(this).find("span").text() == $(".patientListModelGroupListItemChecked").text()){
                    obj.gId=$(this).data("id");
                }
            });
            $(".patientListModeltableListRow").each(function(){
                var self=$(this);
                if(self.find("input").prop("checked")){
                    id.push(self.data("id"))
                }
            });
            if(id[0]){
                for(var i=0;i<id.length;i++){
                    obj.id=id[i];
                    $.ajax({
                        url:"/users/deleteFriend",
                        type:"POST",
                        data:obj,
                        success:function(data){
                            if(i == id.length){
                                location=location;
                            }
                        }
                    })
                }

            }else{
                alert("请选择一个好友")
            }
        });

        $(".patientListModeltableCtr .fl").click(function(){
            var obj={};
            var id=[];
            var name=$(".patientListModeltableCtrMove .kfselectValue").text();
            $(".patientListCtnItem").each(function(){
                if($(this).find("span").text() == name){
                    obj.gId=$(this).data("id");
                }
            });
            $(".patientListModeltableListRow").each(function(){
                var self=$(this);
                if(self.find("input").prop("checked")){
                    id.push(self.data("id"))
                }
            });
            if(id[0]){
                for(var i=0;i<id.length;i++){
                    obj.id=id[i];
                    $.ajax({
                        url:"/users/moveFriend",
                        type:"POST",
                        data:obj,
                        success:function(data){
                            if(i == id.length){
                                location=location;
                            }
                        }
                    })
                }
            }else{
                alert("请选择一个好友")
            }
        })
    }
};
















