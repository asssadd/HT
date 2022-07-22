import {DataTypes}from 'sequelize'
import seq from './U_Connect.js'

//定义模型
export default seq.define('comment_list1',{

    'id':{
        type:DataTypes.INTEGER, //数字类型
         allowNull:true , //不能为空
         primaryKey:true,//是否索引
         autoIncrement:true //是否自增
    },
    'date':{type: DataTypes.TEXT},
    'name':{type: DataTypes.TEXT},
    'comment':{type: DataTypes.TEXT},
    'avatar':{type: DataTypes.TEXT},
    'games_Id':{type:DataTypes.INTEGER},
   
},{
        timestamps:false, //不需要自动加时间戳字段
  freezeTableName:true,
    
})