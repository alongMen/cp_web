<template>
  <div class="room-detail">
    <van-nav-bar left-arrow @click-left="onClickLeft" fixed :z-index="333" />
    <div class="headbox" @click="handleTenDate">
      <div class="title">
        <img src="@/assets/images/hotpic.png" alt class="headpic" />
        <span class="gamename">{{ room_info.name }}</span>
      </div>
      <div class="Lotteryinfo">
        <div class="qishu">
          <p class="number">
            距
            <span class="count">{{ current.stage }}</span>
            期{{ stateSpan }}
          </p>
          <p class="CountDown">
            <van-count-down :time="countTime" format="mm 分 ss 秒" @finish="handleCountDown" />
          </p>
        </div>
        <div class="balance">
          <p class="btitle">余额</p>
          <p class="bnum">{{ userinfo.balance }}</p>
        </div>
      </div>

      <!-- <div class="lotterybox">
        <p class="number">
          第
          <span class="count">{{ result.stage }}</span> 期
        </p>
        <p class="lottery">
          <span class="Hundred">{{ result.H }}</span> +
          <span class="Ten">{{ result.T }}</span> +
          <span class="Bit">{{ result.B }}</span> =
          <span class="Te">{{ result.Sum }}</span>
          ({{ result.re }})
        </p>
      </div>-->

      <div class="lotterybox" v-for="(item,index) in TenStages" :key="index" v-if="showMore(index)">
        <p class="number">
          第
          <span class="count">{{ item.stage }}</span> 期
        </p>
        <p class="lottery">
          <span class="Hundred">{{ item.H }}</span> +
          <span class="Ten">{{ item.T }}</span> +
          <span class="Bit">{{ item.B }}</span> =
          <span class="Te">{{ item.Sum }}</span>
          ({{ item.re }})
        </p>
      </div>
    </div>
    <!-- 房间详情 -->
    <chat-list :data="message_list" />

    <!-- 下注按钮 -->
    <div class="iptbox" @click="handleBets">
      <div class="iptinfo">
        <span class="cp_icon_recharge money"></span>
        <input type="text" class="ipt" readonly />
        <div class="sendbtn">
          <span class="cp_icon_send send"></span>
        </div>
      </div>
    </div>

    <!-- 下注盒子 -->
    <Bets :data="odds" v-model="showKeyBoard" @bet="bet" :info="room_info"></Bets>
  </div>
</template>

<script>
import Bets from "./components/bets/index";
import io from "socket.io-client";
import {
  get_room_detail,
  get_game_odds,
  pcdd_bet,
  get_current_stage,
  get_ten_stages
} from "@/service/index";
import ChatList from "./chat-list";
import moment from "moment";
import { mapState, mapMutations, mapActions } from "vuex";
import { pcdd_odds_secondary_enum } from "@/config/enum";

import { cloneDeep } from "lodash";

export default {
  components: {
    Bets,
    ChatList
  },
  data() {
    return {
      pcdd_odds_secondary_enum,
      ws: null,
      isTen: false,
      message_list: [], //消息列表 type 1 客服  type 2 其他用户 type 3 自己
      result_list: [],

      result: {
        stage: "0",
        H: "0",
        T: "0",
        B: "0",
        Sum: "0",
        time: 0
      },
      currentDate: "",
      startDate: "",
      stopDate: "",
      lotteryDate: "",
      stateSpan: "",
      stage_id: 0,
      current: {}, //当前倒计时各种时间
      room_info: {}, //房间详情
      id: null,
      odds: [],
      time: 999,
      showKeyBoard: false,
      TenStages: []
    };
  },
  computed: {
    ...mapState("base", ["userinfo"]),

    countTime() {
      if (this.time > 0) {
        return this.time;
      } else {
        return 0;
      }
    }
  },
  methods: {
    ...mapActions("base", ["get_userinfo"]),
    ...mapMutations("base", ["set_userinfo"]),

    showMore(index){
      if(index === 0){
        return true
      }
      if(index !== 0 && this.isTen === true){
        return true
      }else{
        return false;
      }
    },



    handleBets() {
      if (this.userinfo.balance == 0) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "余额不足 ， 是否前去充值？"
          })
          .then(() => {
            this.$router.push("/recharge");
          })
          .catch(() => {
            // on cancel
          });
        return false;
      }
      this.showKeyBoard = true;
    },
    onClickLeft() {
      this.$router.push("/games");
    },
    getStages(results) {
      results.result = results.result || "0,0,0";
      const re = results.result.split(",");
      results.H = re[0];
      results.T = re[1];
      results.B = re[2];
      results.Sum = parseInt(re[0]) + parseInt(re[1]) + parseInt(re[2]);
      let sum = results.Sum;
      let even = sum % 2 == 0 ? "双" : "单";
      if (sum > 13) {
        results.re = `${even}，大`;
      } else {
        results.re = `${even}，小`;
      }
    },
    async handleTenDate() {
      this.isTen = !this.isTen;
      // if (this.isTen == false) {
      //   // 显示十期
      //   this.isTen = true;
      //   const res = await get_ten_stages(this.room_info.game_id);
      //   if (res.status < 400) {
      //     this.TenStages = res.data.splice(1, res.data.length);
      //     // console.log(this.TenStages)
      //     this.TenStages.forEach((item, index) => {
      //       this.getStages(item);
      //     });
      //   }
      // } else {
      //   this.isTen = false;
      //   this.TenStages = [];
      // }
    },
    get_curret_date() {
      const d = new Date();
      const date = `${d.getHours()}:${d.getMinutes()}:${
        d.getSeconds() >= 10 ? d.getSeconds() : "0" + d.getSeconds().toString()
      }`;
      return date;
    },
    async init_info() {
      const res = await get_room_detail(this.id);
      if (res.status < 400) {
        this.room_info = res.data;
        this.message_list.push({
          type: 1,
          data: `欢迎进入房间，祝您游戏愉快! 本房间单注 ${this.room_info.bet_min} 元起 ， ${this.room_info.bet_max} 元封顶 。`,
          date: this.get_curret_date()
        });
        const res1 = await get_game_odds(this.room_info.game_id);

        if (res1.status < 400) {
          this.odds = res1.data;
        }
        const res2 = await get_current_stage(this.room_info.game_id);
        if (res2.status < 400) {
          this.current = res2.data;
          const res3 = await get_ten_stages(this.room_info.game_id);
          if (res3.status < 400) {
            this.setData(res3.data[0]);
            this.TenStages = res3.data;
            // console.log(this.TenStages)
            this.TenStages.forEach((item, index) => {
              this.getStages(item);
            });
          }
        }
      }
    },
    // 数据处理倒计时
    handleCountDown() {
      console.log("出发倒计时");
      // this.currentDate = moment().valueOf();
      this.currentDate = new Date().getTime() + 50;

      // this.startDate = moment(this.current.start_bet_time).valueOf();

      this.startDate = new Date(this.current.start_bet_time).getTime();
      // this.stopDate = moment(this.current.stop_bet_time).valueOf();

      this.stopDate = new Date(this.current.stop_bet_time).getTime();
      // this.lotteryDate = moment(this.current.lottery_time).valueOf();
      this.lotteryDate = new Date(this.current.lottery_time).getTime();

      this.current.stage = this.current.stage;
      this.stage_id = this.current.id;

      console.log("当前时间 , ", this.currentDate);

      console.log(this.stopDate, "封盘时间");

      console.log(this.stopDate - this.currentDate);

      if (this.currentDate <= this.startDate) {
        this.time = this.startDate - this.currentDate;
        this.stateSpan = "开盘";
        console.log("开盘");
      } else if (
        this.currentDate > this.startDate &&
        this.currentDate < this.stopDate
      ) {
        console.log("封盘");
        this.time = this.stopDate - this.currentDate;
        this.stateSpan = "封盘";
      } else if (this.currentDate > this.stopDate) {
        this.time = this.lotteryDate - this.currentDate;
        console.log("开奖");
        this.stateSpan = "开奖";
      } else {
        console.log("等待开");
        this.stateSpan = "等待开奖";
      }

      console.log(this.time);
    },
    setData(last_stage) {
      //
      const r = last_stage.result || "0,0,0";
      const re = r.split(",");
      this.result.H = re[0];
      this.result.T = re[1];
      this.result.B = re[2];
      this.result.stage = last_stage.stage;
      this.result.Sum = parseInt(re[0]) + parseInt(re[1]) + parseInt(re[2]);
      let sum = this.result.Sum;
      let even = sum % 2 == 0 ? "双" : "单";
      if (sum > 13) {
        this.result.re = `${even}，大`;
      } else {
        this.result.re = `${even}，小`;
      }
      if (!last_stage.result) {
        this.result.re = "未开奖";
      }

      ///

      this.handleCountDown();
    },
    //
    push_self_message(content, amount, stage) {
      this.message_list.push({
        type: 3,
        data: `投注内容: ${content}`,
        stage: `第${stage}期`,
        amount,
        date: this.get_curret_date()
      });
    },
    //
    push_user_message(username, avatar, amount, content, stage) {
      this.message_list.push({
        type: 2,
        data: `投注内容: ${content}`,
        stage: `第${stage}期`,
        avatar: avatar,
        amount,
        username,
        date: this.get_curret_date()
      });
    },

    scrollToBottom() {
      // const el = window.document;
      // el.scrollTop = el.scrollHeight;
      this.$nextTick(() => {
        const el = document.getElementById("gundong");

        window.scrollTo(0, el.scrollHeight);
      });
    },

    //下注
    async bet(data) {
      console.log();
      const params = {
        stage_id: this.stage_id,
        room_id: this.id,
        primary: data.primary,
        secondary: data.secondary,
        amount: data.amount
      };

      this.showKeyBoard = false;
      const res = await pcdd_bet(params);
      if (res.status < 400) {
        this.push_self_message(data.name, data.amount, this.current.stage);
        this.userinfo.balance = this.userinfo.balance - data.amount;
        this.set_userinfo(this.userinfo);
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    }
    // async getStage() {
    //   const res = await get_current_stage(this.room_info.game_id);
    //   if (res.status == 200) {
    //     this.current = res.data;
    //     this.stage_id = this.current.id;
    //   }
    // }
  },

  mounted() {
    this.init_info();
    this.ws.on("connect", () => {
      console.log("进入房间!");
      console.log("房间连接成功");
      this.ws.on("game-result", data => {
        //下一期开奖时间封盘时间，以及开奖结果

        if (data) {
          console.log("获取开奖结果");
          console.log(data);

          const last_stage = cloneDeep(this.current);
          last_stage.result = cloneDeep(data.result);
          this.current = data.next_stage;

         

          this.TenStages.pop();
          this.getStages(last_stage);
          this.TenStages.unshift(last_stage);

           this.setData(last_stage);
          // if (this.isTen) {
          //   // this.TenStages.pop();
          //   // this.TenStages.unfit();
          //   this.isTen = false;
          //   this.handleTenDate();
          // }
        }
      });

      this.ws.on("user-bet", data => {
        console.log(data);
        //用户投注 ， 推送消息
        let content;
        for (
          let index = 0;
          index < this.pcdd_odds_secondary_enum.length;
          index++
        ) {
          const element = this.pcdd_odds_secondary_enum[index];
          if (element.value === data.secondary) {
            content = element.label;
          }
        }
        const some = this.message_list.some((v)=> v.id === data.id);
        if(some){
          return;
        }
        this.push_user_message(
          data.username,
          data.avatar,
          data.amount,
          content,
          data.stage
        );
        setTimeout(() => {
          this.scrollToBottom();
        }, 0);
      });
    });
  },

  created() {
    this.get_userinfo();
    const room_id = parseInt(this.$route.params.id);
    this.id = room_id;
    const ws = process.env.VUE_APP_WS_GAME_URL;
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    this.ws = io(ws, {
      query: {
        token: "Bearer " + token,
        room_id
      }
    });
  },
  beforeDestroy() {
    this.ws.close();
    this.ws = null;
  }
};
</script>



<style lang="less" scoped>
.van-hairline--bottom::after {
  border: none;
}
.van-nav-bar {
  background-color: rgba(0, 0, 0, 0);
}
.room-detail {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  .headbox {
    position: fixed;
    z-index: 22;
    left: 0;
    top: 0;
    padding: 0.2rem 0 0.1rem;
    width: 100%;
    border: 0 0 10px 0.1rem;
    background-color: #fff;
    border-radius: 0 0 0.3rem 0.3rem;
    box-shadow: -2px 6px 23px -4px #d8d8d8;
    .title {
      width: 100%;
      text-align: center;
      .headpic {
        display: inline-block;
        width: 0.3rem;
        height: 0.3rem;
        margin-right: 0.1rem;
        vertical-align: middle;
      }
      .gamename {
        font-size: 0.12rem;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(17, 17, 17, 1);
      }
    }
    .Lotteryinfo {
      margin-top: 0.1rem;
      display: flex;
      display: -webkit-flex;
      // height: .8rem;
      .qishu {
        width: 50%;
        text-align: center;
        .number {
          color: #bac1c3;
          font-size: 0.12rem;
          line-height: 0.17rem;
          .count {
            color: #111111;
            font-size: 0.12rem;
            line-height: 0.14rem;
          }
        }
        .van-count-down {
          color: #fa7268;
          font-weight: 500;
          line-height: 0.2rem;
          font-size: 0.14rem;
        }
      }
      .balance {
        flex: 1;
        text-align: center;
        .btitle {
          font-size: 0.12rem;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(186, 193, 195, 1);
          line-height: 0.17rem;
        }
        .bnum {
          font-size: 0.14rem;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(77, 210, 241, 1);
          line-height: 0.2rem;
        }
      }
    }
    .lotterybox {
      width: 100%;
      padding: 0.05rem 0.2rem 0;
      box-sizing: border-box;
      display: flex;
      p {
        display: inline-block;
        &.number {
          width: 1.8rem;
          // text-align: center;
          color: #bac1c3;
          font-size: 0.12rem;
          line-height: 0.28rem;
          vertical-align: middle;
          .count {
            color: #111111;
            font-size: 0.1rem;
            line-height: 0.1rem;
          }
        }
        &.lottery {
          padding-left: 0.02rem;
          padding-top: 0.05rem;
          width: 100%;
          text-align: center;
          .Hundred,
          .Ten,
          .Bit,
          .Te {
            display: inline-block;
            width: 0.18rem;
            height: 0.18rem;
            line-height: 0.18rem;
            text-align: center;
            background-color: #efefef;
            border-radius: 100%;
            box-shadow: -2px 6px 23px -4px #d8d8d8 inset;
            vertical-align: middle;
          }
          .Te {
            background-color: #fff;
            box-shadow: -2px 6px 23px 3px rgb(61, 210, 243) inset;
            color: #fff;
          }
        }
      }
    }
  }

  .iptbox {
    position: fixed;
    z-index: 11;
    bottom: 0.1rem;
    left: 0;
    width: 100%;
    height: 0.6rem;
    box-sizing: border-box;
    padding: 0.1rem 0.2rem;
    .iptinfo {
      border-radius: 24px;
      width: 100%;
      height: 100%;
      // border:1px solid red;
      overflow: hidden;
      box-shadow: -2px 6px 23px -4px #d8d8d8;
      position: relative;
      .ipt {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border: 1px solid #ccc;
        padding-left: 0.55rem;
        border: none;
        outline: none;
      }
      .money {
        &::before {
          font-size: 0.24rem;
          color: #4bd2f1;
        }
        position: absolute;
        left: 0.2rem;
        top: 0.1rem;
      }
      .sendbtn {
        position: absolute;
        width: 0.38rem;
        height: 0.38rem;
        line-height: 0.4rem;
        text-align: center;
        border-radius: 100%;
        background-color: #fa7268;
        right: 0.1rem;
        top: 0.01rem;
        z-index: 11;
        .send {
          line-height: 0.44rem;
          text-align: center;
          font-size: 0.22rem;
          color: #fff;
        }
      }
    }
  }
}
</style>
