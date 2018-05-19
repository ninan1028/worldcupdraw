
import {getCurrentRounds} from '../../service/cupdraw/service'

import {isLogin} from '../../utils/util'


var vue= new Vue({
	el:'#app',
	data:{
		code:0,
		text:{
            '0':'小组赛',
			'1':'小组赛',
			'2':'1/8决赛',
			'3':'1/4决赛',
			'4':'半决赛',
			'5':'决赛'
		}
	},
	mounted(){
		if(!isLogin()){
		   // 未登录 跳转到登录页 
		   //location.href=basePath;
		   return;
		}
		getCurrentRounds().then((res)=>{
			if(res.status==0){
			  this.code=res.data.code||0;
			} else{
				if(res.msg){
					GB.utils.htoast(res.msg);
				}
			}
		 })
	},
	methods:{
		goback(index){
            location.href=basePath;
        },
        share(){
            GB.utils.htoast('点击右上角进行微信分享');
        },
        flow(){
            GB.utils.htoast('关注我');
        }

	}
})