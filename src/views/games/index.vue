<template>
    <div class="games-rooms">
        <van-nav-bar
            left-arrow
            @click-left="onClickLeft"
            fixed
        />
        <div class="headbox">
            <div class="title">
                <img src="@/assets/images/hotpic.png" alt="" class="headpic">
                <span class="gamename">{{name}}</span>
            </div>
            <div class="levelbtn">
                <div class="levelitem" :class="it.bgc" @click="handleLevel(inx)" v-for="(it,inx) in levelList" :key="inx">{{it.name}}</div>
            </div>
        </div>
        <div class="rooms">
            <div class="roomitem" v-for="(item,index) in roomList" :key="index" @click="handleToGame(item)">
                <!-- <img :src="'@/assets/images/rooms/pic_'+levelnick+'1.png'" class="roompic" alt=""> -->
                <img :src="`/rooms/pic_${levelnick}${index%4+1}.png`" class="roompic" alt="">
                <span class="roomNum">{{item.name}}</span>
                <span class="lineNum">在线 {{item.robot_count}} 人</span>
            </div>
        </div>
    </div>
</template>
<script>

import {
    get_rooms_detail
} from "@/service/index";
export default {
    data(){
        return{
            gameID:0,
            name:'',
            level:1,
            // levelnick:'primary',
            levelList:[
                {name:'初级',bgc:'bgc'},
                {name:'中级',bgc:'a'},
                {name:'高级',bgc:'a'},
                {name:'至尊',bgc:'a'}
            ],
            roomList:[],
        }
    },
    computed:{
        levelnick(){
            if(this.level == 1){
                return 'primary'
            }else if(this.level == 2){
                return 'middle'
            }else if(this.level == 3){
                return 'expert'
            }else{
                return 'extreme'
            }
        }
    },
    methods:{
        // 进入游戏页面
        handleToGame(item){
            // 房间号
            this.$router.push({path:`/room-detail/${item.id}`})

        },
        onClickLeft(){
            this.$router.push('/home');
        },
        handleLevel(inx){
            // console.log(inx+1);
            this.level = inx+1;
            this.getRomms();
            // console.log(this.roomList);
            this.levelList.forEach((item,index) => {
                if(inx == index){
                    item.bgc = 'bgc';
                }else{
                    item.bgc = ''
                }
            });
        },
        async getRomms(){
            const res = await get_rooms_detail(this.gameID, this.level);
            console.log(res)
            if(res.status < 400){
                this.roomList = res.data;
            }
        }

    },
    mounted(){
        if(localStorage.getItem('gameID')){
            this.gameID = localStorage.getItem('gameID');
        }
        // console.log(this.$route.query.id)
        if(this.$route.query.id){
            this.gameID = this.$route.query.id;
            localStorage.setItem('gameID',this.$route.query.id);
        }
        this.name = this.$route.query.name;
        this.getRomms();
        
    }

}
</script>
<style lang="less" scoped>
    .van-hairline--bottom::after{border:none}
    .van-nav-bar{background-color:rgba(0,0,0,0);}
    .games-rooms{
        width: 100%;
        height: 100%;
        overflow: auto;
        background: url('../../assets/images/rooms/roomsbg.png') no-repeat;
        background-position: bottom center;
        background-size: 100%;
        background-color:rgba(202, 223, 223,0.2);
        .headbox{
            padding:.2rem 0 .3rem;
            width: 100%;
            border:0 0 10px .1rem;
            background-color: #fff;
            border-radius: 0 0 .3rem .3rem;
            .title{
                width: 100%;
                text-align: center;
                .headpic{
                    display: inline-block;
                    width: .44rem;
                    height: .42rem;
                    margin-right: .1rem;
                    vertical-align: middle;
                }
                .gamename{
                    font-size:.16rem;
                    font-family:PingFangSC-Medium;
                    font-weight:500;
                    color:rgba(17,17,17,1);
                }
            }
            .levelbtn{
                width: 100%;
                display: flex;
                display: -webkit-flex;
                justify-content: space-around;
                margin: .1rem auto;
                padding: 0 .2rem;
                box-sizing: border-box;
                .levelitem{
                    width: .7rem;
                    height: .32rem;
                    line-height: .32rem;
                    text-align: center;
                    border-radius:.24rem;
                    font-size: .14rem;
                    &.bgc{
                        color: #fff;
                        background:rgba(77,210,241,1);
                        box-shadow: 0px 3px 10px 3px rgba(61, 210, 243,0.3);
                    }
                }
            }
        }
        .rooms{
            width: 100%;
            box-sizing: border-box;
            flex-wrap: wrap;
            display: flex;
            .roomitem{
                padding: .2rem .15rem .1rem;
                width: 50%;
                height: 2.2rem;
                box-sizing: border-box;
                position: relative;
                .roompic{
                    width: 100%;
                    height: 100%;
                }
                .roomNum{
                    position: absolute;
                    left: .35rem;
                    bottom: .62rem;
                    color: #fff;
                    font-size: .14rem;
                    font-weight: 500;
                }
                .lineNum{
                    position: absolute;
                    left: .35rem;
                    bottom: .45rem;
                    color: #fff;
                    font-size: .12rem;
                }
            }
        }
        
    }
</style>
