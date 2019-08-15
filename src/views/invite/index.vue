<template>
  <div class="login">
    <div class="form">
      <!-- <span class="logo">LOGO</span> -->
      <p class="login-text">
        {{username}}邀请您注册成为代理会员，邀请码为 :
        <span class="invitecode">{{code}}</span>
      </p>

      <!-- <input type="text" class="input" placeholder="昵称" v-model="form.nickname" /> -->
      <input v-if="type == 1" type="text" class="input" placeholder="用户名" v-model="form.username" />
      <input v-if="type == 2" type="phone" class="input" placeholder="手机号" v-model="form.mobile" />
      <input v-if="type == 3" type="email" class="input" placeholder="邮箱" v-model="form.email" />

      <input type="password" class="input" placeholder="密码" v-model="form.password" />

      <input
        type="password"
        class="input"
        placeholder="确认密码"
        v-model="form.repassword"
        @keyup.enter="re"
        required
        v-if="type == 1"
      />

      <div class="wrap" v-if="type == 2 || type == 3">
        <input type="text" class="input" placeholder="验证码" v-model="form.captcha" />
        <van-button type="warning" class="getcodebtn" v-show="canClick" @click="get_captcha">
          <span>{{content}}</span>
        </van-button>
        <van-button type="warning" class="getcodebtn" disabled v-show="!canClick">
          <span>{{totalTime}}s后重新获取</span>
        </van-button>
      </div>

      <!-- <input  type="text" class="input" placeholder="邀请码" v-model="form.invite_code" /> -->
      <van-button plain type="primary" class="btn" @click="register" :loading="loading">注 册</van-button>
    </div>
    <div class="loginways">
      <div class="phoneway wayitem" v-if="type == 1 || type == 3" @click="type=2">
        <span class="spanicon">
          <i class="cp cpphone"></i>
        </span>手机注册
      </div>
      <div class="userway wayitem" v-if="type == 3 || type == 2" @click="type=1">
        <span class="spanicon">
          <i class="cp cpuser"></i>
        </span>用户名注册
      </div>
      <div class="emailway wayitem" v-if="type == 1 || type == 2" @click="type=3">
        <span class="spanicon">
          <i class="cp cpemail"></i>
        </span>
        邮箱注册
      </div>
    </div>

    <div class="nobox">
      <span class="nouser">已有账号？</span>
      <span class="register" @click="login">登录</span>
    </div>
  </div>
</template>

<script>
import {
  getMobileCode,
  getEmailCode,
  register,
  registerByMobile,
  registerByEmail,
  check_invite_code
} from "@/service/index";
import { Notify } from "vant";
import io from "socket.io-client";
import { mapActions , mapMutations} from "vuex";
export default {
  components: {
    Notify
  },
  data() {
    return {
      username: "",
      form: {
        username: "",
        password: "",
        repassword: "",
        mobile: "",
        email: "",
        captcha: "",
        invite_code: this.$route.params.code
      },
      type: 1,
      content: "获取验证码",
      canClick: true,
      totalTime: 59,
      loading: false,
      code: this.$route.params.code
    };
  },
  methods: {
   ...mapMutations("base", ["set_user_balance"]),
    setMsg(msginfo, bginfo) {
      Notify({
        message: msginfo,
        duration: 1000,
        background: bginfo
      });
    },
    login() {
      this.$router.push("./login");
    },
    async get_captcha() {
      const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      const regPhone = /^1[345678]\d{9}$/;
      if (this.type == 2) {
        if (!regPhone.test(this.form.mobile) || !this.form.mobile) {
          this.setMsg("请输入正确是手机号!", "red");
          return;
        }
      }
      if (this.type == 3) {
        if (!regEmail.test(this.form.email) || !this.form.email) {
          this.setMsg("请输入正确邮箱!", "red");
          return;
        }
      }
      if (!this.canClick) return; //改动的是这两行代码
      this.canClick = false;
      this.content = this.totalTime + "s后重新获取";
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + "s后重新获取";
        if (this.totalTime <= 0) {
          window.clearInterval(clock);
          this.content = "重新获取验证码";
          this.totalTime = 59;
          this.canClick = true; //这里重新开启
        }
      }, 1000);
      let res;
      if (this.type == 2) {
        const res = await getMobileCode(3, this.form.mobile);
        if (res.status == 200) {
          this.setMsg("验证码已经发送到手机！", "#4DD2F1");
          this.form.send_id = res.data.send_id;
        } else if (res.status !== 200) {
          this.setMsg("验证码获取失败，请重新获取!", "red");
          return;
        }
      } else if (this.type == 3) {
        const res = await getEmailCode(3, this.form.email);
        if (res.status == 200) {
          this.setMsg("验证码已经发送到邮箱！", "#4DD2F1");
          this.form.send_id = res.data.send_id;
        } else if (res.status !== 200) {
          this.setMsg("验证码获取失败，请重新获取!", "red");
          return;
        }
      }
    },
    async register() {
      if (this.type == 2) {
        if (!this.form.captcha) {
          this.setMsg("请填写验证码!", "red");
          return;
        } else {
          if (!this.form.password || this.form.password.length < 6) {
            this.setMsg("请输入至少6位数密码！", "red");
            return false;
          }
          this.loading = true;
          const res = await registerByMobile(this.form);
          this.loading = true;
          if (res.status < 400) {
            this.setMsg("注册成功！", "#4DD2F1");
            this.loading = false;
            localStorage.setItem("token", res.data);
            this.connect_socket();
            this.$router.push("/home");
          } else {
            this.loading = false;
            this.setMsg(res.data.errorMessage, "red");
          }
        }
      } else if (this.type == 3) {
        // if(!this.form.nickname || this.form.nickname.length<6){
        //     this.setMsg('请输入至少6位数昵称！','red');
        //     return false;
        // }
        if (!this.form.password || this.form.password.length < 6) {
          this.setMsg("请输入至少6位数密码！", "red");
          return false;
        }
        if (!this.form.captcha) {
          this.setMsg("请填写验证码!", "red");
        } else {
          this.loading = true;
          const res = await registerByEmail(this.form);
          this.loading = true;
          if (res.status < 400) {
            this.setMsg("注册成功！", "#4DD2F1");
            this.loading = false;
            localStorage.setItem("token", res.data);
            this.connect_socket();
            this.$router.push("/home");
          } else {
            this.loading = false;
            this.setMsg(res.data.errorMessage, "red");
          }
        }
      } else {
        if (!this.form.username || this.form.username.length < 6) {
          this.setMsg("请输入至少6位数用户名！", "red");
          return false;
        }
        if (!this.form.password || this.form.password.length < 6) {
          this.setMsg("请输入至少6位数密码！", "red");
          return false;
        }
        if (this.form.repassword !== this.form.password) {
          this.setMsg("密码不一致，请确认！", "red");
          return false;
        }
        this.loading = true;
        const res = await register(this.form);
        this.loading = true;
        if (res.status < 400) {
          this.setMsg("注册成功！", "#4DD2F1");
          this.loading = false;
          localStorage.setItem("token", res.data);
          this.connect_socket();
          this.$router.push("/home");
        } else {
          this.loading = false;
          this.setMsg(res.data.errorMessage, "red");
        }
      }
    },
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    connect_socket() {
      const ws = process.env.VUE_APP_WS_COMMON_URL;
      const token = localStorage.getItem("token");
      console.log("connect");
      this.$ws = io(ws, {
        query: {
          token: "Bearer " + token
        }
      });
      this.$ws.on("connect", () => {
        console.log("连接成功！");
        this.$ws.emit("user-connect");
        this.$ws.on("settle-finish", (balance) => {
          console.log('余额变动');
          this.set_user_balance(balance);
        });
      });

      this.$ws.on("force-quit", () => {
        console.log("被踢了");
        this.$toast("由于您违反平台协议，被强制踢出系统并封禁!");
        localStorage.removeItem("token");
        this.$ws.close();
        this.$ws = null;
        this.$router.replace("/login");
      });
    }
  },
  async mounted() {
    const code = this.$route.params.code;
    const toast = this.$toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: "spinner",
      message: "加载中..."
    });
    const res = await check_invite_code(code);
    if (res.status < 400) {
      toast.clear();
      this.username = res.data.username;
    } else {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  // position: relative;
  background: url("../../assets/images/login_bg.png") no-repeat;
  background-size: 100% 100%;
  background-position: center;
  padding-bottom: 0.4rem;
  overflow: auto;
  box-sizing: border-box;
  .form {
    margin: 0 auto;
    margin-top: 1rem;
    width: 88%;
    padding: 0 0.1rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .input {
      background-color: #eefbfd !important;
      border-radius: 0.1rem !important;
      font-size: 0.1rem !important;
    }
    .copy-right {
      font-family: PingFangSC-Regular;
      font-size: 0.08rem;
      color: #dddddd;
      text-align: center;
      margin-top: 0.9rem;
    }
    .btn {
      width: 100%;
      height: 0.36rem;
      border: none;
      background-color: #4dd2f1;
      box-shadow: 0 2px 4px 0 rgba(75, 131, 243, 0.4);
      border-radius: 10px;
      font-family: PingFangSC-Regular;
      font-size: 0.16rem;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.01rem;
      line-height: 0.36rem;
      text-align: center;
      cursor: pointer;
      margin-top: 0.3rem;
      &:hover {
        opacity: 0.9;
      }
    }
    .forgetbox {
      width: 100%;
      text-align: center;
      margin-top: 0.4rem;
      .forgetPassword {
        color: #fa7268;
      }
    }

    .logo {
      width: 1.4rem;
      height: 0.42rem;
      text-align: center;
      // background: url(/img/loginLogo.png);
    }
    .login-text {
      display: inline-block;
      width: 100%;
      // height: 0.48rem;
      line-height: 20px;
      background: linear-gradient(
        180deg,
        rgba(238, 251, 253, 1) 0%,
        rgba(255, 255, 255, 1) 100%
      );
      text-align: center;
      margin-top: 0.4rem;
      font-family: Arial-Black;
      font-size: 0.12rem;
      color: rgba(77, 210, 241, 1);
    }
    .input {
      width: 100%;
      box-sizing: border-box;
      height: 0.34rem;
      margin-top: 0.3rem;
      padding-left: 0.1rem;
      font-size: 0.16rem;
      border-radius: 0.04rem;
    }
    .wrap {
      width: 100%;
      height: 0.34rem;
      display: flex;
      margin-bottom: 0.3rem;
      border-radius: 0.04rem;
      input {
        border-radius: 0.1rem 0 0 0.1rem !important;
      }
      .getcodebtn {
        width: 1.8rem;
        height: 100%;
        line-height: 0.34rem;
        margin-top: 0.3rem;
        background-color: #eefbfd !important;
        border: none;
        border-radius: 0 0.1rem 0.1rem 0;
        color: #fa7268;
      }
    }
  }
  .loginways {
    width: 88%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    .phoneway {
      // margin-right: 0.1rem;
      .spanicon {
        background-color: #6360f1;
      }
    }
    .userway {
      // margin: 0 5px;
      .spanicon {
        background-color: #4dd2f1;
      }
    }
    .emailway {
      // margin-left: 0.1rem;
      .spanicon {
        background-color: #fa7268;
      }
    }
    .wayitem {
      margin-top: 0.2rem;
      text-align: center;
      width: 1.1rem;
      height: 0.24rem;
      line-height: 0.24rem;
      padding: 0.05rem 0.15rem;
      border-radius: 0.14rem;
      border: 1px solid rgba(238, 243, 245, 1);
      .spanicon {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.2rem;
        text-align: center;
        border-radius: 100%;
        margin-right: 0.05rem;
        .cp {
          color: #fff;
          font-size: 0.1rem;
        }
      }
    }
  }
  .nobox {
    margin-top: 0.2rem;
    text-align: center;
    .register {
      color: #4dd2f1;
    }
  }
}
.van-button__text {
  font-size: 0.14rem;
}
</style>
