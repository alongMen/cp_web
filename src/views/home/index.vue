<template>
  <div class="lobby">
    <div class="header">
      <p class="head">Today</p>
      <p class="datetime">7月11日，星期四</p>
      <div class="serviceicon">
        <van-icon name="service-o" class="iconservice" />
      </div>
    </div>

    <!--轮播图-->
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in advertise_list" :key="index">
          <img v-lazy="$baseUrl + item.image" style="width:100%;height:160px;" @click.stop="open_link(item.link)" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!--信息列表-->
    <van-notice-bar
      :text="message"
      left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
      mode="link"
    />

    <h4 class="title">热门彩票</h4>

    <div class="hotcontent">
      <div class="hotitem" v-for="(item,index) in gamesList" :key="index" :class="index%2==0?'bgcy':'bgcp'" @click="toPath(item.id,item.name)">
        <img src="@/assets/images/hotpic.png" alt="" class="img">
        <p class="boxtitle">{{item.name}}</p>
        <p class="periods">每天 {{item.stage_count}} 期</p>
        <p class="time">{{item.stage_time_margin/60}} 分钟一期</p>
      </div>
    </div>
  </div>
</template>

<script>

import {
  get_advertise_list ,
  get_top_board_list,
  get_games
 } from "@/service/index";

export default {
  name: "home",
  data() {
    return {
      advertise_list:[],//广告列表
      gamesList:[],//游戏列表
      board_list:[],//公告
    };
  },
  computed: {
    message(){
      if(this.board_list.length === 0){
        return '暂无公告～';
      }else{
        return this.board_list[0].title;
      }
    }
  },
  methods: {
    async get_advertise_list(){
      const res = await get_advertise_list();
      if(res.status < 400 ){
        this.advertise_list = res.data;
      }
    },
    toPath(id,name){
      this.$router.push({
        path:'/games',
        query:{
          id:id,
          name:name
        }
      });
    },
    //打开广告链接
    open_link(link){
      window.open(link);
    },

    async get_board(){
      const res = await get_top_board_list();
      if(res.status < 400 ){
        this.board_list = res.data;
      }
    },
    async get_games(){
      const res = await get_games();
      if(res.status < 400){
        this.gamesList = res.data;
      }
    }
  },
  mounted() {
    this.get_advertise_list();
    this.get_board();
    this.get_games();
  },
 
};
</script>

<style scoped lang="less">
.lobby {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  padding: 0.24rem 0.2rem;
  padding-bottom: 0.55rem;
  .header {
    width: 100%;
    position: relative;
    .head {
      font-family: HelveticaNeue-Medium;
      font-size: 0.16rem;
      font-weight: 700;
      color: rgba(17, 17, 17, 1);
      line-height: 0.2rem;
    }
    .datetime {
      font-size: 0.12rem;
      line-height: 0.19rem;
      color: rgba(155, 166, 168, 1);
    }
    .serviceicon {
      position: absolute;
      top: 0;
      right: 0;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 100%;
      background-color: rgba(250, 114, 104, 1);
      text-align: center;
      line-height: 0.4rem;
      .iconservice {
        color: #fff;
        font-size: 0.2rem;
        line-height: 0.4rem;
      }
    }
  }
  // 轮播
  .banner {
    width: 100%;
    height: 1.52rem;
    margin: 0.12rem 0;
    box-sizing: border-box;
    overflow: hidden;
  }
  .van-notice-bar {
    background-color: rgba(243, 247, 248, 1);
    border-radius: 12px 0px 0px 12px;
    margin-bottom: 0.3rem;
  }
  .title {
    font-size: 0.16rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
  }
  .hotcontent {
    width: 100%;
    height: 2.08rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    display: flex;
    // overflow-x:hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .hotitem {
      padding-right: 0.3rem;
      width: 1.52rem;
      height: 2.08rem;
      margin-right: 0.3rem;
      box-sizing: border-box;
      border-left: 0.06rem solid #ff8d00;
      border-radius: 0.08rem;
      background-color: #fff;
      padding-top: 0.24rem;
      padding-left: 0.24rem;
      box-shadow: #eee 10px 10px 30px -9px;
      .img {
        display: block;
        width: 0.48rem;
        height: 0.48rem;
        border-radius: 100%;
        margin-bottom: 0.05rem;
      }
      .boxtitle {
        font-size: 0.14rem;
        line-height: 0.44rem;
        font-family: PingFangSC-Medium;
      }
      .periods,
      .time {
        font-size: 0.12rem;
        line-height: 0.22rem;
        color: rgba(155, 166, 168, 1);
      }
    }
    .bgcp {
      border-left: 0.06rem solid #c021e1 !important;
    }
    .bgcy {
      border-left: 0.06rem solid #ff8d00 !important;
    }
  }
}

.icon{
  &::before{
    color: red;
  }
}
</style>