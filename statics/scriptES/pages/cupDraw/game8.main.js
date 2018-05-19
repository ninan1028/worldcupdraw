
import {getMatch,votePromotion} from '../../service/cupdraw/service'

var testlist=[{"id":97,"matchCode":"a","roundCode":"2","matchTime":"2018-06-22 15:00:00.0","matchAdress":"aaa","teamA":33,"teamB":37,"teamAName":"德国","teamBName":"英格兰","selectedTeam":null,"score":null,"userId":null,"createTime":1524985333000,"modifyTime":1524985333000},{"id":98,"matchCode":"b","roundCode":"2","matchTime":"2018-06-23 15:00:00.0","matchAdress":"bbb","teamA":34,"teamB":45,"teamAName":"哥斯达黎加","teamBName":"墨西哥","selectedTeam":null,"score":null,"userId":null,"createTime":1524985333000,"modifyTime":1524985333000},{"id":99,"matchCode":"c","roundCode":"2","matchTime":"2018-06-23 18:00:00.0","matchAdress":"ccc","teamA":41,"teamB":40,"teamAName":"阿根廷","teamBName":"瑞 典","selectedTeam":null,"score":null,"userId":null,"createTime":1524985333000,"modifyTime":1524985333000},{"id":100,"matchCode":"d","roundCode":"2","matchTime":"2018-06-24 15:00:00.0","matchAdress":"ddd","teamA":37,"teamB":51,"teamAName":"英格兰","teamBName":"美 国","selectedTeam":null,"score":null,"userId":null,"createTime":1524985333000,"modifyTime":1524985333000},{"id":101,"matchCode":"e","roundCode":"2","matchTime":"2018-06-25 12:00:00.0","matchAdress":"eee","teamA":53,"teamB":58,"teamAName":"巴西","teamBName":"瑞 士","selectedTeam":null,"score":null,"userId":null,"createTime":1524985333000,"modifyTime":1524985333000},{"id":102,"matchCode":"f","roundCode":"2","matchTime":"2018-06-26 15:00:00.0","matchAdress":"fff","teamA":49,"teamB":61,"teamAName":"意大利","teamBName":"西班牙","selectedTeam":null,"score":null,"userId":null,"createTime":1524985333000,"modifyTime":1524985333000},{"id":103,"matchCode":"g","roundCode":"2","matchTime":"2018-06-27 08:00:00.0","matchAdress":"ggg","teamA":57,"teamB":48,"teamAName":"法 国","teamBName":"葡萄牙","selectedTeam":null,"score":null,"userId":null,"createTime":1524985333000,"modifyTime":1524985333000},{"id":104,"matchCode":"h","roundCode":"2","matchTime":"2018-06-27 15:00:00.0","matchAdress":"hhh","teamA":62,"teamB":38,"teamAName":"乌克兰","teamBName":"巴拉圭","selectedTeam":null,"score":null,"userId":null,"createTime":1524985333000,"modifyTime":1524985333000}];
//var testlist=[];
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
				this.isSelected=res.data.isSelected;
				this.list=this.formatList(list)
			  } else{
				  if(res.msg){
					GB.utils.htoast(res.msg);
				  }
			  }
		})

	 this.list=  this.formatList();
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