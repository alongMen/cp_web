<template>
    <div class="PasswordSetPage">
        <van-nav-bar
            title="登录密码"
            left-arrow
            @click-left="onClickLeft"
            fixed
        />
        <van-panel title="" desc="请填写登录密码" class="title">
        </van-panel >
        <van-cell-group class="username">
            <van-field
                v-model="form.old_password"
                label="原始密码"
                placeholder="请输入原始密码"
                type="password"
            />

            <van-field
                v-model="form.new_password"
                label="新密码"
                placeholder="请输入密码"
                type="password"
            />

            <van-field
                v-model="form.new_repassword"
                label="确认密码"
                placeholder="确认密码"
                type="password"
            />
        </van-cell-group>
        <p class="tils">请记住你的登录密码</p>
        <div class="okbox">
            <van-button  class="okBtn" :disabled="isDisabled" @click="okAdd">完 成</van-button>
        </div>
    </div>
</template>
<script>
import { Notify } from "vant";
import {set_user_login_Pass} from "@/service/index";
import { Toast} from 'vant'
export default {
    name:'setPayPassword',
    components:{
        Toast
    },
    data(){
        return{
            form:{
                old_password:'',
                new_password:'',
                new_repassword:'',
            },
        }
    },
    computed:{
        isDisabled(){
            if(!this.form.new_repassword){
                return true
            }else{
                return false
            }
        }
    },
    methods:{
        onClickLeft(){
            this.$router.push('/safe-center')
        },
        async okAdd(){
            if(!this.form.old_password){
                Toast.fail('请输入旧密码！')
                return false;
            }
            if(!this.form.new_password){
                Toast.fail('请输入密码！')
                return false;
            }
            if(this.form.new_password != this.form.new_repassword){
                Toast.fail('两次输入密码不一致，请重新确认！')
                this.form.new_repassword = '';
                return false;
            }
            this.loading = false;
            const toast = Toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                loadingType: "spinner",
                message: "提交中..."
            });
            const res = await set_user_login_Pass(this.form)
            if(res.status<400){
                Toast.success('变更完成！')
                toast.clear()
                this.$router.push('/safe-center')
            }
        }
    }
    
}
</script>
<style lang="less">
    .PasswordSetPage{
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
        .van-panel,.title .van-cell{
            background-color: #fafafa;
        }
        .van-cell-group,.username .van-cell{
            background-color: #fff;
        }

        .van-field__label{
            width: 80px;
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
</style>
