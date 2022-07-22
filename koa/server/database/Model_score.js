import {DataTypes}from 'sequelize'
import seq from './U_Connect.js'

export default seq.define('Score table',{ 
    'id':{
        type:DataTypes.INTEGER, //数字类型
        allowNull:false , //不能为空
        primaryKey:true,//是否索引
        autoIncrement:true //是否自增
    },
    'grade':{
        type:DataTypes.INTEGER, //数字类型
    },
    'games_id':{
        type:DataTypes.INTEGER, //数字类型
    }

},{
    timestamps:false, //不需要自动加时间戳字段
  freezeTableName:true,
})