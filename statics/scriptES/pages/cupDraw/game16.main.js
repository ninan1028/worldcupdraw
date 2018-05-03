
import {getTeamsFor32} from '../../service/cupdraw/service'

var vue= new Vue({
	el:'#app',
	data:{
      list:[]
	},
	mounted(){
		getTeamsFor32().then((res)=>{
			if(res.status==0){
				this.list=res.data||[];
			  } else{
				  if(res.msg){
					  GB.utils.htoast(msg);
				  }
			  }
		})
	}
})