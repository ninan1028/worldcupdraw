


var vue= new Vue({
	el:'#app',
	data:{
      status:1,
      telephone:'',
      password:'',
      againpassword:'',
      yzm:'',
      logincount:0,
      yzmimg:''
	},
	mounted(){
		this.yzmimg='localhost:8002/activity/getVerificationCode'
    },
    methods:{
        changestatus(index){
               this.status=index;
        }
    }
})