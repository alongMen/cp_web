<template>
  <div class="betsbox">
    <van-popup
      v-model="show"
      round
      @close="show = false"
      @click-overlay="show = false"
      position="bottom"
      :style="{ height: '3.7rem' }"
    >
      <!-- 轮播 -->
      <van-swipe @change="onChange" :loop="false">
        <van-swipe-item v-for="(item, index) in renderData" :key="index">
          <div class="title">{{item.label}}</div>
          <i class="explain">赔率说明</i>
          <div class="box">
            <div
              class="items"
              :class="{'items-active': it.id === seleted.id}"
              v-for="(it,inx) in item.children"
              :key="inx"
              @click="seleteItem(it)"
            >
              <div class="fee">1:{{it.odds}}</div>
              <div class="feeType">{{it.name}}</div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>

      <!-- 输入框 -->
      <div class="iptbox">
        <div class="iptinfo">
          <span class="cp_icon_recharge money"></span>
          <input type="number" class="ipt" v-model="amount" autofocus oninput="this.value=this.value.replace(/[^0-9]/g,'');"/>
          <div class="sendbtn" @click="bet">
            <span class="cp_icon_send send"></span>
          </div>
        </div>
      </div>

      <!-- 投注按钮 -->
      <div class="btnbox">
        <div
          class="btnitem"
          :class="item.isActive"
          @click="handleBets(item,index)"
          v-for="(item,index) in btns"
          :key="index"
        >{{item.label}}</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { pcdd_odds_secondary_enum, pcdd_primary } from "@/config/enum";
import { mapState, mapActions } from "vuex";

function validate(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}
export default {
  props: {
    data: Array,
    value: Boolean,
    info: Object
  },
  data() {
    return {
      btns: [
        { label: "最小投注", isActive: "", nn: 1 },
        { label: "二倍投注", isActive: "", nn: 2 },
        { label: "五倍投注", isActive: "", nn: 5 }
      ],
      pcdd_primary,
      pcdd_odds_secondary_enum,
      seleted: {}, //选中的,
      amount: 1
    };
  },
  computed: {
    ...mapState("base", ["userinfo"]),
    show: {
      get() {
        return this.value;
      },
      set(show) {
        this.$emit("input", show);
      }
    },
    renderData() {
      let data = [];
      this.pcdd_primary.forEach(v => {
        data.push({
          ...v,
          children: []
        });
      });

      data.forEach(v => {
        this.data.forEach(v1 => {
          if (v1.primary === v.value) {
            let name = "";
            this.pcdd_odds_secondary_enum.forEach(v2 => {
              if (v2.value === v1.secondary) {
                name = v2.label;
              }
            });
            v.children.push({ ...v1, name });
          }
        });
      });
      return data;
    }
  },
  methods: {
    ...mapActions("base", ["get_userinfo"]),
    handleBets(item, index) {
      this.btns.forEach((it, inx) => {
        if (inx == index) {
          it.isActive = "active";
          this.amount = this.info.bet_min * item.nn;
        } else {
          it.isActive = "";
        }
      });
    },
    onChange() {
      this.seleted = {};
    },
    seleteItem(item) {
      this.seleted = item;
    },
    bet() {
      const r = /^\+?[1-9][0-9]*$/;

      if(!r.test(this.amount)){
        this.$toast('请输入正确金额!');
        return;
      }


      if (!this.seleted.id) {
        this.$toast("请选择玩法");
        return;
      }
      if (this.amount < this.info.bet_min) {
        this.$toast(`投注金额必须大于 ${this.info.bet_min} 元`);
        return;
      }
      if (this.amount > this.info.bet_max) {
        this.$toast(`投注金额必须小于 ${this.info.bet_max} 元`);
        return;
      }
      if (this.userinfo.balance < this.amount) {
        this.$toast(`余额不足，禁止投注，请充值！`);
        return;
      }
      this.$emit("bet", { ...this.seleted, amount: this.amount });
      // this.$parent.bet();
      this.seleted = {};
      this.amount = 0;
    }
  },
  mounted() {

  }
};
</script>
<style lang="less" >
@import "../../../../assets/font/style.css";
.betsbox {
  width: 100%;
  // height: 70%;
  position: absolute;
  bottom: 0;
  position: relative;
  box-sizing: border-box;
  .explain {
    position: absolute;
    right: 0.2rem;
    top: 0.15rem;
    font-style: normal;
    color: rgba(77, 210, 241, 1);
    font-size: 0.12rem;
  }
  .title {
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    color: rgba(17, 17, 17, 1);
    font-size: 0.14rem;
  }
  .box {
    height: 2rem;
    padding: 0.1rem;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .items {
      width: 20%;
      padding: 0.1rem;
      box-sizing: border-box;
      text-align: center;
      .fee {
        width: 0.4rem;
        height: 0.4rem;
        text-align: center;
        line-height: 0.4rem;
        border-radius: 0.08rem;
        margin: 0 auto;
        border: 1px solid #f6f7fa;
      }
      .feeType {
        font-size: 0.12rem;
        color: #9ea5a7;
        line-height: 0.27rem;
      }
    }
    .items-active {
      .fee {
        background: rgba(250, 114, 104, 0.1);
        border: 1px solid rgba(250, 114, 104, 0.86);
        color: #fa7268;
      }
      .feeType {
        color: #fa7268;
      }
    }
  }
  .iptbox {
    width: 100%;
    height: 0.6rem;
    box-sizing: border-box;
    padding: 0.1rem 0.2rem;
    .iptinfo {
      border-radius: 24px;
      width: 100%;
      height: 100%;
      // border:1px solid red;
      overflow: hidden;
      box-shadow: -2px 6px 23px -4px #d8d8d8;
      position: relative;
      .ipt {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border: 1px solid #ccc;
        padding-left: 0.55rem;
        border: none;
        outline: none;
      }
      .money {
        &::before {
          font-size: 0.24rem;
          color: #4bd2f1;
        }
        position: absolute;
        left: 0.2rem;
        top: 0.1rem;
      }
      .sendbtn {
        position: absolute;
        width: 0.38rem;
        height: 0.38rem;
        line-height: 0.4rem;
        text-align: center;
        border-radius: 100%;
        background-color: #fa7268;
        right: 0.1rem;
        top: 0.01rem;
        .send {
          line-height: 0.44rem;
          text-align: center;
          font-size: 0.22rem;
          color: #fff;
        }
      }
    }
  }
  .btnbox {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    justify-content: space-around;
    padding: 0.2rem 0.1rem;
    .btnitem {
      width: 0.8rem;
      height: 0.32rem;
      box-sizing: border-box;
      line-height: 0.32rem;
      text-align: center;
      border-radius: 0.32rem;
      background-color: #4bd2f1;
      color: #fff;
      font-size: 0.12rem;
      &.active {
        background-color: #fa7268;
      }
    }
  }
}
</style>
