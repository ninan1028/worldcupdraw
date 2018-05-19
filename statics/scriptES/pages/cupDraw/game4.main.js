
import {getMatch,votePromotion} from '../../service/cupdraw/service'

var testlist=[{"id":117,"matchCode":"i","roundCode":"3","matchTime":"2018-06-28 15:00:00.0","matchAdress":"iii","teamA":33,"teamB":45,"teamAName":"德国","teamBName":"墨西哥","selectedTeam":null,"score":null,"userId":null,"createTime":1524987156000,"modifyTime":1524987156000},{"id":118,"matchCode":"j","roundCode":"3","matchTime":"2018-06-29 15:00:00.0","matchAdress":"jjj","teamA":41,"teamB":37,"teamAName":"阿根廷","teamBName":"英格兰","selectedTeam":null,"score":null,"userId":null,"createTime":1524987156000,"modifyTime":1524987156000},{"id":119,"matchCode":"k","roundCode":"3","matchTime":"2018-06-30 18:00:00.0","matchAdress":"kkk","teamA":53,"teamB":49,"teamAName":"巴西","teamBName":"意大利","selectedTeam":null,"score":null,"userId":null,"createTime":1524987156000,"modifyTime":1524987156000},{"id":120,"matchCode":"l","roundCode":"3","matchTime":"2018-07-01 15:00:00.0","matchAdress":"lll","teamA":57,"teamB":38,"teamAName":"法 国","teamBName":"巴拉圭","selectedTeam":null,"score":null,"userId":null,"createTime":1524987156000,"modifyTime":1524987156000}];
//var testlist=[];
var vue= new Vue({
	el:'#app',
	data:{
		isSelected: false,
	  list:[],
	  teamstatus:[{},{},{},{}],
	  selectdata:[]
	},
	mounted(){
		var data={
			roundCode:3
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

		this.list=this.formatList();
	},
	methods:{
		formatList(list){
			var  list=list||testlist;
			list.forEach((item)=>{
			   var time=new Date(item.matchTime.replace(/-/g,'/')); 			   
			   var data=time.getMonth()+1+'月'+time.getDate()+'日';
			   var  getMinutes=time.getMinutes()?time.getMinutes():'00';
			   var hour=time.getHours()+':'+getMinutes;
			   item.data=data;
			   item.hour=hour;
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
				roundsCode:'3',
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
			if(this.selectdata.length<3){
				GB.utils.htoast("请至少选择3支出现球队");
				return;
			}

			var arr=this.selectdata.map(item=>item);
			var data={
				roundsCode:3,
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
		goback(){
			history.go(-1);
		}
	}
})