<template>
  <van-popup v-model="show" position="bottom" :close-on-click-overlay="false" :duration="0.1">
    <div class="picker" v-if="show">
      <div class="operation van-hairline--bottom" v-if="!hideButton">
        <div class="cancel" @click="cancel">取消</div>

        <div class="confirm" @click="confirm">确认</div>
      </div>

      <div class="picker-component-list">
        <div 
          class="list-item" 
          v-for="(item, index) in data" 
          :key="index"
          @click="selectItem(item)"
          :class="{'van-hairline--bottom': index !== data.length -1 , 'active': seleted.value === item.value}"
          >
          {{item.label}}
        </div>
      </div>
    </div>
  </van-popup>
</template>



<script>
// @confirm 回调 {label , value}
export default {
  props: {
    value: Boolean,
    data: Array,
    hideButton: Boolean,
  },
  data(){
    return{
      seleted: {},
    }
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(show) {
        this.$emit("input", show);
      }
    }
  },
  methods:{
    selectItem(item){
      this.seleted = item;
      if(this.hideButton){
        this.$emit('confirm' , this.seleted);
        this.show = false;
      }
    },
    cancel(){
      this.show = false;
    },
    confirm(){
      this.$emit('confirm' , this.seleted);
    }
  }
};
</script>





<style lang="less" scoped>
.picker {
  width: 100%;
  min-height: 240px;
  max-height: 400px;
  background: #fff;
  display: flex;
  flex-direction: column;
  .operation {
    justify-content: space-between;
    width: 100%;
    display: flex;
    align-items: center;
    display: flex;
    padding: 14px;
    box-sizing: border-box;
    .cancel {
      color: #f44;
      font-size: .125rem;
    }

    .confirm {
      color: #1989fa;
      font-size: .125rem;
    }
  }

  .picker-component-list{
    flex:1;
    overflow: auto;
    overflow-y: visible;

&::-webkit-scrollbar {
  width: 0;
}
    .list-item{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
      font-size: .125rem;
    }
  }

  .active{
    color: #fff;
    background:  #4DD2F1;
  }
}
</style>
