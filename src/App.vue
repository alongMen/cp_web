<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
import io from "socket.io-client";
import { mapActions , mapMutations} from 'vuex';
export default {

  methods:{
   ...mapMutations("base", ["set_user_balance"]),
  },


  mounted() {
    if (this.$ws === null) {
      return;
    }

    this.$ws.on("connect", () => {
      this.$ws.emit("user-connect");

      this.$ws.on("force-quit", () => {
        console.log("被踢了");
        this.$toast("由于您违反平台协议，被强制踢出系统并封禁!");
        localStorage.removeItem("token");
        this.$ws.close();
        this.$ws = null;
        this.$router.replace("/login");
      });

      this.$ws.on('settle-finish' , (balance)=>{

         this.set_user_balance(balance);
      });
    });
  },
  created() {
    const ws = process.env.VUE_APP_WS_COMMON_URL;
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    this.$ws = io(ws, {
      query: {
        token: "Bearer " + token
      }
    });
  }
};
</script>




<style lang="less">
@import "./assets/css/reset.css";
@import "./assets/css/base.less";
#app {
  font-family: "Microsoft Yahei", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.24rem;
  span {
    margin-left: 2%;
    color: #666;
  }
}

body,
html {
  width: 100%;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
