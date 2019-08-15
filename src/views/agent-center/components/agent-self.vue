<template>
  <div class="agent-self">
    <div class="wrap">
      <div class="icon-row">
        
        <van-icon name="arrow-left" color="#fff" size="20" @click="routeTo('/mine')"/>


        <div class="icons">
          <div class="crown"></div>

          <div class="door"></div>
        </div>

      </div>

      <div class="info-wrap">
        <img :src="userinfo.avatar ? `./image/${this.userinfo.avatar}` : `./image/avator.png`" alt="" class="avatar">

        <div class="info">
          <p class="name">
            {{userinfo.nickname|| userinfo.username || userinfo.mobile || userinfo.email}}
            <span
              class="agent-name"
            >(黄金代理)</span>
          </p>
          <p class="name">
            <span class="agent-name">佣金:</span>
            {{userinfo.commission.toLocaleString()}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("base", ["userinfo"])
  },
  methods: {
    ...mapActions("base", ["get_userinfo"]),
    routeTo(p){
      this.$router.push(p);
    }
  },
  mounted() {
    this.get_userinfo();
  }
};
</script>




<style lang="less" scoped>
.agent-self {
  border-radius: 0px 0px 30px 30px;
  height: 170px;

  box-sizing: border-box;
  background-image: url("../../../assets/images/agent-bg.png");
  background-size: contain;
  position: relative;
  z-index: 10;
  .wrap {
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(7, 17, 41, 0.8);
    border-radius: 0px 0px 30px 30px;
    position: absolute;
    padding: 20px;
  }
  .icon-row {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
  }
  .icons{
    display: flex;
  }
  .crown {
    background-image: url("../../../assets/images/crown.png");
    background-size: contain;
    width: 20px;
    height: 20px;
  }

  .door {
    background-image: url("../../../assets/images/door.png");
    background-size: contain;
    width: 20px;
    height: 20px;
    margin-left: 20px;
  }

  .info-wrap {
    display: flex;
    .avatar {
      width: 60px;
      height: 60px;
      
      border-radius: 50%;
    }
    .name {
      font-size: 16px;
      font-family: HelveticaNeue-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }

    .agent-name {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(204, 204, 204, 1);
    }

    .info {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
}
</style>
