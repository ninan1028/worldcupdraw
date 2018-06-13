
import {getMatch,votePromotion} from '../../service/cupdraw/service'

//var testlist=[{"id":159,"matchCode":"d","roundCode":"3","matchTime":"2017-07-08 02:00:00.0","matchAdress":"萨马拉","teamA":82,"teamB":87,"teamAName":"瑞士","teamBName":"瑞典","teamAImage":"/assets/img/team/rs.png","teamBImage":"/assets/img/team/rd.png","selectedTeam":null,"score":null,"selectedScore":null,"userId":null,"createTime":1528818483000,"modifyTime":1528818483000},{"id":156,"matchCode":"a","roundCode":"3","matchTime":"2018-07-06 22:00:00.0","matchAdress":"下诺夫哥罗德","teamA":69,"teamB":77,"teamAName":"葡萄牙","teamBName":"阿根廷","teamAImage":"/assets/img/team/pty.png","teamBImage":"/assets/img/team/agt.png","selectedTeam":null,"score":null,"selectedScore":null,"userId":null,"createTime":1528818483000,"modifyTime":1528818483000},{"id":157,"matchCode":"b","roundCode":"3","matchTime":"2018-07-07 02:00:00.0","matchAdress":"喀山","teamA":72,"teamB":78,"teamAName":"伊朗","teamBName":"冰岛","teamAImage":"/assets/img/team/yl.png","teamBImage":"/assets/img/team/bd.png","selectedTeam":null,"score":null,"selectedScore":null,"userId":null,"createTime":1528818483000,"modifyTime":1528818483000},{"id":158,"matchCode":"c","roundCode":"3","matchTime":"2018-07-07 22:00:00.0","matchAdress":"索契","teamA":81,"teamB":93,"teamAName":"巴西","teamBName":"波兰","teamAImage":"/assets/img/team/bx.png","teamBImage":"/assets/img/team/bl.png","selectedTeam":null,"score":null,"selectedScore":null,"userId":null,"createTime":1528818483000,"modifyTime":1528818483000}]
var testlist=[];
var vue= new Vue({
	el:'#app',
	data:{
	  isSelected: false,
	  list:[],
	  teamstatus:[{},{},{},{},{},{},{},{}],
	  selectdata:[]
	},
	mounted(){
		var data={
			roundCode:2
		}
		getMatch(data).then((res)=>{
			if(res.status==0){
				var list=res.data.list||[];
				//this.isSelected=res.data.isSelected;
				this.list=this.formatList(list)
			  } else{
				  if(res.msg){
					GB.utils.htoast(res.msg);
				  }
			  }
		})

	 //this.list=  this.formatList();
	},
	methods:{
		formatList(list){
			var  list=list||testlist;
			list.forEach((item)=>{
			   item.matchTime=item.matchTime.split('.')[0];
			   var time=new Date(item.matchTime.replace(/-/g,'/')); 			   
			   var data=time.getMonth()+1+'月'+time.getDate()+'日';
			   var  getMinutes=time.getMinutes()?time.getMinutes():'00';
			   var hour=time.getHours()+':'+getMinutes;
			   var newteamAImage=basePath+item.teamAImage;
			   var newteamBImage=basePath+item.teamBImage;
			   item.data=data;
			   item.hour=hour;
			   item.newteamAImage=newteamAImage;
			   item.newteamBImage=newteamBImage;
			})
			return list;
		},
		tap(index,teamid){		  
		   var groupCode=this.list[index].matchCode
		   //对原有数据进行判断是否选中了
		  var statusteamId= this.teamstatus[index].teamId;		 
               if(statusteamId==teamid){
				this.$set(this.teamstatus,index,{teamId:''})
			   } else{
				this.$set(this.teamstatus,index,{teamId:teamid})
			  }
		   var flag=true;
		   this.selectdata.forEach((item)=>{
              if(item.groupCode==groupCode){
				  //有选中的组
				  if(item.teamId==teamid){
					  item.teamId='';
				  } else{
					  item.teamId=teamid;
				  }
				  flag=false;
				  return;
			  } 
		   })
		   //拼接选中的数据
		   if(flag){
			var d={
				roundsCode:'2',
				groupCode:groupCode,
				teamId:teamid,
				matchId:this.list[index]['id']
			   }
			   this.selectdata.push(d);
		   }
		   this.selectdata=this.selectdata.filter((item)=>{
              return !!item.teamId;
		   })
		},
		submit(){
			// 提交
			if(this.selectdata.length<6){
				GB.utils.htoast("请至少选择6支出现球队");
				return;
			}

			var arr=this.selectdata.map(item=>item);
			var data={
				roundsCode:2,
				jsonStr:JSON.stringify(arr)
			}
			votePromotion(data).then((res)=>{
				if(res.status==0){
					location.href=htmlbasePath+'/pages/cupdraw/success.html';
				  } else{
					  if(res.msg){
						GB.utils.htoast(res.msg);
					  }
				  }
			})

		},
		goback:function(){
			history.go(-1);
		}
	}
})