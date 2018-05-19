
import { getTeamsFor32 ,votePromotion} from '../../service/cupdraw/service'

var vue = new Vue({
	el: '#app',
	data: {
		isSelected: false,
		list: [],
		basePath: basePath,
		selectstatus: [{}, {}, {}, {}, {}, {}, {}, {}], // 对球队选择的状态
		groupCode: {
			'0': 'A',
			'1': 'B',
			'2': 'C',
			'3': 'D',
			'4': 'E',
			'5': 'F',
			'6': 'G',
			'7': 'H'
		},
		param: []
	},
	mounted() {
		//this.list = [{ "A": [{ "id": 33, "idList": null, "name": "德国", "group32": "A", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/germany.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1525007330000 }, { "id": 34, "idList": null, "name": "哥斯达黎加", "group32": "A", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/costarica.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1524985333000 }, { "id": 35, "idList": null, "name": "波 兰", "group32": "A", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/poland.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 36, "idList": null, "name": "厄瓜多尔", "group32": "A", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/ecuador.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }] }, { "B": [{ "id": 37, "idList": null, "name": "英格兰", "group32": "B", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/england.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1524987156000 }, { "id": 38, "idList": null, "name": "巴拉圭", "group32": "B", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/paraguay.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1524987156000 }, { "id": 39, "idList": null, "name": "特立尼达和多巴哥", "group32": "B", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/telinida.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 40, "idList": null, "name": "瑞 典", "group32": "B", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/sweden.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524985333000 }] }, { "C": [{ "id": 41, "idList": null, "name": "阿根廷", "group32": "C", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/argentina.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1525006039000 }, { "id": 42, "idList": null, "name": "科特迪瓦", "group32": "C", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/ketediwa.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 43, "idList": null, "name": "塞 黑", "group32": "C", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/saihei.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 44, "idList": null, "name": "荷 兰", "group32": "C", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/netherlands.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524984610000 }] }, { "D": [{ "id": 45, "idList": null, "name": "墨西哥", "group32": "D", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/mexico.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1524987156000 }, { "id": 46, "idList": null, "name": "伊 朗", "group32": "D", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/iran.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 47, "idList": null, "name": "安哥拉", "group32": "D", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/densinigra_soil.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 48, "idList": null, "name": "葡萄牙", "group32": "D", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/portugal.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524985333000 }] }, { "E": [{ "id": 49, "idList": null, "name": "意大利", "group32": "E", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/italy.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1524987156000 }, { "id": 50, "idList": null, "name": "加 纳", "group32": "E", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/ghana.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 51, "idList": null, "name": "美 国", "group32": "E", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/america.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524985333000 }, { "id": 52, "idList": null, "name": "捷 克", "group32": "E", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/czech.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }] }, { "F": [{ "id": 53, "idList": null, "name": "巴西", "group32": "F", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/brazil.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1525007330000 }, { "id": 54, "idList": null, "name": "克罗地亚", "group32": "F", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/croatia.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524984951000 }, { "id": 55, "idList": null, "name": "澳大利亚", "group32": "F", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/australia.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 56, "idList": null, "name": "日 本", "group32": "F", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/japan.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }] }, { "G": [{ "id": 57, "idList": null, "name": "法 国", "group32": "G", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/france.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1525006039000 }, { "id": 58, "idList": null, "name": "瑞 士", "group32": "G", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/switzerland.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524985333000 }, { "id": 59, "idList": null, "name": "韩 国", "group32": "G", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/korea.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 60, "idList": null, "name": "多哥", "group32": "G", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/togo.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }] }, { "H": [{ "id": 61, "idList": null, "name": "西班牙", "group32": "H", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/spain.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524985333000 }, { "id": 62, "idList": null, "name": "乌克兰", "group32": "H", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/ukraine.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524985333000 }, { "id": 63, "idList": null, "name": "突尼斯", "group32": "H", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/tunis.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 64, "idList": null, "name": "沙 特", "group32": "H", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/saudi_arabia.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }] }];
		getTeamsFor32().then((res) => {
			if (res.status == 0) {
				//this.isSelected = res.data.isSelected || false;
				this.list = res.data.list || [];
			} else {
				if (res.msg) {
					GB.utils.htoast(res.msg);
				}
			}
		})
	},
	methods: {
		selectteam(index, groupcode, id) {
			//对球队进行选择
			// 至少选出8支球队
			if (this.selectstatus[index][id]) {
				//如果存在值 在原有值上进行处理
				var obj = $.extend({}, this.selectstatus[index]);
				if (obj[id] == 1) {
					obj[id] = 0;
				} else {
					obj[id] = 1;
				}
				this.$set(this.selectstatus, index, obj)
				return;
			} else {

				//判断一个组内最多选中二支球队
				var selectedobj = this.selectstatus[index];// 一个组内的选择情况
				var count = 0;
				for (var key in selectedobj) {
					if (selectedobj[key]) {
						count++;
					}
				}
				if (count == 2) {
					GB.utils.htoast('一个组内最多选择两支球队');
					return;
				}
				var obj1= $.extend({},this.selectstatus[index]) ;
                obj1[id]=1;
				//this.selectstatus[index] = obj1;
				this.$set(this.selectstatus,index,obj1);
				return;
			}
		},
		getParam() {
			// 获取提交时的参数
			var arr = [];
			this.selectstatus.forEach((item, index) => {
				var o = {};
				for (var v in item) {
					if (item[v]) {
						o = {
							roundsCode: 1,
							groupCode: this.groupCode[index],
							teamId: v
						}

						arr.push(o);
					}
				}
			})

			return arr;
		},
		submit() {
			//提交选择
			var json=this.getParam();
			if(json.length<8){
				GB.utils.htoast("请至少选择8支球队");
				return;
			}
			var param={
				roundsCode:1,
				jsonStr:JSON.stringify(json)
			}
			votePromotion(param).then((res)=>{
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