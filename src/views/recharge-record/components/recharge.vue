<template>
  <div class="recharge-record">
    <van-pull-refresh v-model="isPulling" @refresh="onRefresh">
      <div class="list">
        <div v-for="(item, index) in renderData">
          <div :key="index">
            <row-title
              class="sticky"
              :key="item.key"
              :date="item.key"
              @openPicker="showPicker = true"
              :statusText="statusText"
              @openDatePicker="showDatePicker = true"
            />
            <div style="position:relative">
              <recharge-row-item v-for="(d, i) in item.list" :key="i" :data="d" @detail="detail" />
            </div>
          </div>
        </div>
        <div class="list-loading" v-if="listLoading">
          <van-loading />
          <p>加载中...</p>
        </div>
        <p class="list-load-over" v-if="total !== 0 && total === data.length">已加载全部</p>
      </div>
    </van-pull-refresh>

    <picker v-model="showPicker" :data="status_options" :hideButton="true" @confirm="selectStatus" />
    <date-picker v-model="showDatePicker" @confirm="selectDate" />

    <van-popup type="primary" v-model="showDetail" position="bottom">
      <van-cell-group>
        <van-cell title="订单号" :value="info.order_no" />
        <van-cell title="金额" :value="info.amount" />
        <van-cell title="转账类型" :value="type" />
        <van-cell title="状态" :value="statusInfo" />
        <van-cell title="创建时间" :value="formatBeijingDate(info.create_at)" />
        <van-cell title="完成时间" :value=" (info.status === 2 || info.status === 3) ? formatBeijingDate(info.update_at) : ''" />
      </van-cell-group>
    </van-popup>
  </div>
</template>




<script>
import { get_recharge_record } from "@/service/index";
import moment from "moment";
import RowTitle from "./row-title";
import Picker from "@/components/picker/index";
import DatePicker from "@/components/date-picker/index";
import { sortBy } from "lodash";

import RechargeRowItem from "./recharge-row-item";

export default {
  components: {
    RowTitle,
    Picker,
    DatePicker,
    RechargeRowItem
  },
  data() {
    return {
      data: [],
      loading: true,
      page: 1,
      limit: 15,
      total: 0,
      isPulling: false,
      listLoading: false,
      showPicker: false,
      showDatePicker: false,
      query: {
        status: 0,
        date: [null, null]
      },

      status_options: [
        {
          label: "全部",
          value: 0
        },
        {
          label: "待审核",
          value: 1
        },
        {
          label: "已审核",
          value: 2
        },
        {
          label: "已拒绝",
          value: 3
        }
      ],

      info: {},
      showDetail: false
    };
  },
  computed: {
    renderData() {
      const data = this.data;
      let obj = {};
      let arr = [];
      data.forEach(value => {
        const m = moment(value.create_at).month() + 1;
        const y = moment(value.create_at).year();

        const key = `${y}年${m}月`;

        if (arr.indexOf(key) < 0) {
          arr.push(key);
        }
      });
      arr.forEach(k => {
        obj[k] = [];
      });
      Object.keys(obj).forEach(k => {
        data.forEach(value => {
          const m = moment(value.create_at).month() + 1;
          const y = moment(value.create_at).year();

          const key = `${y}年${m}月`;
          if (key == k) {
            obj[k].push(value);
          }
        });
      });
      let list = [];
      Object.keys(obj).forEach(k => {
        list.push({
          key: k,
          list: obj[k]
        });
      });

      return sortBy(list, function(o) {
        return o.key;
      }).reverse();
    },
    statusText() {
      let name = "";
      this.status_options.forEach(v => {
        if (v.value === this.query.status) {
          name = v.label;
        }
      });
      return name;
    },
    type() {
      if (this.info.type === 1) {
        return "银行卡转账";
      } else if (this.info.type === 2) {
        return "微信转账";
      } else if (this.info.type === 3) {
        return "支付宝转账";
      }
    },
    statusInfo() {
      if (this.info.status === 1) {
        return "审核中";
      } else if (this.info.status === 2) {
        return "成功";
      } else {
        return "失败";
      }
    }
  },
  methods: {
    selectDate(date) {
      this.query.date = date;
      this.page = 1;
      this.data = [];
      this.getData();
    },

    selectStatus(item) {
      this.query.status = item.value;
      this.page = 1;
      this.data = [];
      this.getData();
    },

    onRefresh() {
      this.isPulling = true;
      this.query = {
        date: [],
        status: 0
      };
      this.data = [];
      this.page = 1;
      this.getData();
    },

    async getData() {
      const query = {
        status: this.query.status,
        start_time: this.query.date[0],
        end_time: this.query.date[1]
      };
      const res = await get_recharge_record(this.page, this.limit, query);
      this.loading = false;
      this.isPulling = false;
      this.listLoading = false;
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
    },

    detail(item) {
      this.info = item;
      this.showDetail = true;
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



<style lang="less" >
.recharge-record {
  padding-top: 92px;
  position: relative;
  .van-pull-refresh {
    overflow: visible;
  }
  .list {
    .sticky {
      position: sticky;
      top: 92px;
      z-index: 1;
    }

    min-height: 400px;
  }
}
</style>
