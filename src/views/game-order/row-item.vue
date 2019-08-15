<template>
  <div class="game-result-row-item" @click="detail">
    <div class="left">
      <div class='bet'>{{data.bet.toLocaleString()}}元</div>
      <div class='date'>{{date}}</div>
    </div>
    

    

    <div class="line-wrap">
      <div class="circle">
        <div class="inner-circle"></div>
      </div>
      <div class="line"></div>
    </div>

    <div class="content">
      <div class='top'>
        <p class="stage">
          <span class="label">第</span>
          {{data.stage}}
          <span class="label">期</span>
        </p>

        <p class='win' :style='`${data.win > 0 ? "color:rgba(250,114,104,1);" : "color:rgba(155,166,168,1);"}`'>
          {{ `${data.status===1 ? '已投注' : data.win > 0 ? `中奖+${data.win.toLocaleString()}` : '未中奖'}`  }}
        </p>
      </div>
      

      <p class="lottery" style="margin:14px 0;">
        <template v-if='this.data.status > 1'>
           <span class="Hundred" >{{ result.H }}</span> +
          <span class="Ten" >{{ result.T }}</span> +
          <span class="Bit" >{{ result.B }}</span> =
          <span class="Te" >{{ result.Sum }}</span>
        </template>
        ({{ result.re }})
      </p>
    </div>
  </div>
</template>



<script>
import { pcdd_odds_secondary_enum } from "@/config/enum";
import moment from "moment";
export default {
  props: {
    data: Object
  },
  data(){
    return {
      pcdd_odds_secondary_enum,
    }
  },
  computed: {
    date() {
      return moment(this.data.create_at).format("HH:mm");
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
        result.re = "未结算"
      }
      result.Sum = sum;
      return result;
    }
  },
  methods: {
    detail(){
      if(this.data.primary === 1){
        this.data.primary_name = '大小单双'
      }else if(this.data.primary === 2){
        this.data.primary_name = '特码'
      }else if(this.data.primary === 3){
        this.data.primary_name = '娱乐'
      }
      this.pcdd_odds_secondary_enum.forEach(v => {
        if (v.value === this.data.secondary) {
          this.data.secondary_name = v.label;
        }
      });
      if(this.data.status === 1){
        this.data.status_name = '已投注'
      }else if(this.data.status === 2){
        this.data.status_name = '中奖'
      }else if(this.data.status === 3){
        this.data.status_name = '未中奖'
      }
      const data = {
        result_count:this.result,
        ...this.data,
      };
      this.$emit('detail' , data);
    }
  },
};
</script>



<style lang="less" scoped>
.game-result-row-item {
  padding-left: 14px;
  display: flex;
  
  .left {
    width:58px;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:left;
    .date{
      margin-top:12px;
      font-size: 12px;
      font-family: HelveticaNeue;
      color: rgba(77, 210, 241, 1);
    }
    .bet{
      font-size:12px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(250,114,104,1);
      line-height:17px;
    }
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
    width:100%;
    color: #333;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .top{
      width:100%;
      display:flex;
      justify-content:space-between;
      align-items:center;
      .label {
        color: rgba(186, 193, 195, 1);
      }
      .win{
        margin-right:20px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(155,166,168,1);
        line-height:17px;
      }
    }
    
  }

  .lottery {
    padding-left: 0.02rem;
    padding-top: 0.025rem;
    width: 100%;
    text-align: left;
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
