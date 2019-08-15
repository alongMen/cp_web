<template>
  <div class="agent-center">
    <agent-self />

    <div class="agent-info-wrap">
      <div class="top">
        <div class="charge border">
          <p class="amount">{{data.charge.toLocaleString()}}</p>
          <p class="label">下级累积充值</p>
        </div>

        <div class="charge">
          <p class="amount">{{data.consume.toLocaleString()}}</p>
          <p class="label">下级累积消费</p>
        </div>
      </div>
      <div class="bottom">
        <div class="charge">
          <div class="member-add" @click="member">
              查看详情 >>
          </div>
        </div>

        <div class="charge">
          <p class="amount">{{data.member}}</p>
          <p class="label">下级会员人数</p>
        </div>
      </div>
    </div>

    <div class="qrcode-area">
      <img :src="img" />

      <p class="invite">
        <span class="qr-label">邀请码:</span>
        <span class="invite-code">{{userinfo.invite_code}}</span>
      </p>

      <p class="invite-link">
        <span class="qr-label">邀请链接:</span>
        <span class="link">{{link}}</span>
      </p>
    </div>
  </div>
</template>






<script>
import AgentSelf from "./components/agent-self";
import { get_agent_info } from "@/service/index";
import { mapState, mapActions } from "vuex";
import QRCode from "qrcode";
export default {
  components: {
    AgentSelf
  },
  data() {
    return {
      data: {
        member: 0,
        charge: 0,
        consume: 0
      },
      img: "",
      link: ""
    };
  },
  computed: {
    ...mapState("base", ["userinfo"])
  },
  methods: {
    ...mapActions("base", ["get_userinfo"]),
    async get_agent_info() {
      const res = await get_agent_info();
      if (res.status < 400) {
        this.data = res.data;
      }
    },
    member(){
      this.$router.push('/user-list');
    }
  },
  async mounted() {
    await this.get_agent_info();
    await this.get_userinfo();
    const self = this;
    this.link = window.location.origin + "/invite/" + this.userinfo.invite_code;
    QRCode.toDataURL(this.link, { width: 220, height: 220 }, function(
      err,
      url
    ) {
      self.img = url;
    });
  }
};
</script>




<style lang="less" scoped>
.agent-center {
  width: 100%;
  .agent-info-wrap {
    padding-top: 50px;
    width: 100%;
    height: 170px;
    background: rgba(233, 95, 111, 1);
    border-radius: 0px 0px 30px 30px;
    transform: translateY(-50px);
    display: flex;
    flex-direction: column;
    .top {
      border-bottom: 1px rgba(202, 67, 83, 1) solid;
      height: 80px;
      display: flex;

      .border {
        border-right: 1px rgba(202, 67, 83, 1) solid;
      }
    }

    .bottom {
      display: flex;
      flex: 1;
    }
    .charge {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .amount {
        font-size: 18px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
      .label {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(221, 221, 221, 1);
        margin-top: 14px;
      }
    }
  }

  .qrcode-area {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(-30px);

    .qr-label {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 166, 168, 1);
      padding-right: 8px;
    }
    .invite-link{
      margin-top: 10px;
    }
    .invite-code {
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
  }

  .member-add{
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
  }
}
</style>


