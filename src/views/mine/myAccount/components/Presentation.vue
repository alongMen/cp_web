<template>
  <div class="presentationpage">
    <van-nav-bar left-text left-arrow fixed @click-left="back" :border="false">

    </van-nav-bar>

    <div class="preinfobox">
      <h2>提现金额</h2>
      <div class="van-hairline--bottom">
        <span class="iconNum">¥</span>
        <van-field
          class="price"
          readonly
          clickable
          :value="form.prePrice ? form.prePrice  : '0 .00'"
          @touchstart.native.stop="show = true"
          @input="handleipt"
        />
      </div>
      <van-number-keyboard
        v-model="form.prePrice"
        :show="show"
        :maxlength="9"
        :z-index="20"
        @blur="show = false"
      />
      <p v-if="errMsg.length > 0" style="color:red;font-size:.1rem;padding-left:.3rem;">{{ errMsg }}</p>
      <p class="tils">
        钱包余额
        <span>{{ UserInfo.balance ? UserInfo.balance : '0' + '.00' }}</span>，
        <span class="preAll" @click="preAll">全部提现</span>
        <span style="color:red;">
          （我的提现金额范围 {{ setting.min_amount || '0.00' }}~{{
          setting.max_amount || '0.00'
          }})
        </span>
      </p>
      <div class="prenum">
        <div
          class="itemnum"
          v-for="(item, index) in btnnum"
          :key="index"
          @click="handleNum(item)"
        >{{ item }}</div>
      </div>
    </div>

    <div class="cardinfo">
      <h2>到账银行卡</h2>
      <div class="nobank" v-if="myBankList.length == 0">
        <img src="@/assets/images/nobank.png" alt class="nobankpic" />
        <div class="nobankadd">
          暂无银行卡，
          <span style="color:red" @click="toAdd">去添加 ?</span>
        </div>
      </div>
      <van-swipe @change="onChange" :initial-swipe="0" v-if="myBankList.length != 0">
        <van-swipe-item
          v-for="(item, index) in myBankList"
          :style="{ backgroundColor: item.bgc ? item.bgc : '#82e514' }"
          :key="index"
          class="bankitem"
        >
          <i class="bankname">{{ item.bankname }}</i>
          <img src="@/assets/images/picl.png" alt class="picl" />
          <i :class="item.icon" class="my picr"></i>
          <p class="title1">card number</p>
          <p class="account">
            <span>{{ item.card_no.substr(0, 4) }}</span>
            <span>***</span>
            <span>***</span>
            <span>{{ item.card_no.substr(-4) }}</span>
          </p>
          <div class="name">
            <p class="title2">name</p>
            <p class="nameinfo">{{ item.holder }}</p>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="okbox">
      <van-button class="okBtn" :disabled="isDisabled" @click="okAdd">完 成</van-button>
    </div>

    <van-dialog v-model="isSub" title="提现信息确认" :showConfirmButton="false" @confirm="handleSbmit">
      <i class="cp cpfork closeD" @click="isSub = false"></i>
      <div class="baninfo">
        <div class="infobox">
          <div class="infoitem">持卡人姓名：</div>
          <div class="iteminfo">{{ form.bankinfo.holder }}</div>
        </div>
        <div class="infobox">
          <div class="infoitem">所选银行：</div>
          <div class="iteminfo">{{ form.bankinfo.bankname }}</div>
        </div>
        <div class="infobox">
          <div class="infoitem">银行卡号：</div>
          <div class="iteminfo">{{ form.bankinfo.card_no }}</div>
        </div>
        <div class="infobox">
          <div class="infoitem">提现金额：</div>
          <div class="iteminfo">{{ form.prePrice + '.00' }}</div>
        </div>
        <div class="infobox">
          <div class="infoitem">手续费：</div>
          <div class="iteminfo">{{ form.fee + '.00' }}</div>
        </div>
        <div class="infobox">
          <div class="infoitem">到账金额：</div>
          <div class="iteminfo">{{ form.real_amount + '.00' }}</div>
        </div>
        <van-divider
          :style="{
            color: '#1989fa',
            borderColor: '#1989fa',
            padding: '0 15px',
          }"
        >请输入提现密码</van-divider>
        <van-password-input
          :value="value"
          :length="6"
          :gutter="5"
          border="1"
          @focus="showKeyboard = true"
        />
      </div>
      <!-- <subpage v-show="isSub" :form="form" :isShowKeyboard="isNum"></subpage> -->
    </van-dialog>

    <van-number-keyboard
      :z-index="9999"
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>
<script>
import { bankList } from "@/utils/bank_list.js";
import {
  get_my_bank_list,
  get_withdraw_setting,
  set_withdraw
} from "@/service/index";
import { Toast, Dialog } from "vant";
import { mapActions, mapMutations, mapState } from "vuex";
import { setTimeout } from "timers";
// import subpage from './components/subpage'
export default {
  components: {
    Toast,
    Dialog
  },
  data() {
    return {
      btnnum: ["100", "200", "500", "1000"],
      show: false,
      UserInfo: {},
      form: {
        prePrice: "",
        fee: 0,
        real_amount: 0,
        bankinfo: {}
      },
      errMsg: "",
      bankList,
      bgc: "bankbgc",
      myBankList: [],
      loading: true,
      Index: 0,
      value: "",
      showKeyboard: false,
      isSub: false,
      setting: {}
    };
  },
  computed: {
    ...mapState("base", ["userinfo"]),
    isDisabled() {
      if (!parseInt(this.form.prePrice)) {
        return true;
      }
    }
  },
  methods: {
    ...mapActions("base", ["get_userinfo"]),
    ...mapMutations("base", ["set_user_balance"]),
    toAdd() {
      this.$router.push("/addBank");
    },
    async getUserinfo() {
      const res = await this.get_userinfo();
      this.UserInfo = this.$store.state.base.userinfo;
      // console.log(res)
    },
    async handleSbmit() {
      const toast = this.$toast.loading({
        duration: 1000, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner",
        message: "提交中..."
      });
      const params = {
        user_bank_card_id: this.form.bankinfo.bank_id,
        pay_password: this.value,
        amount: parseFloat(this.form.prePrice)
      };
      console.log(params);
      const res = await set_withdraw(params);
      toast.clear();
      if (res.status < 400) {
        this.set_user_balance(this.userinfo.balance - this.form.prePrice);
        this.isSub = false;
        Toast.success("提现成功！");
      }
    },
    async onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length == 6) {
        this.showKeyboard = false;
        const toast = this.$toast.loading({
          duration: 1000, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: "spinner",
          message: "提交中..."
        });
        const params = {
          user_bank_card_id: this.form.bankinfo.bank_id,
          pay_password: this.value,
          amount: parseFloat(this.form.prePrice)
        };
        console.log(params);
        const res = await set_withdraw(params);
        this.value = "";

        if (res.status < 400) {
          this.set_user_balance(this.userinfo.balance - this.form.prePrice);
          this.$toast.success("提现成功！");
          this.isSub = false;
        } else {
          this.$toast.fail({
            duration: 2000, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            message: res.data.errorMessage
          });
          this.isSub = false;
        }
      }
      // console.log(this.value+'--')
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    preAll() {
      this.form.prePrice = this.UserInfo.balance.toString();
    },
    handleNum(num) {
      this.form.prePrice = num;
    },
    back() {
      this.$router.push("/myAccount");
    },
    onChange(index) {
      this.Index = index ? index : 0;
    },
    async okAdd() {
      // if(!this.setting.need_flow)return;
      // console.log(this.form.prePrice)
      if (this.UserInfo.balance == 0) {
        this.$toast.fail("余额不足！");
        return;
      }
      if (this.form.prePrice) {
        let fee = 0;
        // console.log(this.setting.fee_rate)

        this.form.shouxu = this.form.prePrice * this.setting.fee_rate;
        if (
          this.form.prePrice < this.setting.min_amount ||
          this.form.prePrice > this.setting.max_amount
        ) {
          // this.errMsg = `提现金额不满足提现规则,(${this.setting.min_amount}~${this.setting.max_amount})`;
          this.$toast(
            `提现金额不满足提现规则(${this.setting.min_amount}~${this.setting.max_amount})`
          );
          return false;
        }
        if (this.form.shouxu <= this.setting.min_fee) {
          fee = this.setting.min_fee;
        } else if (this.form.shouxu >= this.setting.max_fee) {
          fee = this.setting.min_fee;
        } else {
          fee = this.form.shouxu;
        }
        if (this.setting.fee_rate == 0) {
          fee = 0;
        }
        this.form.fee = fee;
        this.form.real_amount = this.form.prePrice - fee;
      }
      if (!this.form.prePrice) {
        this.$toast.fail("请输入正确提现金额！");
        return false;
      }
      if (!this.form.bankinfo.bank_id) {
        this.$toast.fail("请选择银行卡！");
        return false;
      }
      this.isSub = true;
      this.myBankList.forEach((item, inx) => {
        if (inx == this.Index) {
          this.form.bankinfo = item;
        }
      });
    },
    async getMyBank() {
      this.loading = false;
      const res = await get_my_bank_list();
      if (res.status < 400) {
        this.myBankList = res.data;
        if (res.data.length !== 0) {
          this.form.bankinfo.bank_id = res.data[0].id;
        }
        if (this.myBankList) {
          this.myBankList.forEach(items => {
            if (this.bankList) {
              this.bankList.forEach(item => {
                if (item.id == items.bank_id) {
                  items.bgc = item.color.split(",")[0] || "#4DD2F1";
                  items.bankname = item.name;
                  items.icon = item.logo;
                }
              });
            }
          });
        }
        // console.log(this.myBankList);
      }
    },
    async get_withdraw_settings() {
      const res = await get_withdraw_setting();
      if (res.status < 400) {
        this.setting = res.data;
      }
    },
    handleipt(value) {
      console.log(value);
    }
  },
  mounted() {
    this.getMyBank();
    this.getUserinfo();
    this.get_withdraw_settings();
  }
};
</script>
<style lang="less">
@import "../../../../assets/bank-icon/style.css";
.presentationpage {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding-top: 0.5rem;
  padding-bottom: 0.3rem;
  overflow: auto;
  background: rgba(250, 250, 250, 1);
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
  .preinfobox {
    padding: 0.2rem 0.2rem 0.3rem;
    // height: 2rem;
    width: 100%;
    background-color: #fff;
    border-radius: 0 0 0.3rem 0.3rem;
    box-sizing: border-box;
    h2 {
      line-height: 0.2rem;
      font-size: 0.14rem;
    }
    .van-hairline--bottom {
      height: 0.36rem;
      display: flex;
      box-sizing: border-box;
      .iconNum {
        font-size: 0.3rem;
        line-height: 0.35rem;
        font-weight: bold;
        padding-right: 0.1rem;
      }
      .price {
        // font-weight: 500;
        flex: 1;
        &.van-cell {
          padding: 0 !important;
          .van-field__control {
            font-size: 0.24rem !important;
            line-height: 0.34rem;
          }
        }
      }
    }
    .tils {
      display: inline-block;
      margin-top: 0.1rem;
      margin-bottom: 0.2rem;
      .preAll {
        color: #4dd2f1;
      }
    }
    .prenum {
      display: flex;
      .itemnum {
        width: 0.64rem;
        height: 0.32rem;
        line-height: 0.32rem;
        text-align: center;
        color: #fff;
        background: #4dd2f1;
        border-radius: 0.08rem;
        margin-left: 0.05rem;
        margin-right: 0.05rem;
      }
    }
  }
  .cardinfo {
    width: 100%;
    box-sizing: border-box;
    padding: 0.2rem;
    h2 {
      line-height: 0.2rem;
      font-size: 0.14rem;
    }
    .van-swipe {
      width: 100%;
    }
    .bankitem {
      margin-top: 0.2rem;
      width: 100%;
      height: 1.68rem;
      padding: 0.65rem 0.15rem 0.15rem;
      box-sizing: border-box;
      // background-color: #812A89;
      border-radius: 0.2rem;
      margin-bottom: 0.2rem;
      position: relative;
      .bankname {
        display: inline-block;
        position: absolute;
        top: 0.2rem;
        left: 0.6rem;
        font-size: 0.18rem;
        color: #fff;
        font-style: normal;
        width: 1.5rem;
        text-align: center;
      }
      .picl {
        position: absolute;
        top: 0.15rem;
        left: 0.15rem;
        width: 0.4rem;
        height: 0.3rem;
      }
      .picr {
        position: absolute;
        top: 0.15rem;
        right: 0;
        width: 0.5rem;
        height: 0.23rem;
      }
      .title1 {
        font-size: 0.1rem;
        font-family: HelveticaNeue;
        color: rgba(88, 19, 94, 1);
        line-height: 0.12rem;
      }
      .account {
        display: flex;
        justify-content: space-between;
        font-family: HelveticaNeue;
        color: rgba(255, 255, 255, 1);
        line-height: 0.22rem;
        margin: 0.1rem 0;
        span {
          font-size: 0.18rem;
        }
      }
      .name {
        width: 50%;
        float: left;
        .title2 {
          color: #58135e;
        }
        .nameinfo {
          font-size: 0.12rem;
          font-family: HelveticaNeue;
          color: rgba(238, 238, 238, 1);
          line-height: 0.24rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .expires {
        width: 50%;
        float: right;
        text-align: right;
        .title3 {
          color: #58135e;
        }
        .dateinfo {
          font-size: 0.12rem;
          font-family: HelveticaNeue;
          color: rgba(238, 238, 238, 1);
          line-height: 0.24rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}

.my::before {
  font-size: 0.3rem;
  color: #fff;
}
.van-dialog {
  top: 40%;
}

.closeD {
  position: absolute;
  left: 0.1rem;
  top: 0.1rem;
  color: red;
  font-size: 0.16rem;
}

.baninfo {
  padding: 0.2rem;
  .infobox {
    display: flex;
    font-size: 0.16rem;
    line-height: 0.2rem;
    .infoitem {
      width: 80px;
      text-align: right;
    }
    .iteminfo {
      flex: 1;
    }
  }
}

.van-password-input__security li {
  border: 1px solid #ccc;
  height: 40px;
}

.nobankpic {
  display: block;
  margin: 20px auto;
  width: 2rem;
  height: 1.48rem;
}
.nobankadd {
  width: 100%;
  text-align: center;
}
</style>
