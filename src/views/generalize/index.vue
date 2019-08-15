<template>
  <div class="promote canvas" ref="canvas">
    <div class="banner"></div>

    <img :src="img" alt />

    <p>
      <span class="label">邀请码:</span>
      <span class="code">{{userinfo.invite_code}}</span>
    </p>

    <p class="invite-link">
      <span class="label">邀请链接:</span>
      <span class="link" id="link">{{link}}</span>
    </p>

    <div class="button-row">
      <div class="button" @click="savecanvas">保存图片</div>
      <div class="button btn" data-clipboard-target="#link">复制链接</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import ClipboardJS from "clipboard";
export default {
  name: "generalize",
  data() {
    return {
      img: "",
      link: ""
    };
  },
  computed: {
    ...mapState("base", ["userinfo"])
  },
  methods: {
    ...mapActions("base", ["get_userinfo"]),
    savecanvas() {
      let canvas = document.querySelector(".canvas");
      let that = this;
      html2canvas(canvas, { scale: 2, logging: false, useCORS: true }).then(
        function(canvas) {
          let type = "png";
          let imgData = canvas.toDataURL(type);
          // 照片格式处理
          let _fixType = function(type) {
            type = type.toLowerCase().replace(/jpg/i, "jpeg");
            let r = type.match(/png|jpeg|bmp|gif/)[0];
            return "image/" + r;
          };
          imgData = imgData.replace(_fixType(type), "image/octet-stream");
          let filename = "UUSound" + "." + type;
          that.saveFile(imgData, filename);
        }
      );
    },
    saveFile(data, filename) {
      let save_link = document.createElementNS(
        "http://www.w3.org/1999/xhtml",
        "a"
      );
      save_link.href = data;
      save_link.download = filename;

      let event = document.createEvent("MouseEvents");
      event.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      save_link.dispatchEvent(event);
    }
  },
  async mounted() {
    await this.get_userinfo();
    const self = this;
    this.link = window.location.origin + "/invite/" + this.userinfo.invite_code;
    QRCode.toDataURL(this.link, { width: 260, height: 260 }, function(
      err,
      url
    ) {
      self.img = url;
    });

    var clipboard = new ClipboardJS(".btn");
    clipboard.on("success", function(e) {
      // console.info('Action:', e.action);
      console.info("Text:", e.text);
      // console.info('Trigger:', e.trigger);
      e.clearSelection();
      self.$toast("复制成功！");
    });
  }
};
</script>

<style lang="less" scoped>
.promote {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  padding-bottom: .5rem;
  .banner {
    width: 100%;
    height: 200px;
    background-image: url("../../assets/images/prmote-banner.png");
    background-size: contain;
    border-radius: 0px 0px 0px 30px;
    background-repeat: no-repeat;
  }

  .label {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(155, 166, 168, 1);
    padding-right: 8px;
  }
  .invite-link {
    margin-top: 10px;
  }
  .code {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(250, 114, 104, 1);
  }

  .link {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(77, 210, 241, 1);
  }

  .button-row {
    margin-top: 10px;
    width: 100%;
    display: flex;
    .button {
      flex: 1;
      box-sizing: border-box;
      margin: 20px;
      height: 48px;
      background: rgba(250, 114, 104, 1);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(17, 17, 17, 1);
    }
  }
}
</style>
