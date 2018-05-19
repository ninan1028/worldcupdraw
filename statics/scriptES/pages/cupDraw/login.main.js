


import {login,register} from '../../service/cupdraw/service'

var vue= new Vue({
	el:'#app',
	data:{
      status:1,
      telephone:'',
      password:'',
      yzm:'',
      rtelephone:'',
      rpassword:'',
      ragainpassword:'',
      ryzm:'',
      logincount:0,//登录出现三次错误,需要输入验证码
      yzmimg:''
	},
	mounted(){
		this.yzmimg=proxypath+'/getVerificationCode'
    },
    methods:{
        changestatus(index){
               this.status=index;
               this.changeYzm();
        },
        changeYzm(){
            this.yzmimg=proxypath+'/getVerificationCode?random='+Math.random();
        },
        login(){
            // 登录操作

            // 验证
            if(!GB.valid.checkTelephone(this.telephone)){
              return false;
            } 
            if(!GB.valid.checkPassword(this.password)){
                return false;
            }
            if(this.logincount>2){
                //次数大于2 需要输入验证码

                if(!GB.valid.checkYzm(this.yzm)){
                    return false;
                }
            }
            var data={
                phone:this.telephone,
                password:this.password,
                verificationCode:this.yzm
            }
            login(data).then((res)=>{
                if(res.status==0){
                    // 登录成功
                    GB.cookie.addCookie('telephone',data.phone);
                    // 调到主页面
                    location.href=htmlbasePath+'/index.html';
                } else{
                    this.logincount++;
                    if(res.msg){
                        GB.utils.htoast(res.msg);
                    }
                }
            })

        },
        register(){
            //注册操作

              // 验证
              if(!GB.valid.checkTelephone(this.rtelephone)){
                return false;
              } 
              if(!GB.valid.checkPassword(this.rpassword)){
                  return false;
              }
              if(this.rpassword!=this.ragainpassword){
                  GB.utils.htoast('两次输入的密码不一致');
                  return;
              }
              if(!GB.valid.checkYzm(this.ryzm)){
                return false;
            }
              var data={
                phone:this.rtelephone,
                password:this.rpassword,
                verificationCode:this.ryzm
             }
             register(data).then((res)=>{
                if(res.status==0){
                    // 注册成功
                    GB.cookie.addCookie('telephone',data.phone);
                    // 调到主页面
                    location.href=htmlbasePath+'/index.html';
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