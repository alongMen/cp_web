<template>
  <div class="login">
    <div class="form">
      <span class="logo">LOGO</span>
      <p class="login-text">
        注册账号
      </p>

      <input
        type="text"
        class="input"
        placeholder="用户名"
        v-model="form.username"
        required
      />

      <input
        type="password"
        class="input"
        placeholder="密码"
        v-model="form.password"
        @keyup.enter="login"
        required
      />

      <input
        type="password"
        class="input"
        placeholder="确认密码"
        v-model="form.repassword"
        @keyup.enter="login"
        required
      />

      <van-button
      plain type="primary"
      class="btn"
      @click="register" :loading="loading"
        >注 册</van-button
      >

    </div>

      <div class="nobox">
        <span class="nouser">已有账号？</span><span class="register" @click="login">登录</span>
      </div>
  </div>
</template>

<script>
import {getMobileCode,getEmailCode,register} from "@/service/index";
import { Notify } from 'vant';
import { setTimeout } from 'timers';
export default {
  name:'register',
  components:{
      Notify
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
        repassword: '',
        send_id:''
      },
      loading:false
    };
  },
  methods: {
      login(){
          this.$router.push('./login');
      },
      setMsg(msginfo,bginfo){
        Notify({
            message: msginfo,
            duration: 1000,
            background: bginfo
        });
      },
      async register(){
        if(!this.form.username || this.form.username.length<6){
            this.setMsg('请输入至少6位数用户名！','red');
            return false;
        }
        if(!this.form.password || this.form.password.length<6){
            this.setMsg('请输入至少6位数密码！','red');
            return false;
        }
        if(this.form.repassword !== this.form.password){
            this.setMsg('密码不一致，请确认！','red');
            return false;
        }
        this.loading = true;
        const res = await register(this.form);
        this.loading = true;
        if(res.status < 400){
            this.setMsg('注册成功，可以登录！','#4DD2F1');
            setTimeout(()=>{
                this.loading = false;
                this.$router.push('./login');
            },2000)
        }else{
            this.loading = false;
            this.setMsg(res.data.errorMessage,'red');
        }
      }
  },
  mounted() {

  },
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('../../assets/images/login_bg.png') no-repeat;
  background-size: 100% 100%;
  overflow: auto;
  .form {
    margin: 0 auto;
    margin-top: 1.365rem;
    width: 2.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .input{
      background-color:  #EEFBFD!important;
      border-radius: 10px!important;
      font-size: .06rem!important;
    }
    .copy-right {
      font-family: PingFangSC-Regular;
      font-size: .08rem;
      color: #dddddd;
      text-align: center;
      margin-top: 90px;
    }
    .btn {
      width: 102%;
      height: 36px;
      border: none;
      background-color: #4DD2F1;
      box-shadow: 0 2px 4px 0 rgba(75, 131, 243, 0.4);
      border-radius: 10px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #ffffff;
      letter-spacing: 1px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      margin-top: .3rem;
      &:hover {
        opacity: 0.9;
      }
    }
    .forgetbox{
      width: 100%;
      text-align: center;
      margin-top: .4rem;
      .forgetPassword{
        color: #FA7268;
      }
    }
    
    .logo {
      width: 140px;
      height: 42px;
      text-align: center;
      // background: url(/img/loginLogo.png);
    }
    .login-text {
      margin-bottom: 31px;
      font-family: Arial-Black;
      font-size: 20px;
      color: #ce9c14;
    }
    .input {
      width: 100%;
      height: 34px;
      margin-top: 30px;
      padding-left: 10px;
      font-size: 16px;
      border-radius: 4px;
    }
    .wrap {
      width: 100%;
      height: 34px;
      display: flex;
      margin-bottom: .25rem;
      .getcodebtn{
        width: 1.8rem;
        height: 100%;
        line-height: 34px;
        margin-left: .1rem;
        margin-top: 30px;
      }
      
    }
  }
  .loginways{
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    .phoneway{margin-right: 10px;
      .spanicon{background-color: #6360F1;}
    }
    .userway{margin: 0 5px;
      .spanicon{background-color: #4DD2F1;}
    }
    .emailway{margin-left: 10px;
      .spanicon{background-color: #FA7268;}}
    .wayitem{
      margin-top: .2rem;
      width:40%;
      height: .24rem;
      line-height: .24rem;
      padding: .05rem .15rem;
      border-radius: 14px;
      border: 1px solid rgba(238,243,245,1);
      .spanicon{
        display: inline-block;width: .2rem;height: .2rem;line-height: .2rem;text-align: center;border-radius:100%;margin-right:.05rem;
        .cp{color: #fff;font-size: .1rem;}
      }
      
    }
  }
  .nobox{
    margin-top: .2rem;
    text-align: center;
    .register{
      color: #4DD2F1;
    }
  }
}
</style>
