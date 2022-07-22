import { Sequelize } from "sequelize";
//连接数据库

const seq = new Sequelize({   //引用后就可以通过new关键字进行实例化，实例化后就会以连接池的形式连接到所使用的数据库
    dialect:'sqlite',//数据库类型
    storage:'./server/database/rr', //数据文件存放地址

    dialectOptions:{  //路径模块所使用的扩展选项
        decimalNumbers:true,//将数据库中提取出来的decimal数据类型转换成js的number
        
    },
    pool:{ // 使用连接池连接,连接池性能优化
        max:100,
        min:0,
       dle:10000,
    },
    define:{
        timestamps:false, //数据表中是否多一个字段自动记录时间戳
        underscored:false, //表是否自动加下划线
    }

})

async function CheckConnect(){
    try{
        await seq.authenticate()
        console.log('数据库链接成功',seq.models)
    }catch(e){
        console.log('连接失败',e)
    }
}
// CheckConnect() //测试连接
 export default seq