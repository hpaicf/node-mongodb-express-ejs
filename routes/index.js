// 专门用来存放添加的文件
// 在app.js文件中直接引用index.js文件就可以访问这些存放的文件了  就不需要在app.js里一个一个去获取了
module.exports = function ( app ) {
    require('./register')(app);
    require('./login')(app);
    require('./Goods')(app);
};