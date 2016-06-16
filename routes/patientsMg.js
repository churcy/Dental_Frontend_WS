/**
 * Created by Churcy on 2016/6/15.
 */
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

/* ���߸�����Ϣ */
router.get('/info', function(req, res, next) {
    var id=URL.parse(req.originalUrl,true).query.id;
    httpreq(req,res,{
        method:"GET",
        path:'/dentalws/uui/userInfoById'+"?opt=userInfoById&&userId="+id,
        handle:function(info){
            var a=eval("("+info+")");
            res.render('patientsMg/info', {
                a:a,
                title:"������ҽ��ǻ�������ϵͳ"
            });
        }
    });
});

/* �޸Ļ��߸�����Ϣ */
router.get('/infoEditer', function(req, res, next) {
    var id=URL.parse(req.originalUrl,true).query.id;
    httpreq(req,res,{
        method:"GET",
        path:'/dentalws/uui/userInfoById'+"?opt=userInfoById&&userId="+id,
        handle:function(info){
            var a=eval("("+info+")");
            res.render('patientsMg/infoEditer', {
                a:a,
                title:"������ҽ��ǻ�������ϵͳ"
            });
        }
    });
});

module.exports = router