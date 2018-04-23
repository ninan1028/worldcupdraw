/**
 * 
 * 公共的请求服务
 */

import {post,get} from '../../utils/util';






/****
 * 获取验证码
 */
export const getYzm=(data)=>{
    return post('/regist/getYzm',data);
}

/**
 * 验证码校验
 * param validateCode tring
 */

export const checkVerificationCode=(code)=>{
  return get('/checkVerificationCode',{'validateCode':code});
}

/**
 * 用户注册
 * param phone tring  password 
 */

export const register=(data)=>{
  return post('/user/register',data);
}

/**
 * 用户登录
 * param phone tring  password 
 */

export const login=(data)=>{
  return post('/user/login',data);
}

/**
 * 获取当前轮次
 */
export const getCurrentRounds=(data)=>{
  return post('/rounds/getCurrentRounds',data);
}

/**
 * 获取小组赛球队列表
 */
export const getTeamsFor32=(data)=>{
  return post('/team/getTeamsFor32',data);
}

/**
 * 晋级球队投票
 */
export const votePromotion=(data)=>{
  return post('/vote/votePromotion',data);
}

/**
 * 比分投票
 */
export const voteScore=(data)=>{
  return post('/vote/voteScore',data);
}







