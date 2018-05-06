
import {getMatch,voteScore} from '../../service/cupdraw/service'

var roundsCode=GB.utils.GetRequest()['roundsCode']||4

var testlist=[];
var vue= new Vue({
	el:'#app',
	data:{
	  isSelected: false,
	  list:[],
      basePath:basePath,
      roundsCode:roundsCode
	},
	mounted(){
		var data={
			roundCode:roundsCode
		}
		getMatch(data).then((res)=>{
			if(res.status==0){
				var list=res.data.list||[];
				this.list=this.formatList(list);
				this.isSelected=res.data.isSelected;
			  } else{
				  if(res.msg){
                    GB.utils.htoast(res.msg);
				  }
			  }
		})

		//this.list=this.formatList();
	},
	methods:{
		formatList(list){
			var  list=list||testlist;
			list.forEach((item)=>{
                //对比分进行处理
                var score=item.selectedScore||'';
                var scorearr=score.split(':');
                item.scoreA=scorearr[0]||0;
                item.scoreB=scorearr[1]||0;
			})
			return list;
		},
		submit(){
            // 提交
            var flag=true;
            var arr=[];
            this.list.forEach((item)=>{
               if(item.scoreA===''||item.scoreB===''){                   
                GB.utils.htoast('请填写比分');
                flag=false;
                return;
               } else{
                   //要提交的数据
                   var obj={
                    roundsCode:4,
                    groupCode:'',
                    matchId:item.id,
                    score:item.scoreA+':'+item.scoreB
                   }
                   arr.push(obj);
               }
            })
            if(!flag){
                return;
            }
            var data={
                roundsCode:roundsCode,
                jsonStr:JSON.stringify(arr)
            }

			//检查比分不能为空
			voteScore(data).then((res)=>{
				if(res.status==0){
					location.href=htmlbasePath+'/pages/cupdraw/success.html';
				  } else{
					  if(res.msg){
                        GB.utils.htoast(res.msg);
					  }
				  }
			})

		}
	}
})