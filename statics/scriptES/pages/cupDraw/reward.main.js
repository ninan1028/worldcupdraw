
import {getWinningList} from '../../service/cupdraw/service'

/*****展示中奖列表*/
var vue= new Vue({
	el:'#app',
	data:{
       list:[],
       obj:{
           '1':'小组赛抽奖获奖名单',
           '2':'1/8赛抽奖获奖名单',
           '3':'1/4赛抽奖获奖名单',
           '4':'半决赛抽奖获奖名单',
           '5':'决赛赛抽奖获奖名单'
       }
	},
	mounted(){
		getWinningList().then((res)=>{
           if(res.status==0){
              if(res.data['1']){
                 this.list.push(this.formatObj('1',res.data['1']));
              }
              if(res.data['2']){
                this.list.push(this.formatObj('2',res.data['2']))
             }
             if(res.data['3']){
                this.list.push(this.formatObj('3',res.data['3']))
             }
             if(res.data['4']){
                this.list.push(this.formatObj('4',res.data['4']))
             }
             if(res.data['5']){
                this.list.push(this.formatObj('5',res.data['5']))
             }
           } else{
               if(res.msg){
                GB.utils.htoast(res.msg);
               }
           }
        })
 
    },
    methods:{
        goback(){
            history.go(-1);
        },
        formatObj(index,arr){
            var obj1={
                name:this.obj[index],
                value:arr
            }
            return obj1;
        }
    }
})