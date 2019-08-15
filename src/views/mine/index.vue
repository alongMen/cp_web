<template>
  <div class="mine-page">
    <div class="mine">
      <div class="recharge">
        <van-icon size="" name="setting-o" @click="routerTo('/edit-info')" color="#3dd2f3"/>
      </div>
      <div class="head">
        <div class="avator">
          <img :src="userinfo.avatar ? `./image/${this.userinfo.avatar}` : `./image/avator.png`" alt class="avatorpic" />
        </div>
        <div class="mineinfo">
          <p class="nickname">{{userinfo.username || userinfo.mobile || userinfo.email || '火星人'}}</p>
          <!-- <p class="minedo">Whatever is worth do</p> -->
          <p class="balance">
            <span class="btitle">余额：</span>
            <span class="bnum">{{userinfo.balance.toLocaleString()}}</span>
            <span class="danwei"> 元宝</span>
          </p>
        </div>
      </div>
      <div class="minenav">
        <van-grid :border="true" :column-num="3">
          <van-grid-item
            to="/myAccount"
          >
            <svg t="1564553212331" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1830" width="30" height="30"><path d="M1024 1024.032H0c0-282.88 229.12-512 512-512s512 229.12 512 512" fill="#FBC52F" p-id="1831"></path><path d="M720 208a208 208 0 1 1-416 0 208 208 0 0 1 416 0" fill="#FDDF8B" p-id="1832"></path></svg>
            <p class="navtitle">个人账户</p>
          </van-grid-item>

          <van-grid-item
            to="/bank-mange"
          >
            <svg t="1564553338126" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2410" width="30" height="30"><path d="M512.128 0l-512 279.296 512 279.296 511.968-279.296z" fill="#F55071" p-id="2411"></path><path d="M512 923.84L91.84 694.72 0 744.608l512 279.36 512-279.36-91.84-49.92z" fill="#FF99AE" p-id="2412"></path><path d="M512 697.92L91.84 468.8 0 518.72l512 279.36 512-279.36-91.84-49.92z" fill="#F55071" p-id="2413"></path></svg>
            <p class="navtitle">银行卡管理</p>
          </van-grid-item>

          <van-grid-item
            to="/recharge"
          >
            <svg t="1564553281910" class="icon" viewBox="0 0 1056 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2120" width="30" height="30"><path d="M689.92 660.16v62.4h-118.4v33.92h118.4v63.04h-118.4v75.2H454.4v-75.2h-120.32v-63.04h120.32v-33.92h-120.32v-62.4h86.08l-100.8-177.6h128.32L512 622.72l63.68-140.16h128.96l-98.24 177.6h83.52zM512 256L0 512v352c0 88.32 71.36 160 160 160h704c88.32 0 160-71.68 160-160V512L512 256z" fill="#6B7DFA" p-id="2121"></path><path d="M1029.44 256v128l-512-256-512 256V256l512-256z" fill="#BCC4FF" p-id="2122"></path></svg>
            <p class="navtitle">快速充值</p>
          </van-grid-item>
          <van-grid-item
            to="/safe-center"
          >
            <svg t="1564553311719" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2265" width="30" height="30"><path d="M800 288v288h-64.32V288c0-123.84-100.16-224-223.68-224h-0.32c-123.52 0-224 100.16-224 224v288H224l-0.32-288a288 288 0 0 1 288-288H512a288 288 0 0 1 288 288" fill="#BCC4FF" p-id="2266"></path><path d="M559.68 723.2v60.8c0 26.56-21.44 48-47.68 48h-0.32c-26.24 0-47.68-21.44-47.68-48v-60.8c-28.8-16.64-48-47.68-48-83.2 0-53.12 42.88-96 96-96 52.8 0 96 42.88 96 96a95.36 95.36 0 0 1-48.32 83.2M512 352C229.12 352 0 502.4 0 688S229.12 1024 512 1024c282.56 0 512-150.4 512-336S794.56 352 512 352" fill="#6B7DFA" p-id="2267"></path></svg>
            <p class="navtitle">安全中心</p>
          </van-grid-item>
          <van-grid-item
            to="/game-order"
          >
            <svg t="1564553385024" class="icon" viewBox="0 0 1165 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2701" width="30" height="30"><path d="M938.443034 298.01931c-203.493517-43.608276-203.493517 94.490483-356.140137 94.490483S429.656276 247.137103 226.127448 298.01931C22.598621 348.866207-79.095172 1017.608828 73.480828 1017.608828c152.646621 0 254.411034-188.980966 508.822069-188.980966 254.375724 0 356.140138 188.980966 508.822069 188.980966 152.61131 0 50.846897-668.70731-152.681932-719.624828zM436.930207 675.981241H342.439724v94.490483H240.67531v-94.490483H146.184828v-94.490482h94.490482v-94.490483h94.490483v94.490483h101.764414v94.490482z m436.082759 72.66869c-65.394759 0-123.550897-50.846897-123.550897-123.586207 0-72.66869 58.156138-116.276966 123.586207-116.276965 65.394759 0 123.586207 50.882207 123.586207 123.586207 0 72.66869-58.191448 116.276966-123.586207 116.276965z" fill="#FBC52F" p-id="2702"></path><path d="M582.267586 319.805793c21.821793 0 43.643586-7.273931 65.430069-14.512552-7.238621-14.547862-14.512552-36.369655-14.512552-65.430069V188.980966c0-50.846897 43.608276-94.490483 94.490483-94.490483h196.254897V0H705.853793c-94.490483 0-174.433103 79.942621-174.433103 174.433103v65.430069c0 29.060414-7.273931 50.846897-14.547862 65.430069 21.821793 14.512552 43.608276 14.512552 65.430069 14.512552z" fill="#FDDF8B" p-id="2703"></path></svg>
            <p class="navtitle">游戏记录</p>
          </van-grid-item>
          <van-grid-item
            to="/recharge-record"
          >
            <svg t="1564553366888" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2556" width="30" height="30"><path d="M0 772.8V1024h273.92l42.88-51.168-284.48-238.72zM384.96 840.32l-49.28-41.28 376.32-448.32 49.28 41.28-376.32 448.32z m163.2-720.96L131.84 615.68 73.6 685.12l284.48 238.72 60.16-71.68 414.4-494.08-284.48-238.72zM648.32 0l-58.88 70.4 284.48 238.72 58.88-70.4z" fill="#83DE84" p-id="2557"></path><path d="M704 798.08h320.032v-64H704zM576 1024h448v-64H576z" fill="#BCFFBC" p-id="2558"></path></svg>
            <p class="navtitle">充提记录</p>
          </van-grid-item>
          <van-grid-item
            to="/agent-center"
          >
            <svg t="1564553260491" class="icon" viewBox="0 0 1222 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1975" width="30" height="30"><path d="M491.529579 22.924387c-30.554839-30.554839-78.947097-30.554839-106.958451 0L23.033063 381.918968a76.899097 76.899097 0 0 0 0 109.501935L527.171386 995.592258c30.554839 30.587871 78.947097 30.587871 106.958451 0l53.446194-53.479226-269.873548-269.873548a24.642065 24.642065 0 0 1 0-35.674839 24.609032 24.609032 0 0 1 35.641806 0l269.873548 269.906581 71.316646-71.250581L435.473837 473.583484a24.576 24.576 0 0 1 0-35.608774 24.609032 24.609032 0 0 1 35.674839 0l361.538065 361.571096 71.283613-71.349677-269.873549-272.417032a24.642065 24.642065 0 0 1 0-35.674839 24.609032 24.609032 0 0 1 35.641807 0l272.450064 269.906581 99.294968-106.92542L491.529579 22.924387z" fill="#F55071" p-id="1976"></path><path d="M1199.377837 313.178839L982.950483 96.784516c-30.554839-30.554839-78.947097-30.554839-106.92542 0l-122.219355 124.762839 323.385807 325.896258 122.219355-122.186323c30.521806-33.098323 30.521806-81.523613 0-112.045419" fill="#FF99AE" p-id="1977"></path></svg>
            <p class="navtitle">推广代理</p>
          </van-grid-item>
      </van-grid>
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
    // console.log(this.userinfo);
  }
};
</script>

<style scoped lang="less">

.mine-page {
  width: 100%;
  height: 100%;
  padding: 0.3rem 0;
  padding-bottom: 1rem;
  background-color: #fbfeff;
  // overflow: auto;
  box-sizing: border-box;
  .mine {
    width: 100%;
    height: 100%;
    position: relative;
    padding-bottom: 0.65rem;
    .recharge {
      position: absolute;
      right: 0.2rem;
      top: 0;
      color: #DDDDDD;
      font-size: 0.16rem;
    }
    .head {
      width: 100%;
      display: flex;
      padding:0 .2rem .2rem;
      box-sizing: border-box;
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
      margin-top: .2rem;
      .navtitle{font-size: .12rem;}
      .icon{
        margin-bottom: .1rem;
      }
    }
  }
}
.van-grid-item{height: 1.2rem;}
.van-grid-item__content::after{
  border-width: 0 0.5px 0.5px 0;
}

</style>