
import {getCurrentRounds} from '../../service/cupdraw/service'


var vue= new Vue({
	el:'#app',
	data:{
        code:0,
	},
	mounted(){
		getCurrentRounds().then((res)=>{
			if(res.status==0){
			  this.code=res.data.code||[];
			} else{
				if(res.msg){
					GB.utils.htoast(msg);
				}
			}
		 })
	}
})