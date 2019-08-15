<template>
  <div class="recharge">
    <van-nav-bar
      title="充值"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="wrap">
      <p class="title">请您选择充值方式</p>
      <div class="list">
        <div class="card" v-if="has_bank" @click="routeTo('/recharge-bank')">
          <i class="cp_icon_bank icon"></i>
          <span class="span">银行卡</span>
        </div>
        <div
          class="card"
          v-if="has_wechat"
          @click="routeTo('/recharge-qrcode/2')"
        >
          <i class="cp_icon_wechat icon"></i>
          <span class="span">微信</span>
        </div>
        <div class="card" v-if="has_ali" @click="routeTo('/recharge-qrcode/3')">
          <i class="cp_icon_alipay icon"></i>
          <span class="span">支付宝</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
//type 1 bank 2 wechat 3 ali

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState('base', ['offline_charge_list']),
    has_bank() {
      const some = this.offline_charge_list.some(v => v.type === 1);
      return some;
    },
    has_wechat() {
      const some = this.offline_charge_list.some(v => v.type === 2);
      return some;
    },
    has_ali() {
      const some = this.offline_charge_list.some(v => v.type === 3);
      return some;
    },
  },
  methods: {
    ...mapActions('base', ['get_offline_charge_list']),
    onClickLeft() {
      this.$router.push('/myAccount');
    },
    routeTo(path) {
      this.$router.push(path);
    },
  },
  async mounted() {
    await this.get_offline_charge_list();
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/font/style.css';
.recharge {
  width: 100%;
  height: 100%;
  background: rgba(250, 250, 250, 1);
  .wrap {
    box-sizing: border-box;
    padding: 0.125rem;
  }

  .title {
    color: rgba(170, 170, 170, 1);
    font-family: PingFangSC-Regular;
    font-size: 0.125rem;
  }

  .list {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 0.125rem;
  }

  .card {
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    width: 30%;
    height: 0.9375rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .icon {
    font-size: 0.25rem;
  }
  .span {
    margin-top: 0.1875rem;
    font-size: 0.125rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 166, 168, 1);
  }
}
</style>
