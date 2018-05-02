
import {getWinningList} from '../../service/cupdraw/service'


var vue= new Vue({
	el:'#app',
	data:{
       list:[]
	},
	mounted(){
		getWinningList().then((res)=>{
           if(res.status==0){
             this.list=res.data||[];
           } else{
               if(res.msg){
                   GB.utils.htoast(msg);
               }
           }
        })
    },
    methods:{
        goback(){
            history.go(-1);
        }
    }
})