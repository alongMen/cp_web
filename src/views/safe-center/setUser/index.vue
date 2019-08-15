<template>
  <div class="UserSetPage">
    <van-nav-bar title="创建用户" left-arrow @click-left="onClickLeft" fixed />
    <van-panel title desc="请填写你心意的用户名" class="title"></van-panel>
    <van-cell-group class="username">
      <van-field v-model="form.username" label="用户名" placeholder="请输入用户名" />
    </van-cell-group>
    <p class="tils">注册用户名只能为数字，英文字母</p>
    <div class="okbox">
      <van-button class="okBtn" :disabled="isDisabled" @click="okAdd">完 成</van-button>
    </div>
  </div>
</template>
<script>
import { Notify } from "vant";
import { set_username } from "@/service/index";
export default {
  components: {
    Notify
  },
  data() {
    return {
      form: {
        username: ""
      },
      loading: true
    };
  },
  computed: {
    isDisabled() {
      if (this.form.username.length == 0) {
        return true;
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push("/safe-center");
    },
    methods:{
        onClickLeft(){
            this.$router.push('/safe-center')
        },
        async okAdd(){
            if(this.form.username.length<6){
                this.$toast('请填写6位以上正确的用户名！')
                return false;
            }
            this.loading = false
            const res = await set_username(this.form)
            this.loading = true
            console.log(res)
            if(res.status<400){
                this.$toast('创建成功！')
                this.$router.push('/safe-center')
            }else{
                this.$toast(res.data.errorMessage)
            }
        }
    }
  }
};
</script>
<style lang="less">
.UserSetPage {
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  padding-top: 0.4rem;
  box-sizing: border-box;
  .tils {
    padding-left: 0.15rem;
    font-size: 0.12rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(250, 114, 104, 1);
    line-height: 0.3rem;
  }
  .van-cell__label {
    font-size: 0.12rem;
  }
  .van-panel,
  .title .van-cell {
    background-color: #fafafa;
  }
  .van-cell-group,
  .username .van-cell {
    background-color: #fff;
  }

  .van-field__label {
    width: 60px;
    span {
      font-size: 0.14rem;
    }
  }
  .van-field__control {
    font-size: 0.14rem;
  }
  .okbox {
    position: absolute;
    bottom: 0.4rem;
    width: 100%;
    height: 0.48rem;
    padding: 0.2rem;
    box-sizing: border-box;
    .okBtn {
      width: 100%;
      height: 0.4rem;
      text-align: center;
      line-height: 0.4rem;
      color: #fff;
      background: #4dd2f1;
      border-radius: 0.12rem;
      border: none;
      .van-button__text {
        font-size: 0.16rem;
      }
    }
  }
}
</style>
