<template>
  <div class="game-result-row-item">
    <div class="date">{{date}}</div>

    <div class="line-wrap">
      <div class="circle">
        <div class="inner-circle"></div>
      </div>
      <div class="line"></div>
    </div>

    <div class="content">
      <p class="stage">
        <span class="label">第</span>
        {{data.stage}}
        <span class="label">期</span>
      </p>

      <p class="lottery" style="margin:14px 0;">
        <span class="Hundred">{{ result.H }}</span> +
        <span class="Ten">{{ result.T }}</span> +
        <span class="Bit">{{ result.B }}</span> =
        <span class="Te">{{ result.Sum }}</span>
        ({{ result.re }})
      </p>
    </div>
  </div>
</template>



<script>
import moment from "moment";
export default {
  props: {
    data: Object
  },
  computed: {
    date() {
      return moment(this.data.lottery_time).format("HH:mm");
    },
    result() {
      let result = {};
      const r = this.data.result || "0,0,0";
      const re = r.split(",");
      result.H = re[0];
      result.T = re[1];
      result.B = re[2];
      const sum = parseInt(result.H ) + parseInt(result.T ) + parseInt(result.B );
      let even = sum % 2 == 0 ? "双" : "单";
      if (sum > 13) {
        result.re = `${even}，大`;
      } else {
        result.re = `${even}，小`;
      }
      if(this.data.status === 1){
        result.re = "未开奖"
      }
      result.Sum = sum;
      return result;
    }
  }
};
</script>



<style lang="less" scoped>
.game-result-row-item {
  padding-left: 14px;
  display: flex;
  
  .date {
    font-size: 12px;
    font-family: HelveticaNeue;
    color: rgba(77, 210, 241, 1);
  }
  .line-wrap {
    margin: 0px 14px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 67px;
    .line {
      flex: 1;
      width: 1px;
      background: rgba(226, 233, 235, 1);
    }
  }
  .circle {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgba(242, 242, 243, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    .inner-circle {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(77, 210, 241, 1);
    }
  }

  .content {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #333;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .label {
      color: rgba(186, 193, 195, 1);
    }
  }

  .lottery {
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
</style>
