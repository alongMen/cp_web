<template>
  <div class="bankmange">
    <van-nav-bar
      title="银行卡管理"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
    <div class="banklist">
      <div v-if="myBankList.length == 0">
        <img src="@/assets/images/nobank.png" alt="" class="nobank">
      </div>
      <div
        class="bankitem"
        :style="{ backgroundColor: item.bgc ? item.bgc : '#82e514' }"
        v-for="(item, index) in myBankList"
        :key="index"
        v-if="myBankList.length > 0"
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
        <div class="expires">
          <p class="title3">expires</p>
          <p class="dateinfo">06/June</p>
        </div>
      </div>
    </div>
    <div class="addbox">
      <div class="add" @click="add">添加银行卡</div>
    </div>
  </div>
</template>
<script>
import { bankList } from '@/utils/bank_list.js';
import { get_my_bank_list } from '@/service/index';
import { Toast } from 'vant';
export default {
  components: {
    Toast,
  },
  name: 'bank-mange',
  data() {
    return {
      bankList,
      bgc: 'bankbgc',
      myBankList: [],
    };
  },
  mounted() {
    this.getMyBank();
  },

  methods: {
    onClickLeft() {
      this.$router.push('/mine');
    },
    add() {
      this.$router.push('/addBank');
    },
    async getMyBank() {
      this.loading = false;
      const res = await get_my_bank_list();
      if (res.status < 400) {
        this.myBankList = res.data;
        this.myBankList.forEach(items => {
          this.bankList.forEach(item => {
            if (item.id == items.bank_id) {
              items.bgc = item.color.split(',')[0] || '#4DD2F1';
            }
          });
        });
        // console.log(this.myBankList);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import '../../../assets/bank-icon/style.css';
.bankmange {
  width: 100%;
  padding-bottom: 0.2rem;
  .banklist {
    padding: 0.5rem 0.2rem;
    .nobank{
      display: block;
      width: 2rem;
      height: 1.48rem;
      margin: .5rem auto .1rem;
    }
    .bankbgc {
      background-color: #812a89;
    }
    .bankitem {
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
  .addbox {
    padding: 0 0.2rem;
    .add {
      width: 100%;
      height: 0.42rem;
      line-height: 0.42rem;
      border-radius: 0.14rem;
      border: 1px dashed rgba(158, 237, 255, 1);
      text-align: center;
      font-size: 0.15rem;
      color: rgba(250, 114, 104, 1);
    }
  }
}

.my::before {
  font-size: 0.3rem;
  color: #fff;
}
</style>
