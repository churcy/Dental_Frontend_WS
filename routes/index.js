var express = require('express');
var router = express.Router();
var http = require('http');
var URL = require('url');

//��װhttpת������
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

//Ĭ�� �ж��Ƿ��¼,��¼��ת��ҳ,δ��¼�ض��򵽵�¼
router.get('/', function(req, res, next) {
  var obj={};
  obj.login=req.cookies["dockflogin"];
  if(!obj.login){
    res.redirect('/login');
  }else{
    res.redirect('/index');
  }
});

//��¼
router.get('/login', function(req, res, next) {
  res.render('index/login', {
    title:"������ҽ��ǻ�������ϵͳ-��¼"
  });
});

//��ҳ·��
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
              title:"������ҽ��ǻ�������ϵͳ"
            });
          }
        });
      }
    }
  });
});

/********** ��ҳ�Ĺ���ģ�� ***********/
/* ���߹��� */
router.get('/patientsMg', function(req, res, next) {
  httpreq(req,res,{
    method:"GET",
    path:"/dentalws/uui/getFriendList"+"?opt=getFriendList&&userId="+req.cookies["userId"]+"&&systemType=1&&startPage=1",
    handle:function(info){
      var a=eval("("+info+")");
      res.render('patientsMg/index', {
        a:a,
        title:"������ҽ��ǻ�������ϵͳ"
      });
    }
  });
});

/*ԤԼ����*/
router.get('/apptMg', function(req, res, next) {
  httpreq(req,res,{
    method:"GET",
    path:"/dentalws/uui/getFriendList"+"?opt=getFriendList&&userId="+req.cookies["userId"]+"&&systemType=1&&startPage=1",
    handle:function(info){
      var a=eval("("+info+")");
      res.render('apptMg/index', {
        a:a,
        title:"������ҽ��ǻ�������ϵͳ",
      });
    }
  });
});

/*�طù���*/
router.get('/follwoUpMg', function(req, res, next) {
  httpreq(req,res,{
    method:"GET",
    path:"/dentalws/uui/getFriendList"+"?opt=getFriendList&&userId="+req.cookies["userId"]+"&&systemType=1&&startPage=1",
    handle:function(info){
      var a=eval("("+info+")");
      res.render('follwoUpMg/index', {
        a:a,
        title:"������ҽ��ǻ�������ϵͳ",
      });
    }
  });
});

/*�ճ̹���*/
router.get('/schedule', function(req, res, next) {
  httpreq(req,res,{
    method:"GET",
    path:"/dentalws/uui/getFriendList"+"?opt=getFriendList&&userId="+req.cookies["userId"]+"&&systemType=1&&startPage=1",
    handle:function(info){
      var a=eval("("+info+")");
      res.render('schedule/index', {
        a:a,
        title:"������ҽ��ǻ�������ϵͳ",
        module:"�ճ̹���ģ��"
      });
    }
  });
});
module.exports = router;
