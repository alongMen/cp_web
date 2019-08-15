<template>
  <div class="chat-list" id="gundong">
    <template v-for="(item, index) in data">
      <div class="service-item" :key="index" v-if="item.type === 1">
        <div class="service-avatar"></div>

        <div class="center">
          <p class="username">系统提示</p>
          <div class="bottom">
            <div class="service-chat-card content-text">{{ item.data }}</div>
            <div class="date">{{ item.date }}</div>
          </div>
        </div>
      </div>

      <div class="service-item" v-if="item.type === 2" :key="index">
        <!-- <div class="service-avatar user-avatar"></div> -->
        <img
          :src="item.avatar ? `/image/${item.avatar}` : `/image/avator.png`"
          alt
          class="user-avatar"
        />
        <div class="center">
          <p class="username">{{ item.username }}</p>
          <div class="bottom">
            <div class="service-chat-card user-card">
              {{ item.data }}
              <span class="stage-text">（{{ item.stage }}）</span>
              <div class="amount-row">{{ item.amount }}元</div>
            </div>
            <div class="date">{{ item.date }}</div>
          </div>
        </div>
      </div>

      <div class="self-item" v-if="item.type === 3" :key="index">
        <div class="self-date">{{ item.date }}</div>
        <div class="self-chat-card">
          <p class="bet-text">
            {{ item.data }}
            <span class="stage-text">（{{ item.stage }}）</span>
          </p>
          <div class="amount-row">{{ item.amount }}元</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },
  mounted() {
    this.$nextTick(() => {
      let msg = document.getElementById("gundong"); // 获取对象
      msg.scrollTop = msg.scrollHeight + "80px"; // 滚动高度
    });
  }
};
</script>

<style lang="less" scoped>
.chat-list {
  padding-bottom: 0.6rem;
  padding-top: 1.8rem;
  overflow: auto;
  .service-item {
    display: flex;
    padding: 20px;
  }
  .service-chat-card {
    margin-top: 10px;
    box-sizing: border-box;
    background: rgba(243, 253, 255, 1);
    border-radius: 4px 24px 24px 24px;
    padding: 14px;
    line-height: 20px;
  }
  .service-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-image: url(/service-avatar.png);
    background-size: contain;
  }

  .user-item {
  }

  .self-item {
    padding: 20px;
    display: flex;
    .self-chat-card {
      flex: 1;
      background: rgba(250, 114, 104, 1);
      border-radius: 24px 24px 4px 24px;
      padding: 14px;
      line-height: 20px;
      box-sizing: border-box;
      margin-left: 20px;
    }
  }

  .center {
    flex: 1;
    margin-left: 10px;
  }

  .username {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(189, 196, 198, 1);
  }

  .content-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 166, 168, 1);
  }

  .date {
    padding-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-family: HelveticaNeue;
    color: rgba(203, 212, 213, 1);
  }

  .self-date {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-family: HelveticaNeue;
    color: rgba(203, 212, 213, 1);
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bet-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

  .stage-text {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

  .amount-row {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 219, 96, 1);
  }

  .user-card {
    flex: 1;
    background: rgba(75, 210, 241, 1);
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
