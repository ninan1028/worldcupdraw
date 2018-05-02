/**
 * Created by wanglin on 2017/7/24.
 */
import {
    query
} from '../../utils/util'
let request = new query('/activity')

//用户注册
export const register = (data) => {
    return request.post("/user/register",data);
}
// 用户登录
export const login = (data) => {
    return request.post("/user/login",data);
}

//查询中奖者名单
export const getWinningList = () => {
    return request.post("prizeDraw/getWinningList");
}

//查询当前轮次
export const getCurrentRounds = () => {
    return request.post("rounds/getCurrentRounds");
}

// 比分投票
export const voteScore = (data) => {
    return request.post("vote/voteScore",data);
}
// 晋级球队投票
export const votePromotion = (data) => {
    return request.post("vote/votePromotion",data);
}

// 获取比赛列表
export const getMatch = (data) => {
    return request.post("match/getMatch",data);
}

// 获取小组赛球队列表
export const getTeamsFor32 = (data) => {
    return request.post("team/getTeamsFor32",data);
}
