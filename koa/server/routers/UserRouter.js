import Router from "koa-router";
// import RankList  from "../controller/RankList.js";
import RankList from "../controller/RankList.js";
/**
 * 路由配置
 * @param {Router} router 
 */
export default function UserRouter(router){
   /**用户用get方式访问一个api端口 */
    router.get('/r/list',RankList.IndexList)

    router.get('/r/addNewGame', RankList.AddNewGame) //新增一个游戏

    //访问评论接口
    router.get('/r/comment', RankList.comments)
    //添加评论接口
    router.post('/r/addcomments     ',RankList.Addcomments)
    //评分接口
    router.post('/r/score',RankList.score)
    //访问评分表
    router.get('/r/visitscore',RankList.visitscore)
}

// routers 路由器