<template>
  <div class="recharge-row-item" @click="detail">
    <div class="round" :class="round">
      <i :class="icon"></i>
    </div>
    <div class="content van-hairline--bottom">
      <div class="row">
        <p class="type">{{type}}</p>

        <p class="amount">{{data.amount.toLocaleString()}}</p>
      </div>
      <div class="row">
        <p class="date">{{formatBeijingDate(data.create_at)}}</p>

        <p class="status" :class="statusClass">{{status}}</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    data: Object
  },
  computed: {
    round() {
      if (this.data.type === 1) {
        return "bank";
      } else if (this.data.type === 2) {
        return "wechat";
      } else if (this.data.type === 3) {
        return "ali";
      }
    },
    icon() {
      if (this.data.type === 1) {
        return "cp_icon_bank";
      } else if (this.data.type === 2) {
        return "cp_icon_wechat";
      } else if (this.data.type === 3) {
        return "cp_icon_alipay";
      }
    },
    type() {
      if (this.data.type === 1) {
        return "银行卡充值";
      } else if (this.data.type === 2) {
        return "微信充值";
      } else if (this.data.type === 3) {
        return "支付宝充值";
      }
    },
    status() {
      if (this.data.status === 1) {
        return "审核中";
      } else if (this.data.status === 2) {
        return "成功";
      } else {
        return "失败";
      }
    },
    statusClass() {
      if (this.data.status === 1) {
        return "wait";
      } else if (this.data.status === 2) {
        return "success";
      } else {
        return "fail";
      }
    }
  },
  methods:{
    detail(){
      this.$emit('detail' , this.data);
    }
  }
};
</script>



<style lang="less" scoped>
@import "../../../assets/font/style.css";

.recharge-row-item {
  padding: 10px;
  display: flex;
  box-sizing: border-box;
  padding-left: 14px;
  padding-right: 20px;
  .round {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    i {
      font-size: 14px;
    }
  }

  .wechat {
    background: rgba(96, 218, 54, 0.14);
  }

  .ali {
    background: rgba(61, 158, 232, 0.14);
  }

  .bank {
    background: rgba(255, 0, 0, 0.07);
  }

  .content {
    flex: 1;
    margin-left: 10px;
    padding-bottom: 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-right: 10px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    // padding-top: 4px;
  }

  .type {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(17, 17, 17, 1);
  }

  .date {
    font-size: 12px;
    font-family: HelveticaNeue;
    color: rgba(203, 212, 213, 1);
  }

  .amount {
    font-size: 14px;
  }


}
</style>
