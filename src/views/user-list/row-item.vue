<template>
  <div class="user-list-row-item" @click="detail">
    <div class="name">

      <img :src="data.avatar ? `./image/${data.avatar}` : `./image/avator.png`" alt="" class="avatar">
      <p class="username">{{data.username || data.mobile || data.email}}</p>
    </div>

    <div class="lv">{{data.level}}级代理</div>

    <div class="balance">{{data.balance.toLocaleString()}}</div>
  </div>
</template>


<script>
export default {
  props: {
    data: Object
  },
  methods:{
    detail(){
      this.$emit('detail' , this.data);
    }
  }
};
</script>



<style lang="less" scoped>
.user-list-row-item {
  display: flex;
  padding: 10px;
  align-items: center;
  .name {
    flex: 2;
    display: flex;
    align-items: center;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-image: url("../../assets/images/avator.png");
      background-size: contain;
      background-repeat: no-repeat;
    }

    .username {
      padding-left: 10px;
      font-size: 12px;
      font-family: HelveticaNeue;
      color: rgba(17, 17, 17, 1);
    }
  }

  .lv {
    flex: 1;
  }

  .balance {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(250, 114, 104, 1);
  }
}
</style>
