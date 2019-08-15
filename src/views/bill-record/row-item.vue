<template>
  <div class="bill-row-item van-hairline--bottom">
    <div class="row">
      <p class="type">{{type}}</p>

      <p class="amount success" v-if="data.amount >=0">
        +{{data.amount.toLocaleString()}}
      </p>
      <p class="amount fail" v-if="data.amount <0">
        {{data.amount.toLocaleString()}}
      </p>
    </div>

    <div class="row" style="margin-top:12px">
      <p class="date">{{formatBeijingDate(data.create_at)}}</p>
    </div>
  </div>
</template>


<script>
import { bill_change_type_enum } from "@/config/enum";

export default {
  props: {
    data: Object
  },
  computed: {
    type() {
      const type = this.data.type;
      let name = "";
      bill_change_type_enum.forEach(v => {
        if (v.value === type) {
          name = v.label;
        }
      });
      return name;
    }
  }
};
</script>


<style lang="less" scoped>
.bill-row-item {
  padding: 10px;


  

  .row {
    display: flex;
    justify-content: space-between;
    // padding-top: 4px;
  }

  .type {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(17, 17, 17, 1);
  }

  .date {
    font-size: 12px;
    font-family: HelveticaNeue;
    color: rgba(203, 212, 213, 1);
  }

  .amount {
    font-size: 14px;
  }
}
</style>
