<template>
  <div class="muAccount">
    <van-nav-bar
      left-text
      left-arrow
      fixed
      @click-left="back"
      @click-right="bill"
      :border="false"
      right-text="账单"
    ></van-nav-bar>

    <div class="mineinfo">
      <div class="avator">
        <img :src="userinfo.avatar ? `./image/${this.userinfo.avatar}` : `./image/avator.png`" alt class="avatorpic" />
      </div>
      <p class="username">{{ userinfo.username || userinfo.mobile || userinfo.email }}</p>
      <p class="usertodo">祝我中大奖！</p>
      <p class="balance">余额</p>
      <div class="binfo">
        <i class="cp cpwallet bpic"></i>
        <span class="bnum">{{ userinfo.balance.toLocaleString() }}</span>
        <span class="danwei">元宝</span>
      </div>
    </div>

    <div class="capitalinfo">
      <p class="title">资金明细</p>
      <div class="infobox">
        <div class="pic">
          <svg
            t="1564454633115"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4176"
            width="30"
            height="30"
          >
            <path
              d="M534.493867 78.762667l359.850666 346.9312c26.112 25.088 26.9312 67.754667 1.8432 93.866666L697.105067 724.8896c-25.088 26.094933-67.754667 26.9312-93.8496 1.8432L243.4048 379.818667c-26.094933-25.088-26.9312-67.754667-1.8432-93.8496L440.644267 80.622933c25.088-26.112 66.696533-28.296533 93.8496-1.860266z"
              fill="#FFD3D7"
              p-id="4177"
            />
            <path
              d="M322.935467 155.989333l460.288 195.396267c33.006933 13.994667 49.937067 52.718933 35.2768 87.278933l-111.36 262.3488c-14.011733 32.989867-52.736 49.937067-87.278934 35.259734L159.556267 540.893867c-32.989867-13.994667-49.937067-52.718933-35.259734-87.278934l111.36-262.3488c13.994667-33.006933 54.272-49.271467 87.278934-35.2768z"
              fill="#FB560A"
              p-id="4178"
            />
            <path
              d="M150.186667 708.266667h723.626666l92.16 128c34.133333 47.786667 15.36 85.333333-44.373333 85.333333H93.866667C35.84 921.6 17.066667 884.053333 51.2 836.266667l98.986667-128z"
              fill="#DAE9FF"
              p-id="4179"
            />
            <path
              d="M225.28 349.866667h597.333333c59.733333 0 107.52 47.786667 107.52 107.52v281.6c0 59.733333-47.786667 107.52-107.52 107.52h-597.333333c-59.733333 0-107.52-47.786667-107.52-107.52V457.386667c0-59.733333 47.786667-107.52 107.52-107.52z"
              fill="#DAE9FF"
              p-id="4180"
            />
            <path
              d="M208.213333 349.866667h558.08c59.733333 0 107.52 47.786667 107.52 107.52v281.6c0 59.733333-47.786667 107.52-107.52 107.52H208.213333c-59.733333 0-107.52-47.786667-107.52-107.52V457.386667c0-59.733333 47.786667-107.52 107.52-107.52z"
              fill="#3889FF"
              p-id="4181"
            />
            <path
              d="M605.866667 759.466667m-25.6 0a25.6 25.6 0 1 0 51.2 0 25.6 25.6 0 1 0-51.2 0Z"
              fill="#FFFFFF"
              p-id="4182"
            />
            <path
              d="M691.2 759.466667m-25.6 0a25.6 25.6 0 1 0 51.2 0 25.6 25.6 0 1 0-51.2 0Z"
              fill="#FFFFFF"
              p-id="4183"
            />
            <path
              d="M776.533333 759.466667m-25.6 0a25.6 25.6 0 1 0 51.2 0 25.6 25.6 0 1 0-51.2 0Z"
              fill="#FFFFFF"
              p-id="4184"
            />
            <path
              d="M233.813333 460.8c-15.36 0-29.013333 11.946667-29.013333 27.306667 0 15.36 11.946667 27.306667 29.013333 27.306666h527.36c15.36 0 29.013333-11.946667 29.013334-27.306666 0-15.36-11.946667-27.306667-29.013334-27.306667H233.813333z"
              fill="#DAE9FF"
              p-id="4185"
            />
            <path
              d="M216.746667 443.733333c-15.36 0-29.013333 11.946667-29.013334 27.306667 0 15.36 11.946667 27.306667 29.013334 27.306667h527.36c15.36 0 29.013333-15.36 29.013333-27.306667s-13.653333-27.306667-29.013333-27.306667H216.746667z"
              fill="#FFFFFF"
              p-id="4186"
            />
          </svg>
        </div>
        <span class="ctype">充值</span>
        <span class="cnum">¥ {{ userinfo.charge_sum.toLocaleString() }}</span>
      </div>
      <div class="infobox">
        <div class="pic">
          <svg
            t="1564454461102"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4053"
            width="38"
            height="38"
          >
            <path
              d="M732.16 439.296V346.112c0-25.6-20.992-46.592-46.592-46.592H314.368c-25.6 0-46.08 20.992-46.08 46.592v92.672c25.6 0 46.08 20.992 46.08 46.592s-20.992 46.592-46.08 46.592V624.64c0 25.6 20.992 46.592 46.592 46.592H686.08c25.6 0 46.592-20.992 46.592-46.592v-92.672c-25.6 0-46.592-20.992-46.592-46.592-0.512-25.6 20.48-46.08 46.08-46.08z m-208.896 174.08h-46.592v-46.592h46.592v46.592z m0-104.448h-46.592v-46.592h46.592v46.592z m0-104.448h-46.592v-46.592h46.592V404.48z"
              fill="#FFCB99"
              p-id="4054"
            />
            <path
              d="M824.832 497.152V404.48c0-25.6-20.992-46.592-46.592-46.592H407.04c-25.6 0-46.08 20.992-46.08 46.592v92.672c25.6 0 46.08 20.992 46.08 46.592s-20.992 46.592-46.08 46.592v92.672c0 25.6 20.992 46.592 46.592 46.592h371.2c25.6 0 46.592-20.992 46.592-46.592v-92.672c-25.6 0-46.592-20.992-46.592-46.592s20.48-46.592 46.08-46.592z m-208.896 174.08h-46.592V624.64h46.592v46.592z m0-104.448h-46.592v-46.592h46.592v46.592z m0-104.448h-46.592v-46.592h46.592v46.592z"
              fill="#FF7E00"
              p-id="4055"
            />
            <path
              d="M211.456 283.136h-29.696v-29.696c0-6.656-5.12-11.776-11.776-11.776-6.656 0-11.776 5.12-11.776 11.776v29.696h-29.696c-6.656 0-11.776 5.12-11.776 11.776s5.12 11.776 11.776 11.776H158.72v29.696c0 6.656 5.12 11.776 11.776 11.776 6.656 0 11.776-5.12 11.776-11.776v-29.696h29.696c6.656 0 11.776-5.12 11.776-11.776s-6.144-11.776-12.288-11.776z"
              fill="#FFC879"
              p-id="4056"
            />
            <path
              d="M174.98624 735.8976l46.336-46.336 46.34112 46.336-46.336 46.34624zM870.4 363.52l34.816-34.816h-69.632z"
              fill="#FFF7EC"
              p-id="4057"
            />
            <path
              d="M870.4 531.968m-32.768 0a32.768 32.768 0 1 0 65.536 0 32.768 32.768 0 1 0-65.536 0Z"
              fill="#FFF7EC"
              p-id="4058"
            />
            <path
              d="M206.336 583.68l-49.664-49.664c-3.584-3.584-9.216-3.584-12.8 0l-49.664 49.664c-3.584 3.584-3.584 9.216 0 12.8l49.664 49.664c3.584 3.584 9.216 3.584 12.8 0l49.664-49.664c3.584-3.584 3.584-9.216 0-12.8z m-56.832 43.008l-36.864-36.864 36.864-36.864 36.864 36.864-36.864 36.864zM926.72 573.952c-30.72 0-56.32 25.088-56.32 56.32 0 30.72 25.088 56.32 56.32 56.32s56.32-25.088 56.32-56.32c-0.512-31.232-25.6-56.32-56.32-56.32z m0 89.088c-17.92 0-32.768-14.848-32.768-32.768s14.848-32.768 32.768-32.768c17.92 0 32.768 14.848 32.768 32.768s-14.848 32.768-32.768 32.768z"
              fill="#FFC879"
              p-id="4059"
            />
          </svg>
        </div>
        <span class="ctype">投注</span>
        <span class="cnum">¥ {{ userinfo.bet_sum.toLocaleString() }}</span>
      </div>
    </div>

    <div class="btnbox">
      <router-link to="/recharge">
        <div class="item">
          <i class="cp cp3"></i>
          <span class="recharge">充值</span>
        </div>
      </router-link>
      <div @click="withdraw">
        <div class="item">
          <i class="cp cptixian"></i>
          <span class="postal">提现</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("base", ["userinfo"])
  },
  mounted() {
    this.get_userinfo();
  },
  methods: {
    ...mapActions("base", ["get_userinfo"]),

    withdraw() {
      if (!this.userinfo.has_pay_password) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "尚未设置支付密码，是否前往设置"
          })
          .then(() => {
            this.$router.push("/setPayPassword/0");
          })
          .catch(() => {
            // on cancel
          });
      } else {
        this.$router.push("/Presentation");
      }
    },

    routerTo(path) {
      this.$router.push(path);
    },
    back() {
      this.$router.push("/mine");
    },
    bill() {
      this.$router.push("/bill-record");
    }
  }
};
</script>
<style lang="less" scoped>
.muAccount {
  padding-top: 0.4rem;
  position: relative;
  height: 100%;
  box-sizing: border-box;
  // background-color: #fff;
  background-color: #4dd2f1;
    .btnbox {
      width: 100%;
      height: 3rem;
      position: absolute;
      z-index: 1;
      padding: 1.9rem 0.15rem 0;
      top: 3.5rem;
      left: 0;
      background-color: #4dd2f1;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .item {
        width: 1.4rem;
        height: 0.52rem;
        line-height: 0.52rem;
        font-size: 0.16rem;
        border-radius: 0.28rem;
        background: rgba(100, 216, 245, 1);
        color: #fff;
        text-align: center;
        .cp {
          font-size: 0.24rem;
          padding-right: 0.2rem;
          vertical-align: middle;
        }
        .recharge,
        .postal {
          font-size: 0.16rem;
        }
      }
    }
  .mineinfo {
    position: absolute;
    top: 0.4rem;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 2.2rem;
    box-sizing: border-box;
    padding: 0.1rem 0.2rem 0.2rem;
    text-align: center;
    border-radius: 0px 0px 20px 20px;
    background-color: #fff;
    .avator {
      width: 0.64rem;
      height: 0.64rem;
      border-radius: 100%;
      overflow: hidden;
      box-shadow: -2px 1px 13px #ddd;
      margin: 0 auto 0.1rem;
      .avatorpic {
        width: 100%;
        height: 100%;
      }
    }
    .username {
      font-size: 0.16rem;
      font-family: HelveticaNeue-Medium;
      font-weight: 500;
      color: rgba(17, 17, 17, 1);
      line-height: 0.3rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .usertodo {
      font-size: 12px;
      font-family: HelveticaNeue;
      color: rgba(204, 204, 204, 1);
      line-height: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .balance {
      display: inline-block;
      width: 100%;
      margin: 0.1rem 0;
      text-align: left;
      font-size: 0.14rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #ccc;
      line-height: 0.3rem;
    }
    .binfo {
      text-align: left;
      .bpic {
        display: inline-block;
        font-size: 0.24rem;
        width: 0.22rem;
        height: 0.22rem;
        color: rgba(250, 114, 104, 1);
        margin-right: 0.2rem;
      }
      .bnum {
        font-size: 0.3rem;
        font-family: HelveticaNeue-Medium;
        font-weight: 500;
        color: rgba(250, 114, 104, 1);
        line-height: 0.37rem;
        letter-spacing: 1px;
        text-shadow: 0px 2px 4px rgba(250, 114, 104, 0.6);
      }
      .danwei {
        font-size: 0.1rem;
        font-family: PingFangSC-Regular;
        color: rgba(250, 114, 104, 1);
        line-height: 0.14rem;
        padding-left: 0.1rem;
      }
    }
  }
  .capitalinfo {
    padding: 1.8rem 0.2rem 0.2rem;
    position: absolute;
    left: 0;
    top: 1.93rem;
    width: 100%;
    height: 3.3rem;
    z-index: 2;
    box-sizing: border-box;
    background: rgba(250, 250, 255, 1);
    border-radius: 0px 0px 20px 20px;
    margin-top: -100px;
    filter: blur(0px);
    .title {
      font-size: 0.14rem;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(17, 17, 17, 1);
      line-height: 0.2rem;
    }
    .infobox {
      overflow: hidden;
      vertical-align: middle;
      margin-top: 0.1rem;
      .pic {
        display: inline-block;
        background-color: #fff;
        height: 0.4rem;
        width: 0.46rem;
        text-align: center;
        line-height: 0.4rem;
        margin-left: 0.2rem;
        margin-right: 0.1rem;
        border-radius: 10px;
        vertical-align: middle;
        .icon {
          vertical-align: middle;
        }
      }
    }
  }
}

.ctype {
  display: inline-block;
  height: 0.4rem;
  font-size: 0.14rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(17, 17, 17, 1);
  line-height: 0.4rem;
}
.cnum {
  float: right;
  font-size: 0.16rem;
  font-family: HelveticaNeue-Medium;
  font-weight: 500;
  color: rgba(127, 222, 23, 1);
  line-height: 0.4rem;
}
</style>
