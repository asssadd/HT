import Model_Games from "../database/Model_Games.js"
import Model_Comment from "../database/Model_Comment.js"
import Model_score from "../database/Model_score.js"
export default{
    IndexList: (ctx) => Answer(ctx,IndexList),
    AddNewGame: (ctx) => Answer(ctx,AddNewGame),
    comments: (ctx) =>Answer(ctx,comments),
    Addcomments: (ctx) =>Answer(ctx,Addcomments),
    score:(ctx) =>Answer(ctx,score),
    visitscore:(ctx) =>Answer(ctx,visitscore),
}
/**
 * 高阶函数传入其他函数用来处理所有返回数据
 */
async function Answer(ctx,func){
    //ctx是koa中发送和接收数据的上下文所有信息都可以从ctx中获取
     try{//哪怕数据库读取失败 半途截获出错信息让服务器不待机
         const a = await func(ctx) //尝试允许传入参数  多为读取数据库
         const ans = { //返回客户端内容
             success : 1,
             msg:a
         }
         ctx.set('Content-Type', 'application/json')
         return ctx.body = JSON.stringify (ans) //在返回信息的body中传输查询信息
     }
     catch(e){
         const ans = {
             success :0 ,
       msg: e.message
            }
            ctx.set('Content-Type', 'application/json')
            return ctx.body = JSON.stringify (ans) //在返回信息的body中传输查询信息
     }
}
/**
 * 访问数据库得到排行榜列表
 */
async function IndexList(ctx){
//因为是get访问所以可以从query 中获取客户端传入的参数
const query = ctx.request.query
const page = parseInt(query.page)|| 0 //转换客户端传入的页码
//从数据库拿游戏列表
 const pageCount = 12 //每页数据量
const offset = pageCount * page //翻页时需要跳过的数据量

const opt = {
    //从数据库查询设置
    where:{}, //查询所有内容
    limit: pageCount, //查询出多少条数据
    offset, //从第几条开始往下查
    order: [ //排序条件 这里是一个数组可以输入多条排序条件
            ['id','DESC'] //按id逆排序
    ] 
}
const ans = await Model_Games.findAll(opt) //查询所有满足条件的内容
console.log('查询的结果',ans)
for(let i of ans){
    i.link = decodeURIComponent(i.link)
    i.thumbnail = decodeURIComponent(i.thumbnail)
    i.video = decodeURIComponent (i.video)
}
return ans
}

async function comments(ctx){

//因为是get访问所以可以从query 中获取客户端传入的参数
const query = ctx.request.query
const page = parseInt(query.page)|| 0 //转换客户端传入的页码
//从数据库拿游戏列表
 const pageCount = 12 //每页数据量
const offset = pageCount * page //翻页时需要跳过的数据量

const opt = {
    //从数据库查询设置
    where:{}, //查询所有内容
    limit: pageCount, //查询出多少条数据
    offset, //从第几条开始往下查
    order: [ //排序条件 这里是一个数组可以输入多条排序条件
            ['id','DESC'] //按id逆排序
    ] 
}
const ans = await Model_Comment.findAll(opt) //查询所有满足条件的内容
console.log('查询的结果',ans)
for(let i of ans){
   
    i.user = decodeURIComponent (i.user)
}
return ans

}


/**
 * 新增一个游戏
 */
async function AddNewGame(ctx) {
    const query = ctx.request.query
    console.log('客户端传入的内容',query)
    if(!query.title) throw Error('没有标题')
    if(!query.subtitle) throw Error('没有标题')
    //throw Error 相当于 return false 抛出错误 会被try获取到

    const obj = {
        title:query.title,
        subtitle: query.subtitle,
        link: query.link,
    }
    await Model_Games.create(obj) //新增一个数据
    return '新增成功'
}

//添加评论
async function Addcomments(ctx){
    const query = ctx.request.body
    console.log('客户端传入的内容',query)
    if(!query.comment) throw Error('没有评论')
    if(!query.name) throw Error('没有名字')
    //throw Error 相当于 return false 抛出错误 会被try获取到

    const obj = {
       name:query.name,
        comment: query.comment,
         avatar:query.avatar,
         date:query.date,
        games_Id: query.games_Id
    }
  
    await Model_Comment.create(obj) //新增一个数据
    return '新增成功'
}

//添加评分

async function score(ctx){
    const query = ctx.request.body
    console.log('客户端传入的内容',query)
    if(!query.grade) throw Error('没有评分')
    

    const obj = {
      
       grade:query.grade,
        games_id:query.games_id
    }
  
    await Model_score.create(obj) //新增一个数据
    return '新增成功'
}

//访问评论
async function visitscore(){

    const opt = {    
        where:{}, //查询所有内容        
    }
    const ans = await Model_score.findAll(opt) //查询所有满足条件的内容
    console.log('查询的结果',ans)
    return ans
    }
// controller控制器