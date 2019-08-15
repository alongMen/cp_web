<template>
  <div class="layout-with-fix-header">
    <div class="fix-header">
      <div class="header">
        <p class='left'> <van-icon name="arrow-left" size='20px' @click='onClickLeft' /> </p>
        <p class="title">游戏记录</p>

        <div class="seletor van-hairline--bottom">
          <div class="sufix"></div>
          <span class="game-name">{{gameName}}</span>

          <span class="arrow">
            <van-icon name="arrow-down" color="#4DD2F1" />
          </span>
        </div>
      </div>
    </div>

    <div class="game-result">
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
                <row-item v-for="(d, i) in item.list" :key="i" :data="d" @detail="detail"/>
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
          <van-cell title="期数" :value="info.stage" />
          <van-cell title="投注" :value="`${info.bet.toLocaleString()}元`" />
          <van-cell title="中奖" :value="`${info.win.toLocaleString()}元`" />
          <van-cell title="投注类型" :value="`${info.primary_name}：${info.secondary_name}`" />
          <van-cell title="开奖结果" v-if='this.info.status > 1' :value="`${info.result_count.H}+${info.result_count.T}+${info.result_count.B}=${info.result_count.Sum}（${info.result_count.re}）`" />
          <van-cell title="开奖结果" v-if='this.info.status === 1' :value="`（${info.result_count.re}）`" />
          <van-cell title="房间名" :value="`${info.room_name}`" />
          <van-cell title="状态" :value="info.status_name" />
          <van-cell title="投注时间" :value="formatBeijingDate(info.create_at)" />
      
        </van-cell-group>
      </van-popup>
    </div>
  </div>
</template>

<script>

import moment from "moment";
import RowTitle from "./row-title";
import { get_game_order_list , get_game_option } from "@/service/index";
import { sortBy } from "lodash";
import RowItem from "./row-item";
import Picker from "@/components/picker/index";
import DatePicker from "@/components/date-picker/index";
export default {
  components: {
    Picker,
    DatePicker,
    RowTitle,
    RowItem
  },
  data() {
    return {
      info: {bet:0,win:0,
      status:0,
      result_count:{
        H:'0',
        T:'0',
        B:'0',
        Sum:'0',
      }},
      showDetail: false,
      game_enum: [],
      id: 1,
      data: [],
      loading: true,
      showPicker: false,
      showDatePicker: false,
      page: 1,
      limit: 10,
      total: 0,
      isPulling: false,
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
          label: "已投注",
          value: 1
        },
        {
          label: "中奖",
          value: 2
        },
        {
          label: "未中奖",
          value: 3
        }
      ],
      listLoading: false
    };
  },
  computed: {
    statusText() {
      let name = "";
      this.status_options.forEach(v => {
        if (v.value === this.query.status) {
          name = v.label;
        }
      });
      return name;
    },
    gameName() {
      let name = "";
      this.game_enum.forEach(v => {
        if (v.value === this.id) {
          name = v.label;
        }
      });
      return name;
    },
    renderData() {
      const data = this.data;
      let obj = {};
      let arr = [];
      data.forEach(value => {
        const m = moment(value.create_at).month() + 1;
        const y = moment(value.create_at).year();
        const d = moment(value.create_at).date();
        const key = `${y}年${m}月${d}日`;
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
          const d = moment(value.create_at).date();
          const key = `${y}年${m}月${d}日`;
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
    }
  },

  methods: {
    detail(item) {
      this.info = item;
      this.showDetail = true;
    },
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

    onClickLeft() {
      this.$router.push("/mine");
    },
    onRefresh() {
      this.page = 1;
      this.data = [];
      this.query= {
        status: 0,
        date: [null, null]
      },
      this.getData();
    },

    async getData() {
      const query = {
        status: this.query.status,
        start_time: this.query.date[0],
        end_time: this.query.date[1]
      };
      const res = await get_game_order_list(this.id, this.page, this.limit,query);
      this.isPulling = false;
      this.loading = false;
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
    }
  },
  async mounted() {

    const res = await get_game_option();
    if(res.status < 400 ){
      this.id = res.data[0].value;
      this.game_enum = res.data;
    }

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
.game-result {
  padding-top: 114px;
  position: relative;
  padding-bottom: 50px;
  .van-pull-refresh {
    overflow: visible;
  }
  .list {
    .sticky {
      position: sticky;
      top: 114px;
      z-index: 1;
    }

    min-height: 400px;
  }
}
.header {
  background: #fff;
  display: flex;
  flex-direction: column;
  position:relative;
  // align-items: center;
  padding: 14px 20px;
  width: 100%;
  box-sizing: border-box;
  .left{
    position:absolute;
    left:12px;

  }
  .title {
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(17, 17, 17, 1);
  }

  .seletor {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 0;
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    .sufix {
      width: 40px;
      height: 40px;
      background-image: url("../../assets/images/hotpic.png");
      background-size: contain;
    }
    .game-name {
      padding-left: 20px;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(17, 17, 17, 1);
    }
    .arrow {
      position: absolute;
      right: 0;
    }
  }
}
</style>
