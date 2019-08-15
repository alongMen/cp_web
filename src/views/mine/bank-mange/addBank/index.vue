<template>
  <div class="bankmange">
    <van-nav-bar
      title="添加银行卡"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
    <van-panel title="" desc="请绑定持卡人本人的银行卡" class="title">
    </van-panel>
    <van-cell-group>
      <van-field
        v-model="form.holder"
        label="开户人姓名"
        placeholder="请输入开户人姓名"
      />
      <Picker
        v-model="showPicker"
        :data="bankList"
        :hidenButton="true"
        @confirm="onConfirm"
      ></Picker>
      <van-field
        readonly
        clickable
        label="开户行"
        :value="form.bank_name"
        placeholder="请选择开户行"
        @click="showPicker = true"
      />
      <!-- <van-popup v-model="showPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"
            />
        </van-popup> -->
    </van-cell-group>
    <van-panel title="" desc="" class="title"> </van-panel>
    <van-cell-group>
      <van-field
        v-model="form.branch"
        label="开户支行"
        placeholder="请输入开户支行"
      />
      <van-field
        v-model="form.card_no"
        label="银行卡号"
        placeholder="请输入银行卡号"
      />
      <van-field
        v-model="form.recard_no"
        label="确认卡号"
        placeholder="请再次输入银行卡号"
      />
    </van-cell-group>
    <div class="okbox">
      <van-button class="okBtn" :disabled="isDisabled" @click="okAdd"
        >完 成</van-button
      >
    </div>
  </div>
</template>
<script>
import { bankList } from '@/utils/bank_list.js';
import { add_bank } from '@/service/index';
import { Toast } from 'vant';
import Picker from '@/components/picker';
export default {
  name: 'addBank',
  components: {
    Toast,
    Picker,
  },
  data() {
    return {
      fixIndex: 666,
      bankList,
      form: {
        holder: '',
        bank_id: '',
        bank_name: '',
        card_no: '',
        recard_no: '',
      },
      showPicker: false,
      columns: [],
      loading: true,
    };
  },
  mounted() {
    // console.log(this.bankList);
    this.bankList.map(item => {
      item.label = item.name;
      item.value = item.id;
    });
  },
  computed: {
    isDisabled() {
      if (this.form.holder && this.form.bank_name && this.form.card_no) {
        return false;
      }
    },
  },
  methods: {
    onClickLeft() {
      this.$router.push('/bank-mange');
    },
    onConfirm(item) {
      // console.log(item);
      this.form.bank_name = item.label;
      this.form.bank_id = item.value;
      this.showPicker = false;
    },
    async okAdd() {
      if (this.form.recard_no !== this.form.card_no) {
        this.$toast('两次银行账号不一致，请核对后重试!');
        return false;
      }
      // this.form.card_no = 6228481268248914;
      this.loading = false;
      const res = await add_bank(this.form);
      this.loading = true;
      if (res.status < 400) {
        Toast('添加成功！');
        setTimeout(() => {
          this.$router.push('/bank-mange');
        }, 500);
      } else {
        Toast(res.data.errorMessage);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.bankmange {
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  padding-top: 0.4rem;
  box-sizing: border-box;
  .title .van-cell {
    background-color: #efefef;
  }
  .okbox {
    width: 100%;
    height: 0.48rem;
    padding: 0.2rem;
    box-sizing: border-box;
    .okBtn {
      width: 100%;
      height: 0.4rem;
      text-align: center;
      line-height: 0.4rem;
      color: #fff;
      background: #4dd2f1;
      border-radius: 0.12rem;
      border: none;
      .van-button__text {
        font-size: 0.16rem;
      }
    }
  }
  .banklistopt {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 666;
  }
}
</style>
