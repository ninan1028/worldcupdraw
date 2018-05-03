
import {getCurrentRounds} from '../../service/cupdraw/service'

import {isLogin} from '../../utils/util'


var vue= new Vue({
	el:'#app',
	data:{
		code:0,
		link:{
			'1':'/pages/cupDraw/game16.html',
			'2':'/pages/cupDraw/game8.html',
			'3':'/pages/cupDraw/game4.html',
			'4':'/pages/cupDraw/game2.html',
			'5':'/pages/cupDraw/game1.html'
		}
	},
	mounted(){
		if(!isLogin()){
		   // 未登录 跳转到登录页 
		   location.href=htmlbasePath+'/pages/cupDraw/login.html';
		   return;
		}
		getCurrentRounds().then((res)=>{
			if(res.status==0){
			  this.code=res.data.code||0;
			} else{
				if(res.msg){
					GB.utils.htoast(msg);
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