<template>
  <div class="withdraw-row-item" @click="detail">
    <div class="round" :style="{'background-color': round}">
      <i :class="icon"></i>
    </div>
    <div class="content van-hairline--bottom">
      <div class="row">
        <p class="type">{{type}}</p>

        <p class="amount">{{data.amount}}</p>
      </div>
      <div class="row">
        <p class="date">{{formatBeijingDate(data.create_at)}}</p>

        <p class="status" :class="statusClass">{{status}}</p>
      </div>
    </div>
  </div>
</template>





<script>
import { bankList } from "../../../utils/bank_list";
export default {
  props: {
    data: Object
  },
  computed: {
    round(){
      const id = this.data.bank_id;
      let color = '';
      bankList.forEach((v)=>{
        if(v.id === id){
          if(v.color){
            color = v.color.split(',')[0]
          }else{
            color = '#EB4B4B';
          }
        }
      });
      return color;
    },


    status() {
      const status = this.data.status;
      if (status === 1 || status === 2) {
        return "审核中";
      } else if (status === 3 || status === 5) {
        return "失败";
      } else {
        return "成功";
      }
    },
    statusClass(){
      const status = this.data.status;
      if (status === 1 || status === 2) {
        return "waiting";
      } else if (status === 3 || status === 5) {
        return "fail";
      } else {
        return "success";
      }
    },

    type() {
      let name = "";
      const id = this.data.bank_id;
      bankList.forEach(v => {
        if (v.id === id) {
          name = v.name;
        }
      });
      return name;
    },
    icon() {
      let name = "";
      const id = this.data.bank_id;
      bankList.forEach(v => {
        if (v.id === id) {
          name = v.logo;
        }
      });
      return name;
    }
  },
  methods:{
    detail(){
      const data = {
        ...this.data,
        bank_name: this.type,
        status_text: this.status,
      };
      this.$emit('detail' , data);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../assets/bank-icon/style.css';
.withdraw-row-item {
  padding: 10px;
  display: flex;
  box-sizing: border-box;
  padding-left: 14px;
  padding-right: 20px;
  .round {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    i {
      font-size: 14px;
      &::before{
        color: #fff;
      }
    }
  }

    .content {
    flex: 1;
    margin-left: 10px;
    padding-bottom: 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-right: 10px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    // padding-top: 4px;
  }

  .type {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(17, 17, 17, 1);
  }

  .date {
    font-size: 12px;
    font-family: HelveticaNeue;
    color: rgba(203, 212, 213, 1);
  }

  .amount {
    font-size: 14px;
  }

}
</style>
