// 实际开发中我们可能需要针对不同文件请求给出相应文件的处理，所以就做分开处理。
// 处理来之register页面的请求

// 使用了session(express-session模块)还有处理post请求数据的body属性(body-parser和multer模块)
//引用模块

module.exports=function (app) {
	
	// get请求
	app.get("/register",function(req,res){
		res.render('register');
	});

	// 提交表单数据  post请求
	app.post('/register',function (req,res){
		// 对请求来的数据做数据库查询判断
		var User=global.dbHelper.getModel('user'),
			uname=req.body.user,
			password=req.body.password;
			User.findOne({"name":uname},function (error,doc){
                console.log(uname+"+"+password);
				if (doc) {
					console.log("用户已经存在");
					req.session.message="用户已经存在";
					res.render('register',{
						message:req.session.message}
					);
				}
				else{
					if (uname==null||uname=='') {
                        console.log("用户名不能为空");
						req.session.message="用户名不能为空";
						res.render('register',{
							message:req.session.message}
						);
					}
					else{
						User.create({
							name:uname,
							password:password
						},function (error,doc){
							if (error) {
								req.session.message="服务器错误，请重试";
								console.log(req.session.message);
								res.render('register',{
									message:req.session.message}
								);
							}else{
								console.log("创建成功");
								req.session.message="用户创建成功";
								res.render('login');
							}
						});
					}
				}

		    });
	});
}