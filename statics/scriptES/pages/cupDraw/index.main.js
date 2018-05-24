

/******
 * 主页逻辑
 */

 import {isLogin} from '../../utils/util'

 var audioStatus=localStorage.getItem('cupdraw');
 if(audioStatus==null){
	 audioStatus=true;
 }
 if(audioStatus==='false'){
	 audioStatus=false;
 }
 if(audioStatus==='true'){
	audioStatus=true;
}

var vue= new Vue({
	el:'#app',
	data:{
		audioStatus:audioStatus,
		audio:'',
		day:6,
		countNum:300,
		isani:false
	},
	mounted(){
		this.audio= new Audio(imgUrl+'/cupdraw.mp3');
		this.audio.loop=true;
		setTimeout(()=>{
			if(this.audioStatus) {this.audio.play()};
			this.isani=true;
		},1000)
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
		},
		audioswitch(){
			this.audioStatus=!this.audioStatus;
			localStorage.setItem('cupdraw',this.audioStatus);
			if(this.audioStatus){
              this.audio.play();
			} else{
              this.audio.pause();
			}
		}
	}
})