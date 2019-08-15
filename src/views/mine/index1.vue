<template>
  <div class="mine-page">
    <div class="mine">
      <div class="recharge" @click="routerTo('/recharge')">充值</div>
      <div class="head">
        <div class="avator">
          <img src="@/assets/images/avator.png" alt class="avatorpic" />
        </div>
        <div class="mineinfo">
          <p class="nickname">{{userinfo.username || userinfo.mobile || userinfo.email}}</p>
          <!-- <p class="minedo">Whatever is worth do</p> -->
          <p class="balance">
            <span class="btitle">余额：</span>
            <span class="bnum">{{userinfo.balance.toLocaleString()}}</span>
            <span class="danwei"> 元</span>
          </p>
        </div>
      </div>
      <div class="minenav">
        <div class="myNav" @click="routerTo('/myAccount')">
          <i class="cp cpcpme"></i>
          <p class="navtitle">个人账户</p>
        </div>
        <div class="myNav" @click="routerTo('/recharge-record')">
          <i class="cp cpcprecord"></i>
          <p class="navtitle">充提记录</p>
        </div>
        <div class="myNav" @click="routerTo('/bank-mange')">
          <i class="cp cpcpmange"></i>
          <p class="navtitle">银行卡管理</p>
        </div>
        <router-link to="/safe-center" tag="div" class="myNav">
          <i class="cp cpcpsafe"></i>
          <p class="navtitle">安全中心</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: "mine",
  data() {
    return {};
  },
  computed: {
    ...mapState('base',['userinfo'])
  },
  methods: {
    ...mapActions('base',['get_userinfo']),
    routerTo(path){
      this.$router.push(path);
    },
    bankMange() {
      
    }
  },
  mounted() {
    this.get_userinfo();
  }
};
</script>

<style scoped lang="less">
.mine-page {
  width: 100%;
  height: 100%;
  padding: 0.3rem 0.2rem;
  padding-bottom: 1rem;
  background-color: #fbfeff;
  overflow: auto;
  box-sizing: border-box;
  .mine {
    width: 100%;
    height: 100%;
    position: relative;
    padding-bottom: 0.65rem;
    .recharge {
      position: absolute;
      right: 0;
      top: 0;
      color: #fa7268;
      font-size: 0.16rem;
    }
    .head {
      width: 100%;
      display: flex;
      padding-bottom: 0.2rem;
      .avator {
        width: 0.64rem;
        height: 0.64rem;
        border-radius: 100%;
        overflow: hidden;
        box-shadow: -2px 1px 13px #ddd;
        margin-right: 0.1rem;
        .avatorpic {
          width: 100%;
          height: 100%;
        }
      }
      .mineinfo {
        .nickname {
          font-size: 0.18rem;
          font-family: HelveticaNeue-Medium;
          font-weight: 700;
          color: rgba(17, 17, 17, 1);
          line-height: 0.3rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .minedo {
          font-size: 12px;
          font-family: HelveticaNeue;
          color: rgba(204, 204, 204, 1);
          line-height: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .balance {
          .btitle {
            color: rgba(250, 114, 104, 1);
            line-height: 20px;
            font-size: 0.14rem;
          }
          .bnum {
            font-size: 0.18rem;
            font-family: HelveticaNeue-Medium;
            font-weight: 500;
            color: rgba(250, 114, 104, 1);
            line-height: 0.23rem;
            text-shadow: 0px 2px 2px rgba(250, 114, 104, 0.41);
          }
          .danwei {
            font-size: 0.1rem;
            font-family: PingFangSC-Regular;
            color: rgba(250, 114, 104, 1);
            line-height: 0.14rem;
          }
        }
      }
    }
    .minenav {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .myNav {
        width: 47%;
        height: 2.3rem;
        background-color: #f0fcff;
        border-radius: 22px;
        margin-bottom: 0.2rem;
        box-sizing: border-box;
        text-align: center;
        display: flex;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
        &:nth-child(odd) {
          margin-right: 0.08rem;
        }
        &:nth-child(even) {
          margin-left: 0.08rem;
        }
        &:nth-child(3) {
          height: 1.68rem;
        }
        &:nth-child(4) {
          height: 1.68rem;
        }
        .cp {
          font-size: 30px;
          width: 100%;
          height: 0.25rem;
          margin-bottom: 0.1rem;
          &.cpcpme {
            color: #ffda1d;
          }
          &.cpcprecord {
            color: #82e514;
          }
          &.cpcpmange {
            color: #ff0000;
          }
          &.cpcpsafe {
            color: #0f34f5;
          }
        }
        .navtitle {
          color: rgba(17, 17, 17, 1);
          line-height: 0.2rem;
          width: 100%;
          font-weight: 700;
        }
      }
    }
  }
}
</style>