// 实际开发中我们可能需要针对不同文件请求给出相应文件的处理，所以就做分开处理。
// 处理来之register页面的请求

// 使用了session(express-session模块)还有处理post请求数据的body属性(body-parser和multer模块)
//引用模块


module.exports=function (app) {
	
	// get请求
	app.get("/login",function(req,res){
		res.render('login');
	});

	// 提交表单数据  post请求
	app.post('/login',function (req,res){
		// 对请求来的数据做数据库查询判断
		var User=global.dbHelper.getModel('user'),
			uname=req.body.user,
			password=req.body.password;
			User.findOne({name: uname}, function (error, doc){
				if (error) {
					req.session.message="服务器错误，请重试";
						// res.render('login',{
						// 	'message':req.session.message
						// });
			        res.send(500);

				}
				else if (doc) {
					console.log(doc.password+"v"+password);
					if (doc.password!=password) {
						req.session.message="密码错误";
						console.log(req.session.message);
						// res.render('login',{
						// 	'message':req.session.message
						// });
			            res.send(404);
					}
					else{
						req.session.user = doc;
						req.session.message="登录成功";
						console.log(req.session.message);
						// res.render('Goods',{
						// 	'user':req.session.user
						// });
			            res.send(200);
					}
                }
                // 没有用户名
                else{
                    console.log("没有此用户，请注册");
					req.session.message="没有此用户，请注册";
					// res.render('login',{
					// 	'message':req.session.message
					// });
			        res.send(404);
                }
		    });
	});
}