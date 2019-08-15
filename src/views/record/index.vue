<template>
  <div class="layout-with-fix-header">
    <div class="fix-header">
      <div class="header">
        <p class="title">开奖结果</p>

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
              <row-title class="sticky" :key="item.key" :date="item.key" />
              <div style="position:relative">
                <row-item v-for="(d, i) in item.list" :key="i" :data="d" />
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
    </div>
  </div>
</template>

<script>

import moment from "moment";
import RowTitle from "./row-title";
import { get_game_result_list , get_game_option } from "@/service/index";
import { sortBy } from "lodash";
import RowItem from "./row-item";
export default {
  components: {
    RowTitle,
    RowItem
  },
  data() {
    return {
      game_enum: [],
      id: 1,
      data: [],
      loading: true,
      page: 1,
      limit: 10,
      total: 0,
      isPulling: false,
      listLoading: false
    };
  },
  computed: {
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
        const m = moment(value.lottery_time).month() + 1;
        const y = moment(value.lottery_time).year();
        const d = moment(value.lottery_time).date();
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
          const m = moment(value.lottery_time).month() + 1;
          const y = moment(value.lottery_time).year();
          const d = moment(value.lottery_time).date();
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
    onRefresh() {
      this.page = 1;
      this.data = [];
      this.getData();
    },

    async getData() {
      const res = await get_game_result_list(this.id, this.page, this.limit);
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
  // align-items: center;
  padding: 14px 20px;
  width: 100%;
  box-sizing: border-box;
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
