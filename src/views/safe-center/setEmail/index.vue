<template>
    <div class="EmailSetPage">
        <van-nav-bar
            title="绑定邮箱"
            left-arrow
            @click-left="onClickLeft"
            fixed
        />
        <van-panel title="" desc="请填写你的邮箱" class="title">
        </van-panel >
        <van-cell-group class="username">
            <van-field
                v-model="form.email"
                label="邮箱"
                placeholder="请输入邮箱"
            />
            <van-field
                v-model="form.captcha"
                label="验证码"
                placeholder="输入验证码"
            >
            <van-button type="warning" slot="button" class="getcodebtn" v-show="canClick" @click="get_captcha">
                <span>{{content}}</span>
            </van-button>
            <van-button type="warning" slot="button" class="getcodebtn" disabled v-show="!canClick">
                <span>{{totalTime}}s后重新获取</span>
            </van-button>
            </van-field>
        </van-cell-group>
        <p class="tils">一个邮箱只能绑定一个账号</p>
        <div class="okbox">
            <van-button  class="okBtn" :disabled="isDisabled" @click="okAdd">完 成</van-button>
        </div>
    </div>
</template>
<script>
import { Notify,Toast } from "vant";
import {getEmailCode,set_user_email} from "@/service/index";
export default {
    components:{
        Notify,Toast
    },
    data(){
        return{
            form:{
                email:'',
                captcha:'',
                send_id:''
            },
            isDisabled:true,
            content: "获取验证码",
            canClick: true,
            totalTime: 59,
            loading: false
        }
    },
    methods:{
        onClickLeft(){
            this.$router.push('/safe-center')
        },
        async get_captcha() {
            const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!regEmail.test(this.form.email) || !this.form.email) {
                this.setMsg("请输入正确是邮箱!", "red");
                return;
            }
            if (!this.canClick) return; //改动的是这两行代码
            this.canClick = false;
            this.content = this.totalTime + "s后重新获取";
            let clock = window.setInterval(() => {
                this.totalTime--;
                this.content = this.totalTime + "s后重新获取";
                if (this.totalTime <= 0) {
                window.clearInterval(clock);
                this.content = "重新获取验证码";
                this.totalTime = 59;
                this.canClick = true; //这里重新开启
                }
            }, 1000);
            this.isDisabled = false;
            const res = await getEmailCode(2, this.form.email);
            if (res.status == 200) {
                this.setMsg("验证码已经发送到邮箱！", "#4DD2F1");
                // console.log(res)
                this.form.send_id =  res.data;
            } else if (res.status !== 200) {
                this.setMsg("验证码获取失败，请重新获取!", "red");
                return;
            }
            
        },
        async okAdd(){
            // const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            // if (!regEmail.test(this.form.email) || !this.form.email) {
            //     this.setMsg("请输入正确是邮箱!", "red");
            //     return;
            // }
            if(this.form.captcha.length == 0){
                Toast('请填写验证码！')
                return false;
            }
            this.loading = false
            const res = await set_user_email(this.form)
            this.loading = true
            // console.log(res)
            if(res.status<400){
                this.$toast('绑定成功！')
                this.$router('/safe-center')
            }else{
                this.$toast(res.statusText)
            }
        },
        setMsg(msginfo, bginfo) {
            Notify({
                message: msginfo,
                duration: 1000,
                background: bginfo
            });
        },
    }
    
}
</script>
<style lang="less">
    .EmailSetPage{
        width: 100%;
        height: 100%;
        background-color: #FAFAFA;
        padding-top: .4rem;
        box-sizing: border-box;
        .tils{
            padding-left: .15rem;
            font-size:.12rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(250,114,104,1);
            line-height:.3rem;
        }
        .van-cell__label{
            font-size: .12rem;
        }
        .van-field__body{
            line-height: .3rem;
        }
        .van-panel,.title .van-cell{
            background-color: #fafafa;
        }
        .van-cell-group,.username .van-cell{
            background-color: #fff;
        }
        .van-field__label{
            width: 60px;
            vertical-align: middle;
            line-height: .3rem;
            span{
                font-size: .14rem;
            }
        }
        .van-field__control{
            font-size: .14rem;
        }
        .okbox{
            position: absolute;
            bottom: .4rem;
            width: 100%;
            height: .48rem;
            padding: .2rem;
            box-sizing: border-box;
            .okBtn{
                width: 100%;
                height: .4rem;
                text-align: center;
                line-height: .4rem;
                color: #fff;
                background:#4DD2F1;
                border-radius: .12rem;
                border:none;
                .van-button__text{
                    font-size: .16rem;
                }
            }
        }
    }

    .getcodebtn {
        width: 1.5rem;
        height: 100%;
        line-height: 34px;
        background-color: #fff !important;
        border: none;
        border-radius: 0 10px 10px 0;
        color: #4DD2F1;
    }
</style>
