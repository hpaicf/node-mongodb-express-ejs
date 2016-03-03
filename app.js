
/*public目录：存放静态文件。

routes目录：存放路由文件。

views目录： 存放页面文件。

common目录：存放公共文件
*/
var express = require('express');
var app = express();
var path = require('path');
var mongoose = require("mongoose");

var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');

// 使用globa来定义全局变量dbHelper，dbHelper可以在任何模块内调用
global.dbHelper = require( './common/dbHelper' );

global.db = mongoose.connect("mongodb://127.0.0.1:27017/test1");
db.connection.on("error", function (error) {
	    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
	    console.log("------数据库连接成功！------");
});
app.use(session({
    secret:'secret',
    cookie:{
        maxAge:1000*60*30
    }
}));

// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));


// 使用engine函数注册模板引擎并指定处理后缀名为html的文件。
app.set('view engine','html');
// 使用ejs模板
app.engine( '.html', require( 'ejs' ).__express );


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// 设定静态文件目录，比如本地文件
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
    next();
});

require('./routes')(app);


app.get('/', function (req, res) {  
   res.render('register');
});


app.listen(120);