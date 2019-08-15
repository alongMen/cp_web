<template>
  <van-popup v-model="show" position="bottom" :close-on-click-overlay="false" :duration="0.1">
    <div class="date-wrap">
      <div class="date-title">
        <span class="cancel" @click="show = false">取消</span>
        <span class="title"></span>
        <span class="confirm" @click="confirm">确定</span>
      </div>
      <div class="date-body" >
        <div class="date-input">
          <div
            class="input"
            :class="{'active': dateType === 0}"
            @click="setDateType(0)"
          >{{handleDate(date[0])}}</div>
          <span>至</span>
          <div
            class="input"
            :class="{'active': dateType === 1}"
            @click="setDateType(1)"
          >{{handleDate(date[1])}}</div>
        </div>
        <div class="date-main">
          <van-datetime-picker v-model="date[0]" type="date" :show-toolbar="false" v-if="dateType === 0" :min-date="minDate"/>
          <van-datetime-picker v-model="date[1]" type="date" :show-toolbar="false" v-if="dateType === 1" :min-date="minDate"/>
        </div>
      </div>
    </div>
  </van-popup>
</template>





<script>
import {isDate} from 'lodash';
import moment from "moment";
export default {
  props: {
    value: Boolean,
  },
  data(){
    return{
      dateType:0,
      currentDate: '',
      date:[],
    }
  },
  computed: {
    minDate(){
      var dt = new Date();
      dt.setMonth( dt.getMonth()- 6 );
      return dt
    },
    show: {
      get() {
        return this.value;
      },
      set(show) {
        this.$emit("input", show);
      }
    }
  },
  methods: {
    close() {
      this.show = false;
    },
    handleDate(date){
      if(isDate(date)){
        return moment(date).format('YYYY-MM-DD') || '';
      }else{
        return '';
      }
    },
    setDateType(i){
      this.dateType = i;
    },
    // selectDate(){
    //   this.date[this.dateType] = this.currentDate;
    // },
    confirm(){
      this.show = false;
      this.$emit('confirm' , this.date);
    }
  }
};
</script>


<style lang="less" scoped>
.date-wrap {
  background: #fff;
  .date-title {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 22px;
    padding-right: 22px;
    .title {
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #333333;
    }
    .cancel {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666666;
    }
    .confirm {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #2d7df6;
    }
  }
  .date-body {
    .date-input {
      display: flex;
      padding-left: 22px;
      padding-right: 22px;
      padding-top: 10px;
      padding-bottom: 10px;
      .input {
        flex: 1;
        border-bottom: 1px solid #666;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #2d7df6;
        text-align: center;
      }
      .active {
        border-color: #2d7df6;
        color: #2d7df6;
      }
      span {
        padding: 0 30px;
      }
    }
  }
}
</style>
