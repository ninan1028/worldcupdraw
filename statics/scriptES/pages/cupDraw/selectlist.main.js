
import {getCurrentRounds} from '../../service/cupdraw/service'

import {isLogin} from '../../utils/util'


var vue= new Vue({
	el:'#app',
	data:{
		code:0,
		link:{
			'1':'/pages/cupdraw/game16.html',
			'2':'/pages/cupdraw/game8.html',
			'3':'/pages/cupdraw/game4.html',
			'4':'/pages/cupdraw/game2.html?roundsCode=4',
			'5':'/pages/cupdraw/game2.html?roundsCode=5'
		}
	},
	mounted(){
		if(!isLogin()){
		   // 未登录 跳转到登录页 
		   location.href=basePath;
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
		linkdetail(index){
            if(index==this.code){
				// code一致时进行跳转
				location.href=htmlbasePath+this.link[index];
			}
		}
	}
})