//服务端入口文件
//在终端中进入koa目录运行npm init 安装node.js配置文件
//安装完配置 会在目录下生成一个package.json配置文件存所有nodo.js
//远行npm install koa --save安装koa2 web框架文件存入到node_MODULES目录
//package.json中加入"type" :"module" 让我们可以在node.js中使用import
//前后端分离为了seo后期可以加入服务端渲染
//我们系统可以使用sequelize作为数据库中间件（orm工具）支持postgre MySQL MariaDB SQLite MSSQL MongoDB

//3人一组一个负责vue一个负责小程序一个负责服务端
//将列表页面显示出来可以实现翻页功能
//至少5个接口api 可以get可以post   可以查询sequelize中文文档
//创建一个表 评论 ：评论人 头像 留言 日期 在navicat
//node.js中实现查询增加
// 联调最终小程序vue都能访问列表和留言

import koa from 'koa' //web 服务器框架
//静态资源支持
import Static from 'koa-static'  //npm install koa-static -s
//对发送的数据进行服务端的gzip压缩
import compress from 'koa-compress'
//防止用户使用跨域脚本攻击在开发时允许跨域
import koaCors from 'koa-cors'
//压缩到要用到的基础库
import zlib from 'zlib'
//服务端的路由分配
import Router from 'koa-router'
//服务端发送不同类型数据
import  send from 'koa-send'
//服务端接受用户上传文件类（formData）数据
import koaBody from'koa-body'
//给vue的historyMode模式控件404等出错页面会自动将访客转向首页
import {historyApiFallback} from 'koa2-connect-history-api-fallback'
//我们路由文件自行规划用户访问不同链接时逻辑代码该文件健在server/routers/
// UserRouter.js
import UserRouter from './server/routers/UserRouter.js'
import  path from 'path' //服务端自动规划文件目录
const port = 3600 //我们这个web服务端口

const _dirname = path.resolve(path.dirname('')) //出来目录
const app = new koa()//实例化
//目录配置哪些目录使用自动跳转首页
const whiteList = [
    '/r','/api'
]
const index = 'index.html' //首页文件
app.use(historyApiFallback({ whiteList,index}))
const k =koaCors({
    origin:'*', //开发时允许跨域调用
    credentials:true,
    
})

app.use( k )
const router = new Router() //实例化路由
// const cc = compress({
//     //压缩配置
// })
const bb = koaBody({
    //文件上传
    multipart: true,
    urlencoded:true,
})
app.use(bb)

//允许访问静态目录
const cf = path.join(_dirname, 'client') //找到客户段存放的目录
app.use(Static(cf ))
//用户访问网站目录时返回客户端目录中的首页
router .get('/', async(ctx) =>{
    //一定要区分目录在Windows下 \，服务器linux用的是/
    await send(ctx, ctx.path,{root: _dirname + '\\client\\index.html'})
})
UserRouter(router) //加入我们路由配置
app.use(router.routes()) //将路由配置注册加入到koa框架中
const server = app.listen(port,()=>{
    console.log('服务端启动请访问端口',port)
})
server.timeout = 20 * 1000 //将服务端超时时间设为20秒
