

/******
 * 主页逻辑
 */

 import {isLogin} from '../../utils/util'

var vue= new Vue({
	el:'#app',
	data:{

	},
	mounted(){
		
	},
	methods:{
		showlist(){
			// 展示 选择列表
			if(isLogin()){
				location.href=htmlbasePath+'/pages/cupdraw/selectlist.html';
			} else{
				location.href=htmlbasePath+'/pages/cupdraw/login.html';
			}
		},
		toreward(){
			location.href=htmlbasePath+'/pages/cupdraw/reward.html';
		},
		torules(){
			location.href=htmlbasePath+'/pages/cupdraw/rules.html';
		}
	}
})