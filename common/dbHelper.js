// 公共方法  操作这些Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    models = require('./models');


// model  由Schema构造生成的模型，具有数据库操作的行为
// 每一个nodel和Schema相绑定
for(var m in models) {
    mongoose.model(m, new Schema(models[m]));
}

// 公共方法
module.exports = {
    getModel: function (type) {
        return _getModel(type);
    }
};

// 获取集合的Model模型  可以对数据库有实质性的操作
var _getModel = function (type) {
    return mongoose.model(type);
};
