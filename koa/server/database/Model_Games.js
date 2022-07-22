import {DataTypes}from 'sequelize'
import seq from './U_Connect.js'

// 定义模型
export default seq.define('games',{ // 在这里定义模型属性
    //定义数据表结构 字段   对象中的一个属性相当于表中的一个字段。
     'id':{
         type:DataTypes.INTEGER, //数字类型
         allowNull:false , //不能为空
         primaryKey:true,//是否索引
         autoIncrement:true //是否自增
     },
     'link':{
         type:DataTypes.TEXT,
          allowNull:false,
     },
     //暂时省略is_字段
     'is_team': {type: DataTypes.INTEGER},
     'title': {type: DataTypes.TEXT},
     'thumbnail': {type: DataTypes.TEXT},
     'subtitle': {type: DataTypes.TEXT},
     'video': {type :DataTypes.TEXT},
     //评分省略
     'rating': {type :DataTypes.TEXT},
  'update_time':{type :DataTypes.INTEGER},
    },{
  timestamps:false, //不需要自动加时间戳字段
  freezeTableName:true, //不修改表名字   Sequelize 将推断表名称等于模型名称,而无需进行任何修改：
    
})


// database 数据库