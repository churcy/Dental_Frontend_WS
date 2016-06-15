var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var upload = require('./routes/upload');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(favicon(path.join(__dirname, 'public', 'icon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//登陆拦截
app.use(function (req, res, next) {
  var url = req.originalUrl;
  var white=["/login","/findPassword","/register"];
  var check=false;
  if(url.indexOf("users") > -1){
    console.log("接口请求");
  }else{
    console.log(req.cookies["dockflogin"]);
    if (req.cookies["dockflogin"] != "true") {
      for(var i=0;i<white.length;i++){
        if(url == white[i]){
          check=true;
          console.log("进入白名单");
        }
      }
      if(!check){
        console.log("没有登陆");
        return res.redirect("/login");
      }
    }
  }
  next();
});


//获取路径
app.use('/', routes);
app.use('/users', users);
app.use('/upload',upload);





// 404错误
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//启动服务
app.listen(80,function(){
  console.log("服务启动");
});

module.exports = app;
