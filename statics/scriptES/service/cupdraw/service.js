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

