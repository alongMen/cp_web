<template>
  <div class="layout-with-fix-header">
    <div class="fix-header">
      <van-nav-bar title="会员列表" left-arrow @click-left="onClickLeft" />
      <div class="thead">
        <span class="label name">名称</span>
        <span class="label lv">层级</span>
        <span class="label balance">余额</span>
      </div>
    </div>

    <div class="user-list">
      <van-pull-refresh v-model="isPulling" @refresh="onRefresh">
        <row-item v-for="(item, index) in data" :key="index" :data="item" @detail="detail(item)" />
        <div class="list-loading" v-if="listLoading">
          <van-loading />
          <p>加载中...</p>
        </div>
        <p class="list-load-over" v-if="total !== 0 && total === data.length">已加载全部</p>
      </van-pull-refresh>
    </div>

    <van-popup type="primary" v-model="showDetail" position="bottom">
      <van-cell-group>
        <van-cell title="用户名" :value="info.username || info.mobile || info.email" />
        <van-cell title="层级" :value="info.level + '级代理'" />
        <van-cell title="累计充值" :value="info.charge_sum.toLocaleString()" />
        <van-cell title="当前余额" :value="info.balance.toLocaleString()" />
        <van-cell title="注册时间" :value="formatBeijingDate(info.create_at)" />
        <van-cell title="最后登录时间" :value="formatBeijingDate(info.last_login_at) " />
      </van-cell-group>
    </van-popup>
  </div>
</template>










<script>
import { get_user_list } from "@/service/index";
import RowItem from "./row-item";
export default {
  components: {
    RowItem
  },
  data() {
    return {
      isPulling: false,
      data: [],
      page: 1,
      limit: 15,
      total: 0,
      loading: true,
      listLoading: false,
      showDetail: false,
      info: {
        charge_sum: 0,
        balance: 0
      }
    };
  },
  methods: {
    detail(item) {
      this.info = item;
      this.showDetail = true;
    },

    onClickLeft() {
      this.$router.push("agent-center");
    },
    onRefresh() {
      this.isPulling = true;
      this.data = [];
      this.page = 1;
      this.getData();
    },
    async getData() {
      const res = await get_user_list(this.page, this.limit);
      this.loading = false;
      this.listLoading = false;
      this.isPulling = false;
      if (res.status < 400) {
        this.data = [...this.data, ...res.data.data];
        this.total = res.data.total;
      }
    },
    getScrollData() {
      if (this.listLoading) return;
      this.page++;
      this.listLoading = true;
      this.getData();
    },
    scrollFn() {
      if (this.data.length === this.total) return;
      const h =
        document.documentElement.offsetHeight || document.body.offsetHeight;

      // const sct = el.scrollTop;
      const sct = document.documentElement.scrollTop || document.body.scrollTop;
      // const sch = el.scrollHeight;
      const sch =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (h + sct >= sch - 150) {
        this.getScrollData();
      }
    }
  },

  mounted() {
    this.getData();
    const el = window.document;
    el.addEventListener("scroll", this.scrollFn);
  },
  beforeDestroy() {
    const el = window.document;
    el.removeEventListener("scroll", this.scrollFn, false);
  }
};
</script>


<style lang="less" scoped>
.thead {
  display: flex;
  padding: 6px 10px;
  background: rgba(250, 250, 250, 1);
  .label {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(170, 170, 170, 1);
  }

  .name {
    flex: 2;
  }

  .lv {
    flex: 1;
  }

  .balance {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
}

.user-list {
  padding-top: 70px;
  min-height: 400px;
}
</style>

