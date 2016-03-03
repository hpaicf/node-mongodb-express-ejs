
// 保存各个集合的Schema文件(集合属性)
// 便于我们查看和访问
// 
module.exports={
	user:{
		name:{type:String,required:true},
		password: { type: String, required: true },
        gender: { type: Boolean, default: true }
	}
};