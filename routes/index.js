var express = require('express');
var router = express.Router();
var http = require('http');
var URL = require('url');

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


//默认
router.get('/', function(req, res, next) {
    var obj={};
    obj.login=req.cookies["dockflogin"];
    if(!obj.login){
        res.redirect('/login');
    }else{
        res.redirect('/index');
    }
});

//登录
router.get('/login', function(req, res, next) {
    res.render('function/login', {
        title:"功夫牙医口腔门诊管理系统-登录"
    });
});

//注册
router.get('/register', function(req, res, next) {
    res.render('function/register', {
        title:"功夫牙医口腔门诊管理系统-注册"
    });
});

//注册个人信息
router.get('/registerPerson', function(req, res, next) {
    res.render('function/registerPerson', {
        title:"功夫牙医口腔门诊管理系统-注册"
    });
});

//注册职业信息
router.get('/registerJob', function(req, res, next) {
    res.render('function/registerJob', {
        title:"功夫牙医口腔门诊管理系统-注册"
    });
});

//创建医院
router.get('/creatHospital', function(req, res, next) {
    res.render('function/creatHospital', {
        title:"功夫牙医口腔门诊管理系统-注册"
    });
});

//审核医院
router.get('/reviewHospital', function(req, res, next) {
    res.render('function/reviewHospital', {
        title:"功夫牙医口腔门诊管理系统-注册"
    });
});

//审核医院
router.get('/reviewHospital', function(req, res, next) {
    res.render('function/reviewHospital', {
        title:"功夫牙医口腔门诊管理系统-注册"
    });
});

//资格认证
router.get('/registerQualification', function(req, res, next) {
    res.render('function/registerQualification', {
        title:"功夫牙医口腔门诊管理系统-注册"
    });
});

//找回密码
router.get('/findPassword', function(req, res, next) {
    res.render('function/findpassword',{title:"功夫牙医口腔门诊管理系统-找回密码"});
});



//首页路由
router.get('/index', function(req, res) {
    httpreq(req,res,{
        method:"GET",
        path:'/dentalws/uui/userInfo'+"?opt=queryUserInfo&&accountId="+req.cookies["accountId"],
        handle:function(info){
            var a=eval("("+info+")");
            console.log(a.status);
            if(a.status == "000"){
                httpreq(req,res,{
                    method:"GET",
                    path:'/dentalws/common/getIndexData'+"?opt=getIndexData&&accountId="+req.cookies["accountId"]+"&&startDate=20160602",
                    handle:function(info){
                        var b=eval("("+info+")");
                        res.render('index/index', {
                            name: a.userInfo.realName,
                            indexInfo:b,
                            title:"功夫牙医口腔门诊管理系统"
                        });
                    }
                });
            }
        }
    });
});


/* 患者管理 */
router.get('/patientsMg', function(req, res, next) {
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/uui/getFriendList"+"?opt=getFriendList&&userId="+req.cookies["userId"]+"&&systemType=1&&startPage=1",
        handle:function(info){
            var a=eval("("+info+")");
            res.render('patientsMg/index', {
                a:a,
                title:"功夫牙医口腔门诊管理系统"
            });
        }
    });
});

/* 患者个人信息 */
router.get('/patientsMg/info', function(req, res, next) {
    var id=URL.parse(req.originalUrl,true).query.id;
    httpreq(req,res,{
        method:"GET",
        path:'/dentalws/uui/userInfoById'+"?opt=userInfoById&&userId="+id,
        handle:function(info){
            var a=eval("("+info+")");
            res.render('patientsMg/info', {
                a:a,
                title:"功夫牙医口腔门诊管理系统"
            });
        }
    });
});

/* 修改患者个人信息 */
router.get('/patientsMg/infoEditer', function(req, res, next) {
    var id=URL.parse(req.originalUrl,true).query.id;
    httpreq(req,res,{
        method:"GET",
        path:'/dentalws/uui/userInfoById'+"?opt=userInfoById&&userId="+id,
        handle:function(info){
            var a=eval("("+info+")");
            res.render('patientsMg/infoEditer', {
                a:a,
                title:"功夫牙医口腔门诊管理系统"
            });
        }
    });
});

/* 电子病历 */
router.get('/patientsMg/record', function(req, res, next) {
    httpreq(req,res,{
        method:"GET",
        path:"/dentalws/uui/getFriendList"+"?opt=getFriendList&&userId="+req.cookies["userId"]+"&&systemType=0&&startPage=1",
        handle:function(info){
            var a=eval("("+info+")");
            res.render('patientsMg/record', {
                a:a,
                title:"功夫牙医口腔门诊管理系统"
            });
        }
    });
});




//创建病例
router.get('/index/creatRecord',function(req,res){
    var obj={};
    obj.name=req.cookies["name"];
    res.render('work/creatRecord', {
        name:obj.name,
        title:"功夫医生-工作站"
    });
});

//病理管理
router.get('/index/caseManage',function(req,res){
    var obj={};
    obj.name=req.cookies["name"];
    res.render('work/caseManage', {
        name:obj.name,
        title:"功夫医生-工作站"
    });
});

//全部日程
router.get('/index/allSchedule',function(req,res){
    var obj={};
    obj.name=req.cookies["name"];
    res.render('work/allSchedule', {
        name:obj.name,
        title:"功夫医生-工作站"
    });
});


//查看日程
router.get('/index/schedul',function(req,res){
    var obj={};
    obj.name=req.cookies["name"];
    res.render('work/schedul', {
        name:obj.name,
        title:"功夫医生-工作站"
    });
});

//创建行程
router.get('/index/creatSchedul',function(req,res){
    var obj={};
    obj.name=req.cookies["name"];
    res.render('work/creatSchedul', {
        name:obj.name,
        title:"功夫医生-工作站"
    });
});

//查看预约
router.get('/index/order',function(req,res){
    var obj={};
    obj.name=req.cookies["name"];
    res.render('work/order', {
        name:obj.name,
        title:"功夫医生-工作站"
    });
});

//设置预约时间
router.get('/index/setOrderTime',function(req,res){
    var obj={};
    obj.name=req.cookies["name"];
    res.render('work/setOrderTime', {
        name:obj.name,
        title:"功夫医生-工作站"
    });
});

//查看回访
router.get('/index/revisit',function(req,res){
    var obj={};
    obj.name=req.cookies["name"];
    res.render('work/revisit', {
        name:obj.name,
        title:"功夫医生-工作站"
    });
});

//浏览问题
router.get('/index/viewQuestion',function(req,res){
    var obj={};
    obj.name=req.cookies["name"];
    res.render('work/viewQuestion', {
        name:obj.name,
        title:"功夫医生-工作站"
    });
});

//已回答问题
router.get('/index/askedQuestion',function(req,res){
    var obj={};
    obj.name=req.cookies["name"];
    res.render('work/askedQuestion', {
        name:obj.name,
        title:"功夫医生-工作站"
    });
});





//个人中心
router.get("/user",function(req,res){
    res.render('user/userCtr',{
        "title":"个人中心"
    });
});




module.exports = router;
