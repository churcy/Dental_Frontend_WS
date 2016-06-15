$(function(){
    patientList.init();
});

var patientList={
    init:function(){
        var obj={};
        $.ajax({
            url:"/users/getGroupList",
            type:"POST",
            data:obj,
            success:function(data){
                var a=eval("("+data+")");
                var str="";
                for(var i=0;i< a.groupList.length;i++){
                    str+="<div class='friendListItem' data-id='"+a.groupList[i].groupId+"'>";
                    str+="<span>"+a.groupList[i].groupName+"</span>";
                    str+="<span>（"+a.groupList[i].size+"）</span>";
                    str+="</div>";
                }

                $(".friendList").append(str);
                patientList.ctr();
            }
        })
    },
    ctr:function(){
        $(".friendListItem").on("click",function(){
            patientList.clear();
            var self=$(this);
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
                        str+="<div class='friendListPatient' data-id='"+a.groupMembers[i].userId+"'>";
                        str+="<div>";
                        str+="<div class='friendListPatientName'>"+a.groupMembers[i].userName+"</div>";
                        if(a.groupMembers[i].gender == .0){
                            str+="<div class='friendListPatientSex man'></div>";
                        }else if(a.groupMembers[i].gender == .1){
                            str+="<div class='friendListPatientSex woman'></div>";
                        }
                        str+="<div class='friendListPatientRequest'>"+a.groupMembers[i].requestorUserName+"</div>";
                        str+="</div>";
                        str+="<div>";
                        str+="<div class='friendListPatientOrder'>预约</div>";
                        if(a.groupMembers[i].visitStatus == 0){
                            str+="<div class='friendListPatientVisit'>回访</div>";
                        }
                        str+="</div>";
                        str+="</div>";
                    }
                    self.after(str);

                }
            })
        })
    },
    clear:function(){
        $(".friendListPatient").remove();
    }
};
