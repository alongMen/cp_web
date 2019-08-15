<template>
  <div class="orderinfo canvas" ref="canvas">
    <van-nav-bar left-arrow @click-left="onClickLeft" fixed :z-index="333"/>
    <div class="title">订单详情</div>
    <div class="infoboxs">
        <i v-if="form.type==1" class="cp_icon_bank bank"></i>
        <i v-if="form.type==2" class="cp_icon_wechat wechat"></i>
        <i v-if="form.type==3" class="cp_icon_alipay alipay"></i>
        <div class="type" v-if="form.type==1">{{form.bankname}}</div>
        <div class="type" v-if="form.type==2">微信</div>
        <div class="type" v-if="form.type==3">支付宝</div>
        <div class="price">{{form.amount}}<span class="danwei"> 元</span></div>
        <div class="van-hairline--bottom" style="margin: .1rem 0;"></div>
        <div class="boxitems">
            <div class="infobox" v-if="form.type != 1">
              <div class="infoitem">账户名：</div>
              <div class="iteminfo">{{form.name}}</div>
            </div>
            <div class="infobox" v-if="form.type == 1">
              <div class="infoitem">开户行：</div>
              <div class="iteminfo">{{form.bankname}}</div>
            </div>
            <div class="infobox" v-if="form.type == 1">
              <div class="infoitem">卡号：</div>
              <div class="iteminfo">{{form.account}}</div>
            </div>
            <div class="infobox" >
              <div class="infoitem">时间：</div>
              <div class="iteminfo">{{formatBeijingDate(form.create_at)}}</div>
            </div>
            <div class="infobox" >
                <div class="infoitem">订单号：</div>
                <div class="iteminfo">{{form.order_no}}</div>
            </div>
        </div>
        <div class="qcode" v-if="form.type != 1">
          <img :src="form.qrcode" class="qrcode" alt="" >
        </div>
        <div class="code">
          附言码：<span style="color:#4DD2F1" id="foo">{{form.post_script}}</span>
        </div>
    </div>
    <div class="btnbox">
        <div class="item">
            <span class="recharge save_btn" @click="savecanvas">保存图片</span>
        </div>
        <div class="item btn" data-clipboard-target="#foo">
            <span class="postal">复制附言码</span>
        </div>
    </div>
  </div>
</template>

<script>
import { bankList } from '@/utils/bank_list.js';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';

import ClipboardJS from 'clipboard';

export default {

  data(){
    return{
      bankList,
      img: '',//二维码src.
      form:Object
    }
  },
  methods: {
    onClickLeft(){
      this.$router.push('/mine');
    },
    savecanvas(){
        let canvas = document.querySelector('.canvas');
        let that = this;
        html2canvas(canvas,{scale:2,logging:false,useCORS:true}).then(function(canvas) {
                let type = 'png';
                let imgData = canvas.toDataURL(type);
                // 照片格式处理
                let _fixType = function(type) {
                    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
                    let r = type.match(/png|jpeg|bmp|gif/)[0];
                    return 'image/' + r;
                };
                imgData = imgData.replace(_fixType(type),'image/octet-stream');
                let filename = "UUSound" + '.' + type;
                that.saveFile(imgData,filename);
        });
    },
    saveFile(data, filename){
        let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = data;
        save_link.download = filename;
    
        let event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
    }
  },
  mounted(){
    const order = JSON.parse(this.$route.query.order);
    console.log(order);
    this.form = order;
    const self = this;
    QRCode.toDataURL(this.$baseUrl + order.qrcode , { width: 220, height: 220 }, function(
      err,
      url
    ) {
      self.img = url;
      self.form.qrcode = self.img;
    });
    // console.log(this.bankList);
    this.bankList.forEach((item,index) => {
      if(self.form.bank_id == item.id){
        self.form.bankname = item.name;
      }
    });
    

    var clipboard = new ClipboardJS('.btn');
    clipboard.on('success', function(e) {
        // console.info('Action:', e.action);
        console.info('Text:', e.text);
        // console.info('Trigger:', e.trigger);
        e.clearSelection();
        self.$toast('复制成功！');
    });
  }
}

</script>
<style lang="less">
.van-hairline--bottom::after {
  border: none;
}
.van-nav-bar {
  background-color: rgba(0, 0, 0, 0);
}
@import '../../assets/font/style.css';
.orderinfo{
  width: 100%;
  background-color: #FAFAFA;
  .title{
    height: .72rem;
    width: 100%;
    background-color: #fff;
    text-align: center;
    font-size: .16rem;
    font-weight: 500;
    line-height: .72rem;
  }
  .infoboxs{
    margin-top: .1rem;
    padding: .2rem;
    background-color: #fff;
    .wechat,.bank,.alipay{
      font-size: .3rem;
      width: .5rem;
      height: .5rem;
      text-align: center;
      line-height: .5rem;
      background-color: rgba(96,218,54,0.1);
      border-radius:8px;
      display: block;
      margin: 0 auto;
    }
    .type{
      width: 100%;
      text-align: center;
      font-size: .14rem;
      line-height: .2rem;
      margin: .1rem 0;
    }
    .price{
      width: 100%;
      text-align: center;
      font-size:.3rem;
      font-family:HelveticaNeue-Medium;
      font-weight:500;
      color:rgba(250,114,104,1);
      line-height:.37rem;
      letter-spacing:1px;
      text-shadow:0px 2px 4px rgba(250,114,104,0.4);
      padding-bottom: .1rem;
      .danwei{
        font-size:.16rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(250,114,104,1);
        line-height:.22rem;
      }
    }
    .boxitems{
      width: 100%;
      padding: .1rem 0;
      .infobox{
        padding: .02rem 0;
        display: flex;
        font-size: .14rem;
        line-height: .2rem;
        .infoitem{width: 80px;text-align: right;
          font-weight:400;
          color:rgba(155,166,168,1);
          line-height:20px;
          font-size: .14rem;
        }
        .iteminfo{
            flex: 1;
            color:rgba(17,17,17,1);
            line-height:.2rem;
            font-size: .14rem;
        }
      }
    }
    
  }
  .btnbox{
    padding: 0 .2rem;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    .item{
        width: 1.4rem;
        height: .48rem;
        line-height: .48rem;
        font-size: .16rem;
        border-radius: .14rem;
        // box-shadow: -2px 6px 0 0 rgba(100,216,245,0.4);
        background:rgba(100,216,245,1);
        color: #fff;
        text-align: center;
        .recharge,.postal{
            font-size: .16rem;
        }
    }
  }
  .qcode{
    width: 1.4rem;
    height: 1.4rem;
    text-align: center;
    margin: .1rem auto;
    .qrcode{
      width: 100%;
      height: 100%;
    }
  }
  .code{
    width: 100%;
    text-align: center;
    font-size:.14rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(17,17,17,1);
    line-height:.2rem;
    span{
      line-height:.2rem;
      font-size:.14rem;
    }
  }
}

.infobox .wechat::before{
  color: #60da36;
}
.infobox .bank::before{
  color: #ffcc01;
}
.infobox .wechat::before{
  color: #34a7ff;
}
</style>