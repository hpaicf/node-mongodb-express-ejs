// 实际开发中我们可能需要针对不同文件请求给出相应文件的处理，所以就做分开处理。
// 处理来之register页面的请求

// 使用了session(express-session模块)还有处理post请求数据的body属性(body-parser和multer模块)
//引用模块


module.exports=function (app) {
	
	// get请求
	app.get("/Goods",function(req,res){
		res.render('Goods');
	});

	// 提交添加商品表单数据  post请求
	app.post('/addGoods',function(req,res){
		// 对请求来的数据做数据库查询判断
		var goods=global.dbHelper.getModel('goods'),
			goodsname=req.body.goodsname,
			goodsprice=req.body.goodsprice;
			goods.find({"goodsname":goodsname},function(error,doc){
				if (doc) {
					console.log(doc);
					req.session.error="商品库已经有此产品";
					res.send(404);
				}
                // 
                else{
                    console.log("没有此用户，请注册");
					req.session.message="没有此用户，请注册";
					res.render('login');
                }
		    });
	});
}