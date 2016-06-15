var express = require('express');
var router = express.Router();
var http = require('http');

//封装http转发请求
function httpreq(req,res,a){
    var info;
    var option={};
    option.host='192.168.0.166';
    option.port='8080';
    option.header= a.header;
    option.method= a.method;
    option.path=encodeURI(encodeURI(a.path));
    var result = http.request(option, function(back) {
        back.setEncoding('utf8');
        back.on('data',function(d){
            info=d;
        }).on('end',function(){
            console.log(back.headers);
            console.log(info);
            a.handle(info)
        });
    });
    result.on('error', function(e) {
        console.log("Got error: " + e.message);
    });
    result.end();
}


//登陆
router.post("/login",function(req,res){
    httpreq(req,res,{
        method:"POST",
        path:'/dentalws/uui/login'+"?opt=login&&userId="+req.body.uid+"&&password="+req.body.psw,
        handle:function(info){
            res.send(info);
        }
    });
});

//注册
router.post("/register",function(req,res){
    httpreq(req,res,{
        method:"POST",
        path:'/dentalws/uui/user'+"?opt=userReg&&userName="+req.body.phone+"&&userPhone"+req.body.phone+"smsCode"+req.body.smsCode+"&&password="+req.body.psw,
        handle:function(info){
            res.send(info);
        }
    });
});

//获取个人信息
router.post("/queryUserInfo",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:'/dentalws/uui/userInfo'+"?opt=queryUserInfo&&accountId="+req.cookies["accountId"],
        handle:function(info){
            res.send(info);
        }
    });
});

//获取患者个人信息
router.post("/getPatientInfo",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:'/dentalws/uui/userInfoById'+"?opt=userInfoById&&userId="+req.body.id,
        handle:function(info){
            res.send(info);
        }
    });
});

//获取医生信息
router.post("/physicianDetail",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:'/dentalws/uui/physician/'+req.cookies["accountId"]+"?opt=physicianDetail",
        handle:function(info){
            res.send(info);
        }
    });
});

//获取短信验证码
router.post("/getSMSCode",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:'/dentalws/common/smsCode'+'?opt=sendSMSCode&&userPhone='+req.body.phone,
        handle:function(info){
            res.send(info);
        }
    });
});

//修改密码
router.post("/modifyPassword",function(req,res){
    httpreq(req,res,{
        method:"POST",
        path:'/dentalws/uui/passwd'+'?opt=changePasswd&&phone='+req.body.phone+'&&password='+req.body.newPassword+'&&smsCode='+req.body.verificationCode,
        handle:function(info){
            res.send(info);
        }
    });
});

//修改手机号
router.post("/modifyPhone",function(req,res) {
    httpreq(req, res, {
        method: "POST",
        path: '/dentalws/uui/phone' + '?opt=changePhone&&phone=' + req.body.phone + '&&orgPhone=' + req.body.orgPhone + '&&smsCode=' + req.body.smsCode,
        handle: function (info) {
            res.send(info);
        }
    });
});

//设置个人信息
router.post("/setUserInfo",function(req,res){
    httpreq(req, res, {
        method: "POST",
        path:'/dentalws/uui/userInfo/'+req.cookies["accountId"]+'?opt=setUserInfo&&sex=0&&marriage=0&&birthday=19900729&&qq=1361894156&&addr=123',
        handle: function (info) {
            res.send(info);
        }
    });
});

//获取病例列表
router.post("/medicalBookList",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:'/dentalws/medicalRecord/'+req.cookies['accountId']+'/medicalBookList?opt=medicalBookList&&startPage=1&&pageSize=10',
        handle:function(info){

        }
    });
});

//获取病例纪录
router.post("/medicalList",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:'/dentalws/medicalRecord/'+req.body.id+'/medicalList?opt=medicalList&&startPage=1&&pageSize=10',
        handle:function(info){
            res.send(info);
        }
    });
});

//给已经有病历本的患者添加就诊记录
router.post("/addVisit",function(req,res){

    res.send("1");
    /*
    httpreq(req,res,{
        method:"GET",
        path:'/dental/medicalRecord/',
        handle:function(info){
            res.send(info);
        }
    });*/
});



//判断是否登陆
router.post('/checkRigister',function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/reserve/patient?"+"opt=reserveList&&userCheck="+req.body.registerInfo,
        handle:function(info){
            res.send(info)
        }
    })
});

//注册用户创建病例
router.post("/createMedical",function(req,res){
    if(req.body.revisit == 0){
        httpreq(req,res,{
            method:"PUT",
            path:"/dentalws/medicalRecord/"+req.body.id+"/medicalRecord"+"?opt=createVisit&&doctorId="+req.cookies['accountId']+"&&allergy="+req.body.allergy+"&&complaint="+req.body.complaint+"&&historyPresentIllness="+req.body.historyPresentIllness+"&&historyPastIllness="+req.body.historyPastIllness+"&&inspect="+req.body.inspect+"&&assistantInspect="+req.body.assistantInspect+"&&diagnosis="+req.body.diagnosis+"&&diagnosisNo="+req.body.diagnosisNo+"&&treatmentPlan="+req.body.treatmentPlan+"&&treatment="+req.body.treatment+"&&medical=2313"+"&&isReback="+req.body.revisit+"&&inspectNo="+req.body.inspectNo+"&&assistantInspectNo="+req.body.assistantInspectNo+"&&diagnosisNo="+req.body.diagnosisNo+"&&treatmentPlanNo="+req.body.treatmentPlanNo+"&&treatmentNo="+req.body.treatmentNo+"&&orders="+req.body.orders,
            handle:function(info){
                res.send(info)
            }
        })
    }else if(req.body.revisit == 1){
        httpreq(req,res,{
            method:"PUT",
            path:"/dentalws/medicalRecord/"+req.body.id+"/medicalRecord"+"?opt=createVisit&&doctorId="+req.cookies['accountId']+"&&allergy="+req.body.allergy+"&&complaint="+req.body.complaint+"&&historyPresentIllness="+req.body.historyPresentIllness+"&&historyPastIllness="+req.body.historyPastIllness+"&&inspect="+req.body.inspect+"&&assistantInspect="+req.body.assistantInspect+"&&diagnosis="+req.body.diagnosis+"&&diagnosisNo="+req.body.diagnosisNo+"&&treatmentPlan="+req.body.treatmentPlan+"&&treatment="+req.body.treatment+"&&medical=2313"+"&&isReback="+req.body.revisit+"&&rebackDate="+req.body.revisitDate+"&&inspectNo="+req.body.inspectNo+"&&assistantInspectNo="+req.body.assistantInspectNo+"&&diagnosisNo="+req.body.diagnosisNo+"&&treatmentPlanNo="+req.body.treatmentPlanNo+"&&treatmentNo="+req.body.treatmentNo+"&&orders="+req.body.orders,
            handle:function(info){
                res.send(info)
            }
        })
    }

});

//非注册用户创建病例
router.post("/createMedicalTmp",function(req,res){
    if(req.body.revisit == 0){
        httpreq(req,res,{
            method:"PUT",
            path:"/dentalws/medicalRecord/"+req.cookies['accountId']+"/medicalRecordTmp"+"?groupId="+req.body.groupId+"&&opt=createMedicalTmp"+"&&realName="+req.body.name+"&&gender=0&&marital=0&&phone="+req.body.mobile+"&&birthday="+req.body.birthday+"&&allergy="+req.body.allergy+"&&complaint="+req.body.complaint+"&&historyPresentIllness="+req.body.historyPresentIllness+"&&historyPastIllness="+req.body.historyPastIllness+"&&inspect="+req.body.inspect+"&&assistantInspect="+req.body.assistantInspect+"&&diagnosis="+req.body.diagnosis+"&&treatmentPlan="+req.body.treatmentPlan+"&&treatment="+req.body.treatment+"&&medical=2313"+"&&isReback="+req.body.revisit+"&&inspectNo="+req.body.inspectNo+"&&assistantInspectNo="+req.body.assistantInspectNo+"&&diagnosisNo="+req.body.diagnosisNo+"&&treatmentPlanNo="+req.body.treatmentPlanNo+"&&treatmentNo="+req.body.treatmentNo+"&&orders="+req.body.orders,
            handle:function(info){
                res.send(info)
            }
        })
    }else if(req.body.revisit == 1){
        httpreq(req,res,{
            method:"PUT",
            path:"/dentalws/medicalRecord/"+req.cookies['accountId']+"/medicalRecordTmp"+"?groupId="+req.body.groupId+"&&opt=createMedicalTmp"+"&&realName="+req.body.name+"&&gender=0&&marital=0&&phone="+req.body.mobile+"&&birthday="+req.body.birthday+"&&allergy="+req.body.allergy+"&&complaint="+req.body.complaint+"&&historyPresentIllness="+req.body.historyPresentIllness+"&&historyPastIllness="+req.body.historyPastIllness+"&&inspect="+req.body.inspect+"&&assistantInspect="+req.body.assistantInspect+"&&diagnosis="+req.body.diagnosis+"&&treatmentPlan="+req.body.treatmentPlan+"&&treatment="+req.body.treatment+"&&medical=2313"+"&&isReback="+req.body.revisit+"&&rebackDate="+req.body.revisitDate+"&&inspectNo="+req.body.inspectNo+"&&assistantInspectNo="+req.body.assistantInspectNo+"&&diagnosisNo="+req.body.diagnosisNo+"&&treatmentPlanNo="+req.body.treatmentPlanNo+"&&treatmentNo="+req.body.treatmentNo+"&&orders="+req.body.orders,
            handle:function(info){
                res.send(info)
            }
        })
    }
});

//获取病历本详情
router.post("/medicalBookDetail",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/medicalRecord/"+req.body.id+"?opt=medicalBookDetail&&startPage=1&&pageSize=10",
        handle:function(info){
            res.send(info)
        }
    })
});


//按天获取全部日程
router.post("/getStrokeByDay",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/day/"+req.cookies['accountId']+"/stroke?opt=getStrokeByDay&&date="+req.body.stratDate+"&&type="+req.body.type,
        handle:function(info){
            info = eval('(' + info + ')');
            var str="";
            for(var i=1;i<24;i++){
                str+="<div class='day_item'>";
                str+="<div class='day_time'>"+i+":00</div>";
                str+="<div class='day_ctn'>";
                str+="<div class='day_list'>";
                for(var key in info.stroke){
                    if(key == i){
                        for(var j=0;j<info.stroke[key].length;j++){
                            str+="<div class='day_list_item' data-id='"+info.stroke[key][j].id+"'>";
                            str+="<input type='hidden' class='hiddenInfo' value='"+JSON.stringify(info.stroke[key][j])+"' />";
                            str+="<p>"+info.stroke[key][j].remark+"</p>";
                            str+="<p>"+info.stroke[key][j].subject+"</p>";
                            str+="<p>"+info.stroke[key][j].time+"</p>";
                            str+="<div class='menu'>";
                            str+="<div class='menu_item addStroke'>新增行程</div>";
                            //str+="<div class='menu_item'>新增预约</div>";
                            str+="<div class='menu_item editerStroke'>编辑</div>";
                            //str+="<div class='menu_item'>删除</div>";
                            str+="</div>";
                            str+="</div>";
                        }
                    }
                }
                for(var key in info.reserve){
                    if(key == i){
                        for(var j=0;j<info.reserve[key].length;j++){
                            str+="<div class='day_list_item' data-id='"+info.reserve[key][j].id+"'>";
                            str+="<p>"+info.reserve[key][j].patientName+"</p>";
                            str+="<p>"+info.reserve[key][j].startTime+"</p>";
                            str+="<p>"+info.reserve[key][j].endTime+"</p>";
                            str+="</div>";
                        }
                    }
                }
                str+="</div></div></div>";
            }
            res.send(str);
        }
    })
});


//按周获取全部日程
router.post("/getStrokeByWeek",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/week/"+req.cookies['accountId']+"/stroke?opt=getStrokeByWeek&&type="+req.body.type+"&&stratDate="+req.body.stratDate+"&&endDate="+req.body.endDate,
        handle:function(info){
            info = eval('(' + info + ')');
            var str="";
            for(var i=1;i<24;i++){
                str+="<div class='week_item'>";
                str+="<div class='week_time'>"+i+":00</div>";
                str+="<div class='week_ctn'>";
                str+="<div class='week_list'>";
                for(var j=0;j<7;j++){
                    str+="<div class='week_list_item'>";
                    for(var key in info.stroke){
                        if(key == i){
                            for(var item in info.stroke[key]){
                                var eq=Math.pow(2,(6-j));
                                if(item == eq){
                                    str+="<p><span>"+info.stroke[key][item]+"</span>个行程</p>";
                                }
                            }
                        }
                    }
                    for(var key in info.reserve){
                        if(key == i){
                            for(var item in info.reserve[key]){
                                var eq=Math.pow(2,(6-j));
                                if(item == eq){
                                    str+="<p><span>"+info.reserve[key][item]+"</span>个预约</p>";
                                }
                            }
                        }
                    }
                    str+="</div>";
                }
                str+="</div></div></div>";
            }
            res.send(str);
        }
    })
});

//按月获取全部日程
router.post("/getStrokeByMonth",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/month/"+req.cookies['accountId']+"/stroke?opt=getStrokeByMonth&&type="+req.body.type+"&&stratDate="+req.body.stratDate+"&&endDate="+req.body.endDate,
        handle:function(info){
            info = eval('(' + info + ')');
            var str="";
            str+="<div class='month_ctn'>";
            str+="<div class='month_item_tt'>";
            str+="<div class='month_item_ctn_item'>周一</div>";
            str+="<div class='month_item_ctn_item'>周二</div>";
            str+="<div class='month_item_ctn_item'>周三</div>";
            str+="<div class='month_item_ctn_item'>周四</div>";
            str+="<div class='month_item_ctn_item'>周五</div>";
            str+="<div class='month_item_ctn_item'>周六</div>";
            str+="<div class='month_item_ctn_item'>周日</div>";
            str+="</div>";
            var year=req.body.year;
            var month=req.body.month;
            var len=new Date(year,month,0).getDate();
            var start=new Date(year,month-1,1).getDay();
            for(var i=2;i<44;i++){
                str+="<div class='month_item_ctn_item'>";
                if(start == 0 || start == 5 || start == 6){
                    start=(start == 0)?7:start;
                    if(i>start && i<=(start+len)){
                        str+="<p class='date'>"+(i-start)+"</p>";
                        for(var key in info.stroke){
                            if(key == (i-start)){
                                str+="<p class='stroke'><span>"+info.stroke[key]+"</span>个行程</p>";
                            }
                        }
                        for(var key in info.reserve){
                            if(key == (i-start)){
                                str+="<p class='reserve'><span>"+info.reserve[key]+"</span>个预约</p>";
                            }
                        }
                    }
                }else{
                    if(i>start && i<=(start+len)){
                        str+="<p class='date'>"+(i-start)+"</p>";
                        for(var key in info.stroke){
                            if(key == (i-start)){
                                str+="<p class='stroke'><span>"+info.stroke[key]+"</span>个行程</p>";
                            }
                        }
                        for(var key in info.reserve){
                            if(key == (i-start)){
                                str+="<p class='reserve'><span>"+info.reserve[key]+"</span>个预约</p>";
                            }
                        }
                    }
                }

                str+="</div>";
            }
            str+="</div>";
            res.send(str);

        }
    })
});

//新增行程
router.post("/createStroke",function(req,res){
    httpreq(req,res,{
        method:"POST",
        path:"/dentalws/stroke/"+req.cookies["accountId"]+"/stroke?opt=createStroke&&subject="+req.body.subject+"&&place="+req.body.place+"&&remark="+req.body.remark+"&&time="+req.body.time+"&&repeat="+req.body.repeat,
        handle:function(info){
            res.send(info);
        }
    });
});



//获取医生能够接受预约的时间段
router.post("/physicianTime",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/reserve/"+req.cookies["accountId"]+"/physicianTime?opt=physicianTime",
        handle:function(info){
            res.send(info);
        }
    });
});

//设置医生能够接受预约的时间段
router.post("/setOrderTime",function(req,res){
    httpreq(req,res,{
        method:"POST",
        path:'/dentalws/reserve/'+req.cookies['accountId']+'/registerSetting'+'?opt=registerSetting&&weekDays='+req.body.weekDays+"&&startTime="+req.body.startTime+"&&endTime="+req.body.endTime+"&&repeat="+req.body.repeat+"&&count="+req.body.count,
        handle:function(info){
            res.send(info);
        }
    });
});

//获取回访列表
router.post("/rebackList",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/reback/"+req.cookies['accountId']+"/rebackList"+"?opt=rebackDetail&&startPage=1&&pageSize=10",
        handle:function(info){
            res.send(info);
        }
    });
});


//获取问题列表
router.post("/getProblemList",function(req,res){
    var str="";
    str+="<div class='question'>";
    str+="<div class='asker_head'><img src='' /> 阿森纳</div>";
    str+="<div class='asker_ctn'>";
    str+="<div class='question_tt'>牙神经疼痛怎么办？</div>";
    str+="<div class='asker_info'><div class='item'>男</div><div class='item'>25</div><div class='item'>2016-01-08 13:23:17</div><div class='fr'><span class='red f16'>0</span>个回答</span></div></div>";
    str+="<div class='question_desc'><div class='tt'>问题描述：</div><div class='ctn'>没到十八岁，所以补得不是正式的牙，因为左门牙摔了半颗，可能伤到牙神经，所以就补了非正式的半颗牙。到现在已经五年了，基本没什么事，就是后几年几乎每一年牙神经都会痛一段时间 是那种不震荡脑袋不会痛，自己调一下跑一下打一下脑袋就会痛的痛，不是很痛。这是什么情况？</div></div>";
    str+="<div class='question_label'><div class='tt'>问题标签：</div><div class='ctn'><div class='item'>牙神经疼痛</div><div class='item'>补牙</div></div></div>";
    str+="<div class='answer_text' contenteditable='true'></div>";
    str+="<div class='answer_submit'>我来回答</div>";
    str+="<div class='answer_total'><div>2个医生回答</div></div>";
    str+="</div>";
    for(var i=0;i<2;i++){
        str+="<div class='answer_item'>";
        str+="<div class='answer_item_left'><img src='' />XXX</div>";
        str+="<div class='answer_item_right'>";
        str+="<div class='answer_info'><div class='position'>XXX医院，XXX科室</div><div class='date'>2015-12-12  13:23:47</div></div>";
        str+="<div class='answer_detail'><span>建议：</span>没到十八岁，所以补得不是正式的牙，因为左门牙摔了半颗，可能伤到牙神经，所以就补了非正式的半颗牙。到现在已经五年了，基本没什么事，就是后几年几乎每一年牙神经都会痛一段时间 是那种不震荡脑袋不会痛，自己调一下跑一下打一下脑袋就会痛的痛，不是很痛。这是什么情况？</div>";
        str+="<div class='like'><div class='like_img'></div><div class='like_text'>赞（<span>0</span>）</div></div>";
        str+="</div>";
        str+="</div>";
    }
    str+="</div>";
    res.send(str);
});

//获取医生用户分组信息
router.post("/getFriendList",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/uui/getFriendList"+"?opt=getFriendList&&userId="+req.cookies["doctorId"]+"&&systemType=0",
        handle:function(info){
           res.send(info);
        }
    });
});

//获取单独一组的信息
router.post("/getSolusFriendList",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/uui/getFriendList"+"?opt=getFriendList&&userId="+req.cookies["doctorId"]+"&&systemType=0",
        handle:function(info){
            var a=eval("("+info+")");
            var str="";
            for(var i in a.friendList){
                if(i == req.body.name){
                    if(a.friendList[i].length){
                        if(a.friendList[i][0].friendUserId){
                            for(var j=0;j<a.friendList[i].length;j++){
                                str+="<div class='patientListModeltableListRow' data-id='"+a.friendList[i][j].friendUserId+"'>";
                                str+="<div class='column01'><input type='checkbox' /></div>";
                                str+="<div class='column02'>"+a.friendList[i][j].friendName+"</div>";
                                str+="<div class='column03'>女</div>";
                                if(a.friendList[i][j].friendType == 0){
                                    str+="<div class='column04'>男</div>";
                                }else if(a.friendList[i][j].friendType == 1){
                                    str+="<div class='column04'>女</div>";
                                }
                                str+="<div class='column05'>联系电话</div>";
                                str+="<div class='column06'>最近诊断时间</div>";
                                str+="<div class='column07'>"+a.friendList[i][j].groupName+"</div>";
                                str+="</div>";
                            }
                        }
                    }
                }
            }
            res.send(str);
        }
    });
});


//获取分组信息
router.post("/getGroupList",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/uui/getGroupList"+"?opt=getGroupList&&userId="+req.cookies["userId"],
        handle:function(info){
            res.send(info);
        }
    });
});


//获取系统病例模板根目录
router.post("/getRootNodes",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/medicalRecord/getRootNodes"+"?opt=getRootNodes",
        handle:function(info){
            res.send(info);
        }
    });
});

//获取个人病例模板根节点
router.post("/getPersonalRootNodes",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/medicalRecord/getPersonalRootNodes"+"?opt=getRootNodes"+"&&doctorId="+req.cookies["dId"],
        handle:function(info){
            res.send(info);
        }
    });
});



//获取病例模板某个包下面的目录
router.post("/getChildNodes",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/medicalRecord/getChildNodes"+"?opt=getChildNodes&&nodeId="+req.body.id,
        handle:function(info){
            res.send(info);
        }
    });
});

//获取病例模板
router.post("/getMedicalTemplate",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/medicalRecord/getMedicalTemplate"+"?opt=getMedicalTemplate&&templateId="+req.body.tid,
        handle:function(info){
            res.send(info);
        }
    });
});

//新建病例节点
router.post("/createMedicalNode",function(req,res){
    httpreq(req,res,{
        method:"POST",
        path:"/dentalws/medicalRecord/createMedicalNode"+"?opt=createMedicalNode&&parentNodeId="+req.body.id+"&&nodeName="+req.body.name+"&&doctorId="+req.cookies['dId'],
        handle:function(info){
            res.send(info);
        }
    });
});


//新建系统病例节点
router.post("/createSysMedicalNode",function(req,res){
    httpreq(req,res,{
        method:"POST",
        path:"/dentalws/medicalRecord/createMedicalNode"+"?opt=createMedicalNode&&parentNodeId="+req.body.id+"&&nodeName="+req.body.name,
        handle:function(info){
            res.send(info);
        }
    });
});

//创建根节点
router.post("/createPersonalMedicalNode",function(req,res){
    httpreq(req,res,{
        method:"POST",
        path:"/dentalws/medicalRecord/createMedicalNode"+"?opt=createMedicalNode&&doctorId="+req.cookies['dId']+"&&nodeName="+req.body.name,
        handle:function(info){
            res.send(info);
        }
    });
});

//新建病例模板
router.post("/createMedicalTemplate",function(req,res){
    httpreq(req,res,{
        method:"POST",
        path:"/dentalws/medicalRecord/createMedicalTemplate"+"?opt=createMedicalTemplate&&nodeId="+req.body.id+"&&complaint="+req.body.complaint+"&&historyPresentIllness="+req.body.historyPresentIllness+"&&historyPastIllness="+req.body.historyPastIllness+"&&inspect="+req.body.inspect+"&&assistantInspect="+req.body.assistantInspect+"&&diagnosis="+req.body.diagnosis+"&&treatmentPlan="+req.body.treatmentPlan+"&&treatment="+req.body.treatment+"&&orders="+req.body.orders,
        handle:function(info){
            res.send(info);
        }
    });
});



//修改病例模板
router.post("/modifyMedicalTemplate",function(req,res){
    httpreq(req,res,{
        method:"POST",
        path:"/dentalws/medicalRecord/modifyMedicalTemplate"+"?opt=modifyMedicalTemplate"+"&&templateId="+req.body.tid+"&&nodeId="+req.body.id+"&&complaint="+req.body.complaint+"&&historyPresentIllness="+req.body.historyPresentIllness+"&&historyPastIllness="+req.body.historyPastIllness+"&&inspect="+req.body.inspect+"&&assistantInspect="+req.body.assistantInspect+"&&diagnosis="+req.body.diagnosis+"&&treatmentPlan="+req.body.treatmentPlan+"&&treatment="+req.body.treatment+"&&orders="+req.body.orders,
        handle:function(info){
            res.send(info);
        }
    });
});

//删除病例模板
router.post("/deleteMedicalTemplate",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/medicalRecord/deleteMedicalTemplate"+"?opt=deleteMedicalTemplate"+"&&templateId="+req.body.tid,
        handle:function(info){
            res.send(info);
        }
    });
});

//删除病例节点
router.post("/deleteMedicalNode",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/medicalRecord/deleteNode"+"?opt=deleteNode"+"&&nodeId="+req.body.id,
        handle:function(info){
            res.send(info);
        }
    });
});

//增加分组
router.post("/addGroup",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/uui/addGroup"+"?opt=addGroup"+"&&userId="+req.body.id+"&&groupName="+req.body.name,
        handle:function(info){
            res.send(info);
        }
    });
});
//删除分组
router.post("/deleteGroup",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/uui/deleteGroup"+"?opt=deleteGroup"+"&&userId="+req.body.id+"&&groupId="+req.body.gId,
        handle:function(info){
            res.send(info);
        }
    });
});
//获取小组成员
router.post("/getGroupMenber",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/uui/getFriendByGroupId"+"?opt=getFriendByGroupId"+"&&groupId="+req.body.id,
        handle:function(info){
            res.send(info);
        }
    });
});

//删除小组成员
router.post("/deleteFriend",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/uui/deleteFriend"+"?opt=deleteFriend&&groupId="+req.body.gId+"&&toUserId="+req.body.id+"&&fromUserId="+req.cookies["doctorId"],
        handle:function(info){
            res.send(info);
        }
    });
});

//移动好友
router.post("/moveFriend",function(req,res){
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/uui/moveFriend"+"?opt=moveFriend&&groupId="+req.body.gId+"&&toUserId="+req.body.id+"&&fromUserId="+req.cookies["doctorId"],
        handle:function(info){
            res.send(info);
        }
    });
});






module.exports = router;
