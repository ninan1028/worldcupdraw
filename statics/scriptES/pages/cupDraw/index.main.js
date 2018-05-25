

/******
 * 主页逻辑
 */

 import {isLogin} from '../../utils/util'

 import {getUserCount} from '../../service/cupdraw/service'

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
		month:'',
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

		this.getNum();
	},
	methods:{
		getNum(){
			 // 获取用户参数的人数及时间

			 getUserCount().then((res)=>{
                if(+res.status==0){
					var time=res.data.time;
					var num=res.data.num;
					var Dtime='';
					if(time){
						time=time.replace(/\-/g,'/');
						Dtime=new Date(time);
						this.month=Dtime.getMonth()+1;
						this.day=Dtime.getDate();
			            this.countNum=num;
					}
				}
			 })

			    //    var time='2018-5-20';
				// 	var num=40;
				// 	var Dtime='';
				// 	if(time){
				// 		time=time.replace(/\-/g,'/');
				// 		Dtime=new Date(time);
				// 		this.month=Dtime.getMonth()+1;
				// 		this.day=Dtime.getDate();
				// 		this.countNum=num;
				// 	}

		},
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