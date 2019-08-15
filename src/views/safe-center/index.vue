<template>
  <div class="safe-center">
    <van-nav-bar
        title=""
        left-arrow
        @click-left="onClickLeft"
        fixed
    />
    <div class="safe-title">安全中心</div>
    <div class="safeinfo">
      <div class="safetell">
        <h4>我们全力保护你的数据安全</h4>
        <p class="content">数据安全是我们工作的重中之重</p>
        <p class="content">我们确保每个层面里的数据安全</p>
        <p class="content">安全，是你无需感知的生活本来</p>
      </div>
      <img src="@/assets/images/safe.png" alt="">
    </div>
    <div class="safeItems">
      <router-link :to="pathUser">
        <van-cell :value="form.userName" is-link icon="user-o" class="safeItem">
          <template slot="title">
            <span class="custom-title">创建用户</span>
          </template>
        </van-cell>
      </router-link>
      <router-link to="/setMobile">
        <van-cell :value="form.mobileState" is-link icon="phone-o" class="safeItem">
          <template slot="title">
            <span class="custom-title">绑定手机</span>
          </template>
        </van-cell>
      </router-link>
      <router-link to="/setEmail">
        <van-cell :value="form.emailState" is-link icon="envelop-o" class="safeItem">
          <template slot="title">
            <span class="custom-title">绑定邮箱</span>
          </template>
        </van-cell>
      </router-link>
      <router-link to="/setPassword">
        <van-cell :value="form.passState" is-link icon="browsing-history-o" class="safeItem" >
          <template slot="title">
            <span class="custom-title">更改密码</span>
          </template>
        </van-cell>
       </router-link>
      <!-- <router-link to="/setPayPassword"> -->
        <van-cell :value="form.payPassState" is-link icon="peer-pay" class="safeItem" @click="toSetPass">
          <template slot="title">
            <span class="custom-title">支付密码</span>
          </template>
        </van-cell>
      <!-- </router-link> -->
    </div>
  </div>
</template>
<script>
import { get_userinfo } from "@/service/index";
export default {
  data(){
    return{
      form:{
        userName:'',
        mobileState:'',
        emailState:'',
        passState:'',
        payPassState:''

      }
    }
  },
  computed:{
    pathUser(){
      if(this.form.userName){
        return ''
      }else{
        return '/setUser'
      }
    }
  },
  methods:{
    toSetPass(){
      let id;
      if(this.form.payPassState == '已设置'){
        id = 1
      }else{
        id = 0
      }
      this.$router.push(`/setPayPassword/${id}`);
    },
    async getUserinfo(){
      const res = await get_userinfo();
      if(res.status == 200){
        let data = res.data;
        this.form.userName = data.username || '未设置';
        this.form.mobileState = data.mobile?'已绑定':'未绑定';
        this.form.emailState = data.email?'已绑定':'未绑定';
        this.form.passState = '已设置';
        this.form.payPassState = data.has_pay_password?'已设置':'未设置';
        // console.log(res)
      }else{
        this.$toast('获取个人信息失败！')
      }
    },
    onClickLeft(){
        this.$router.push('/mine')
    },
  },
  mounted(){
    this.getUserinfo();
  }
}
</script>
<style lang="less" scoped>

.van-hairline--bottom::after{border:none}
.van-nav-bar{background-color:rgba(0,0,0,0);}
.safe-center{
  padding: .2rem 0;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  background-color: #fff;
  .safe-title{
    width: 100%;
    height: .4rem;
    line-height: .4rem;
    font-size:.16rem;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(17,17,17,1);
    text-align: center;
  }
  .safeinfo{
    display: flex;
    display: -webkit-flex;
    background:linear-gradient(270deg,rgba(77,210,241,0.4) 0%,rgba(255,255,255,1) 100%);
    padding: .2rem 0;
    img{
      width: .98rem;
      height: .8rem;
    }
    .safetell{
      padding: 0 .2rem;
      box-sizing: border-box;
      h4{
        font-size:.14rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color: #000;
        opacity: 1;
        // color:rgba(17,17,17,1);
        line-height:.2rem;
      }
      .content{
        font-size:.12rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(186,193,195,1);
        line-height:.2rem;
      }
    }
  }
  .safeItems{
    width: 100%;
    padding: 0 .2rem;
    box-sizing: border-box;
    .safeItem{
      height: .6rem;
      line-height: .6rem;
      padding-left: 0;
      padding-right: 0;
      border-bottom: 1px solid #efefef;
      .van-cell__left-icon, .van-cell__right-icon{
        line-height: .6rem!important;
      }
      span.custom-title{
        font-size: .14rem;
      }
      .van-cell__value span{
        font-size: .12rem;
      }
      .van-icon-user-o{
        color: #AA01FF;
        font-size: .24rem;
      }
      .van-icon-phone-o{
        color: #0F34F5;
        font-size: .24rem;
      }
      .van-icon-envelop-o{
        color: #82E514;
        font-size: .24rem;
      }
      .van-icon-browsing-history-o{
        color: #FFDA1D;
        font-size: .24rem;
      }
      .van-icon-peer-pay{
        color: #FF0000;
        font-size: .24rem;
      }

    }
  }
}
  
</style>