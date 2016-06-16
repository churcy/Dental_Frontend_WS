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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


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

module.exports = router;
