//index.js
//获取应用实例
const app = getApp();
var history = [];
var menu = [];


const myUtil = require("../../utils/util.js")

Page({
  data: {
    // 统计商品数量和价格
    orderCount: {
      num: 0,
      money: 0
    },
    bottomFlag: false,
    // 提交的订单
    orders: true,
    items: []
  },
  // 点击对应菜单添加按钮
  del: function (event) {
    let that = this;
    let id = event.target.dataset.id;
    let index = event.target.dataset.index;
    let param = this.data.items[index];
    if(param.num > 0){
      param.num--; // 每点一次减少1
    } else {
      param.num = 0; // 最低为0
    }
    // 改变添加按钮的状态
    this.data.items.splice(index, 1, param);
    that.setData({
      items: this.data.items
    });
    let money = 0;
    let num = 0;
    // 将已经确定总价格和数量求和
    this.data.items.forEach(item => {
      money += item.price * item.num;
      num += item.num;
    });
    let orderCount = {
      num,
      money
    }
    // 设置显示对应的总数和全部价钱
    this.setData({
      orderCount
    });
  },
  // 点击对应菜单添加按钮
  add: function(event) {
    let that = this;
    let id = event.target.dataset.id;
    let index = event.target.dataset.index;
    let param = this.data.items[index];
    let subOrders = []; // 购物单列表存储数据
    param.num++; // 每点一次增加1
    // 改变添加按钮的状态
    console.log(param);
    this.data.items.splice(index, 1, param);
    that.setData({
      items: this.data.items
    });
    let money = 0;
    let num = 0;
    // 将已经确定总价格和数量求和
    this.data.items.forEach(item => {
      money += item.price*item.num;
      num += item.num; 
    });
    let orderCount = {
      num,
      money
    }
    // 设置显示对应的总数和全部价钱
    this.setData({
      orderCount
    });
  },
 
  pay: function () {
    let that = this;
    if (that.data.orderCount.num == 0) {
      wx.showToast({
        title: '需至少选择一个商品',
        icon: 'loading',
        duration: 2000
      }
      )

      return;
    }
    //将当前菜单写入history缓存
    let subOrders = []
    this.data.items.forEach(item => {
      if (item.active) {
        subOrders.push(item);
      }
    });

    var date = new Date()
    date = myUtil.formatTime(date)
    let historyMenu = { menu: subOrders, date: date }
    history.push(historyMenu)
    wx.setStorageSync('history', history)

    wx.showToast({
      title: '提交成功',
    })
   setTimeout(()=>{
     wx.switchTab({
       url: '../../pages/index/index',
     })
   },800)
  },
  onLoad: function() {
    let that = this;
    // 取出订单传过来的数据
    wx.getStorage({
      key: 'orders',
      success: function (res) {
        that.setData({
          items: res.data
        });
        // 价格统计汇总
        let money = 0;
        let num = res.data.length;
        res.data.forEach(item => {
          money += (item.price*item.num); // 总价格求和
        });
        let orderCount = {
          num,
          money
        }
        // 设置显示对应的总数和全部价钱
        that.setData({
          orderCount
        });
      }
    })
  }
})