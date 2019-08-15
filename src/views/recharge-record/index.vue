<template>
  <div class="layout-with-fix-header" >
    <div class="fix-header">
      <van-nav-bar title="充提记录" left-arrow @click-left="onClickLeft" />
      <div class="tab-wrap">
        <div class="tabbar">
          <div class="tab" :class="{'active':active===0}" @click="selectTab(0)">充值</div>

          <div class="tab" :class="{'active':active===1}" @click="selectTab(1)">提现</div>
        </div>
      </div>
    </div>


    <recharge v-if="active ===0"/>


    <withdraw v-if="active === 1" />

   
   
  </div>
</template>







<script>
import Recharge from "./components/recharge";
import withdraw from "./components/withdraw";
export default {
  components: {
    Recharge,
    withdraw
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/mine");
    },
    selectTab(i) {
      this.active = i;
    }
  }
};
</script>


<style lang="less" scoped>
.tab-wrap {
  width: 100%;
  background: #fff;
  padding: .0625rem 0;
  .tabbar {
    // width: 100%;
    height: 30px;
    background: rgba(255, 255, 255, 1);
    display: flex;
    border-radius: .0625rem;
    border: 1px solid rgba(77, 210, 241, 1);
    margin: 0 0.0625rem;
    overflow: hidden;
    .tab {
      flex:1;
      height: 100%;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.125rem;
      color: rgba(155, 166, 168, 1);
      font-family: PingFangSC-Regular;
    }

    .active {
      color: #fff;
      background: #4dd2f1;
      border-radius: .0625rem;
    }
  }
}
</style>
