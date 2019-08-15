<template>
  <div class="row-title">
    <div @click="openDatePicker" >
      {{date}}
      <van-icon name="arrow-down" />
    </div>

    <div  @click="openPicker">
      {{statusText}}<van-icon name="arrow-down" />
    </div>
  </div>
</template>



<script>
export default {
  props:{
    date: String,
    statusText: String
  },
  methods:{
    openPicker(){
      this.$emit('openPicker');
    },
    openDatePicker(){
      this.$emit('openDatePicker');
    }
  }
}
</script>


<style lang="less" scoped>
.row-title{
  width: 100%;
  height: 40px;
  background:rgba(245,253,255,1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 .125rem;
  color: #9BA6A8;
  box-sizing: border-box;
  div{
    font-size: .125rem;
    font-weight:400;
    display: flex;
    align-items: center;
    height: 100%;
  }
}
</style>
