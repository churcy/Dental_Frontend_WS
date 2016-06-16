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

//默认 判断是否登录,登录跳转首页,未登录重定向到登录
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
  res.render('index/login', {
    title:"功夫牙医口腔门诊管理系统-登录"
  });
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

/********** 首页的功能模块 ***********/
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

/*预约管理*/
router.get('/apptMg', function(req, res, next) {
  httpreq(req,res,{
    method:"GET",
    path:"/dentalws/uui/getFriendList"+"?opt=getFriendList&&userId="+req.cookies["userId"]+"&&systemType=1&&startPage=1",
    handle:function(info){
      var a=eval("("+info+")");
      res.render('apptMg/index', {
        a:a,
        title:"功夫牙医口腔门诊管理系统",
      });
    }
  });
});

/*回访管理*/
router.get('/follwoUpMg', function(req, res, next) {
  httpreq(req,res,{
    method:"GET",
    path:"/dentalws/uui/getFriendList"+"?opt=getFriendList&&userId="+req.cookies["userId"]+"&&systemType=1&&startPage=1",
    handle:function(info){
      var a=eval("("+info+")");
      res.render('follwoUpMg/index', {
        a:a,
        title:"功夫牙医口腔门诊管理系统",
      });
    }
  });
});

/*日程管理*/
router.get('/schedule', function(req, res, next) {
  httpreq(req,res,{
    method:"GET",
    path:"/dentalws/uui/getFriendList"+"?opt=getFriendList&&userId="+req.cookies["userId"]+"&&systemType=1&&startPage=1",
    handle:function(info){
      var a=eval("("+info+")");
      res.render('schedule/index', {
        a:a,
        title:"功夫牙医口腔门诊管理系统",
        module:"日程管理模块"
      });
    }
  });
});
module.exports = router;
