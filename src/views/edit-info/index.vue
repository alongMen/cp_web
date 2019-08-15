<template>
  <div class="layout-with-fix-header">
    <div class="fix-header">
      <van-nav-bar title="标题" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="wrap">
      <div class="form">
        <div class="row van-hairline--bottom" @click="setAvatar">
          <span class="label">头像</span>

          <div class="content">
            <img :src="avatar" alt class="avatar" />
            <van-icon name="arrow" />
          </div>
        </div>

        <div class="row van-hairline--bottom" @click="setNickname">
          <span class="label">昵称</span>

          <div class="content">
            <span class="value">{{userinfo.nickname ? userinfo.nickname : '点击设置'}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>

      <div class="button" @click="logout">退出登录</div>
    </div>

    <van-popup v-model="showNick" position="bottom" :style="{ height: '101%' , width: '100%' }">
      <div class="nickname-wrap">
        <van-nav-bar title="设置昵称" left-text="取消" @click-left="cancel" @click-right="ok">
          <van-button type="primary" slot="right" size="small" :loading="nicknameLoading">完成</van-button>
        </van-nav-bar>
        <div class="input">
          <input type="text" v-model="nickname" />
        </div>
      </div>
    </van-popup>

    <van-popup v-model="showAvatar" position="bottom" :style="{ height: '101%' , width: '100%' }">
      <div class="nickname-wrap">
        <van-nav-bar title="设置头像" left-text="取消" @click-left="avatarCancel" @click-right="avatarOk">
          <van-button type="primary" slot="right" size="small" :loading="nicknameLoading">完成</van-button>
        </van-nav-bar>

        <van-grid :gutter="0" :column-num="4" :border="false">
          <van-grid-item v-for="index in 11" :key="index" @click="selectImg(`${index+1}.png`)">
            <div class="img-wrap">
              <van-image :src="`./image/${index+1}.png`" fit="contain" />
              <div class="check" v-if=" img === `${index+1}.png` ">
                <van-checkbox v-model="a"></van-checkbox>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>




<script>
import { mapState, mapActions } from "vuex";
import { set_nickname, set_avatar } from "@/service/index";
export default {
  data() {
    return {
      showNick: false,
      nickname: "",
      nicknameLoading: false,
      showAvatar: false,

      img: "",
      a: true
    };
  },
  computed: {
    ...mapState("base", ["userinfo"]),
    avatar() {
      if (this.userinfo.avatar) {
        return `./image/${this.userinfo.avatar}`;
      } else {
        return "./image/avator.png";
      }
    }
  },
  methods: {
    ...mapActions("base", ["get_userinfo"]),
    onClickLeft() {
      this.$router.push("/mine");
    },
    setNickname() {
      this.showNick = true;
      this.nickname = this.userinfo.nickname || "";
    },
    cancel() {
      this.showNick = false;
      this.nickname = "";
    },
    async ok() {
      if (!this.nickname) {
        this.$toast("请输入昵称");
        return;
      }
      this.nicknameLoading = true;
      const res = await set_nickname({ nickname: this.nickname });
      this.nicknameLoading = false;
      if (res.status < 400) {
        this.$toast.success("修改成功");
        this.showNick = false;
        this.get_userinfo();
      }
    },
    setAvatar() {
      this.img = this.userinfo.avatar || "";
      this.showAvatar = true;
    },
    async avatarOk() {
      if (!this.img) {
        this.$toast("请选择头像");
        return;
      }
      this.nicknameLoading = true;
      const res = await set_avatar({ avatar: this.img });
      this.nicknameLoading = false;
      if (res.status < 400) {
        this.$toast.success("修改成功");
        this.showAvatar = false;
        this.get_userinfo();
      }
    },
    avatarCancel() {
      this.showAvatar = false;
    },
    selectImg(i) {
      this.img = i;
    },
    logout() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否要退出登录?"
        })
        .then(() => {
          if (this.$ws) {
            console.log('www');
            this.$ws.close();
            this.$ws = null;
          }

          localStorage.clear();
          this.$router.push("/login");
          window.location.reload();
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  mounted() {
    this.get_userinfo();
  }
};
</script>



<style lang="less" scoped>
.form {
  background: #fff;
  margin-top: 60px;

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 10px;
    .label {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(17, 17, 17, 1);
    }

    .value {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 166, 168, 1);
      margin-right: 20px;
    }
    .content {
      display: flex;
      align-items: center;
    }
  }
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: contain;
  margin-right: 20px;
}

.input {
  box-sizing: border-box;
  input {
    font-size: 14px;
    box-sizing: border-box;
    background: #f8f8f9;
    width: 100%;
    padding: 20px;
  }
}

.img-wrap {
  position: relative;
  .check {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }
}

.wrap {
  display: flex;
  justify-content: space-between;
  padding-bottom: 60px;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  .button {
    background: rgba(250, 114, 104, 1);
    margin: 0 20px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    height: 40px;
  }
}
</style>
