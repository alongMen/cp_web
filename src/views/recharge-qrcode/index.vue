<template>
  <div class="recharge-bank">
    <van-nav-bar
      :title="`${title}充值`"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="input-area">
      <p class="title">充值金额</p>

      <div class="input van-hairline--bottom">
        <span class="unit">¥</span>
        <input v-model="amount" />
      </div>
      <p class="tips">
        单笔最低充值金额：
        <span class="num">{{ min }}</span> 元以上，
        <span class="num">{{ max }}</span> 元以下
      </p>

      <div class="amount-selector">
        <div
          class="amount-selector-item"
          v-for="(item, index) in amount_list"
          :key="index"
          @click="selectAmount(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>

    <div class="channel" @click="showPicker = true">
      <div class="pre-fix" :class="type === 2 ? 'wechat-pre' : 'ali-pre'">
        <i :class="type === 2 ? 'cp_icon_wechat' : 'cp_icon_alipay'"></i>
      </div>
      <span>{{ name }}</span>
      <van-icon name="arrow" class="arrow" />
    </div>
    <picker
      v-model="showPicker"
      :data="pickerOption"
      :hideButton="true"
      @confirm="selectCard"
    />

    <div class="okbox">
      <van-button class="okBtn" :disabled="isDisabled" @click="ok"
        >充 值</van-button
      >
    </div>
  </div>
</template>

<script>
import Picker from '@/components/picker/index';
import { offline_charge_confirm } from '@/service/index';
import { mapActions } from 'vuex';
export default {
  components: {
    Picker,
  },
  data() {
    return {
      amount_list: ['100', '200', '500', '1000'],
      amount: 0,
      id: '',
      showPicker: false,

      type: 0,
    };
  },

  computed: {
    isDisabled() {
      if (!this.amount) {
        return true;
      } else {
        return false;
      }
    },

    offline_charge_list() {
      return this.$store.state.base.offline_charge_list;
    },
    data() {
      const list = this.offline_charge_list.filter(v => v.type === this.type);
      return list;
    },
    pickerOption() {
      let arr = [];
      this.data.forEach((v, i) => {
        arr.push({
          label: `${this.title}${i + 1}`,
          value: v.id,
        });
      });
      return arr;
    },
    name() {
      let name = '请选择银行卡';
      this.pickerOption.forEach(v => {
        if (v.value === this.id) {
          name = v.label;
        }
      });
      return name;
    },
    min() {
      if (!this.id) {
        return 0;
      }
      let min = 0;
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].id === this.id) {
          min = this.data[i].min;
        }
      }
      return min;
    },
    max() {
      if (!this.id) {
        return 0;
      }
      let max = 0;
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].id === this.id) {
          max = this.data[i].max;
        }
      }
      return max;
    },
    title() {
      const type = parseInt(this.$route.params.type);
      if (type === 2) {
        return '微信';
      } else {
        return '支付宝';
      }
    },
  },
  methods: {
    ...mapActions('base', ['get_offline_charge_list']),
    selectCard(item) {
      this.id = item.value;
    },

    onClickLeft() {
      this.$router.push('/recharge');
    },
    selectAmount(amount) {
      this.amount = amount;
    },
    async ok() {
      const amount = parseFloat(this.amount);
      if (amount < this.min || amount > this.max) {
        this.$toast(`充值金额必须在 ${this.min} ~ ${this.max} 之间`);
        return;
      }
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '提交中...',
      });
      const params = {
        id: this.id,
        amount: parseFloat(this.amount),
      };
      const res = await offline_charge_confirm(params);

      if (res.status < 400) {
        toast.clear();
        this.$router.push({
          path: '/qrcode-order',
          query: {
            order: JSON.stringify(res.data),
          },
        });
      }
    },
  },
  async mounted() {
    this.type = parseInt(this.$route.params.type);
    await this.get_offline_charge_list();
    setTimeout(() => {
      this.id = this.data[0].id;
    }, 0);
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/font/style.css';
.recharge-bank {
  width: 100%;
  height: 100%;
  background: rgba(250, 250, 250, 1);
  box-sizing: border-box;
  .input-area {
    margin-top: 14px;
    width: 100%;
    background: #fff;
    border-radius: 0px 0px 30px 30px;
    height: 1.875rem;
    padding: 20px;
    box-sizing: border-box;
    .title {
      color: rgba(17, 17, 17, 1);
      font-size: 0.125rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
    }

    .input {
      margin-top: 20px;
      width: 100%;
      position: relative;
      padding-bottom: 10px;
      padding-left: 20px;
      input {
        font-size: 0.1875rem;
      }
      .unit {
        left: 0;
        bottom: 13px;
        position: absolute;
        font-size: 0.1875rem;
      }
    }
  }

  .tips {
    margin-top: 10px;
    color: rgba(170, 170, 170, 1);
  }

  .amount-selector {
    margin-top: 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .amount-selector-item {
      width: 22%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(77, 210, 241, 1);
      border-radius: 8px;
      color: #fff;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
    }
  }

  .channel {
    box-sizing: border-box;
    margin: 20px;
    height: 64px;
    background: rgba(255, 255, 255, 1);
    border-radius: 14px;
    padding-right: 20px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .pre-fix {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 20px;
      i {
        font-size: 20px;
      }
    }

    .wechat-pre {
      background: rgba(96, 218, 54, 0.1);
    }

    .ali-pre {
      background: rgba(52, 167, 255, 0.06);
    }

    span {
      font-size: 0.125rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(17, 17, 17, 1);
    }
    .arrow {
      right: 0;
      position: absolute;
      top: 25px;
      right: 10px;
      font-size: 14px;
    }
  }

  .okbox {
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
    }
  }

  .num {
    color: red;
  }
}
</style>
