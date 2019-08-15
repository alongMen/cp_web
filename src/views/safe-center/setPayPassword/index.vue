<template>
  <div class="PayPassPage">
    <van-nav-bar title="提现密码" left-arrow @click-left="onClickLeft" fixed />
    <div class="iptbox" v-if="times == 0">
      <div class="title">{{title}}</div>
      <van-password-input :value="form.pay_password" info="密码为 6 位数字" @focus="showKeyboard = true" />
    </div>
    <div class="iptbox" v-if="times == 1">
      <div class="title">{{title}}</div>
      <div v-show="isOld">
        <van-password-input
          :value="form.old_pay_password"
          info="密码为 6 位数字"
          @focus="showKeyboard = true"
        />
      </div>
      <div v-show="!isOld">
        <van-password-input
          info="密码为 6 位数字"
          :value="form.new_pay_password"
          @focus="showKeyboard = true"
          v-show="!isOld"
        />
      </div>
    </div>

    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>
<script>
import { set_init_payPass, set_payPass } from "@/service/index";
import { Toast } from "vant";
export default {
  name: "setPayPassword",
  components: {
    Toast
  },
  data() {
    return {
      title: "",
      times: 0,
      form: {
        pay_password: "",
        old_pay_password: "",
        new_pay_password: ""
      },
      showKeyboard: false,
      isOld: true,
      loading: true
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/safe-center");
    },
    async onInput(key) {
      if (this.times == 0) {
        this.form.pay_password = (this.form.pay_password + key).slice(0, 6);
      } else {
        if (this.isOld == true) {
          this.form.old_pay_password = (this.form.old_pay_password + key).slice(
            0,
            6
          );
        } else {
          this.form.new_pay_password = (this.form.new_pay_password + key).slice(
            0,
            6
          );
        }
      }
      if (this.times == 0 && this.form.pay_password.length == 6) {
        this.loading = false;
        const toast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: "spinner",
          message: "提交中..."
        });
        const res = await set_init_payPass(this.form);
        this.loading = true;
        if (res.status < 400) {
          // console.log(res);
          toast.message = `变更完成！`;
          toast.clear();
          this.$router.push("/safe-center");
        } else {
          toast.message = `设置失败！`;
          this.form.pay_password = "";
        }
      }
      if (this.times == 1 && this.form.old_pay_password.length == 6) {
        this.title = "请输入你的新支付密码";
        this.isOld = false;
        if (this.form.new_pay_password.length == 6) {
          this.loading = false;
          const toast = Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: "spinner",
            message: "提交中..."
          });
          const res = await set_payPass(this.form);
          this.loading = true;
          if (res.status < 400) {
            Toast.success('变更完成！')
            // console.log(res);
            toast.clear();
            this.$router.push("/safe-center");
          } else {
            Toast.fail('变更失败！')
            this.isOld = true;
            this.form.old_pay_password = "";
          }
        }
      }
    },
    onDelete() {
      this.form.pay_password = this.form.pay_password.slice(
        0,
        this.form.pay_password.length - 1
      );
    }
  },
  mounted() {
    this.times = this.$route.params.id;
    // console.log(this.times)
    if (this.times == 1) {
      this.title = "请输入你的原支付密码";
    } else {
      this.title = "请设置你的支付密码";
    }
  }
};
</script>
<style lang="less" scoped>
.PayPassPage {
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  padding-top: 0.4rem;
  box-sizing: border-box;
  .iptbox {
    .title {
      width: 100%;
      line-height: 0.4rem;
      font-size: 0.14rem;
      text-align: center;
    }
    padding: 0 0.2rem;
    margin: 1rem auto;
  }
}
</style>
