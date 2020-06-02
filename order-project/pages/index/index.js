//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabIndex: 0,
    // 统计商品数量和价格
    orderCount: {
      num: 0,
      money: 0
    },
    bottomFlag: false,
    // 提交的订单
    orders: true,
    menus: [{
      id: 1,
      menu: '菜单一'
    }, {
      id: 1,
      menu: '菜单二'
    }, {
      id: 1,
      menu: '菜单三'
    }, {
      id: 1,
      menu: '菜单四'
    }],
    // 商品列表
    items: [{
      id: 1,
      title: '水果牛奶冰',
      price: 16,
      image: '/images/1.png',
      active: false,
      num: 1
    }, {
      id: 2,
      title: '奶盖牛奶冰',
      price: 16,
      image: '/images/2.png',
      active: false,
      num: 1
    }, {
      id: 3,
      title: '冰芒',
      price: 14,
      image: '/images/3.png',
      active: false,
      num: 1
    }, {
      id: 4,
      title: '水果缤纷',
      price: 15,
      image: '/images/4.png',
      active: false,
      num: 1
    }, {
      id: 5,
      title: '双拼牛奶冰',
      price: 16,
      image: '/images/5.png',
      active: false,
      num: 1
    }, {
      id: 6,
      title: '草莓牛奶冰',
      price: 16,
      image: '/images/8.png',
      active: false,
      num: 1
    }, {
      id: 7,
      title: '什锦牛奶冰',
      price: 18,
      image: '/images/7.png',
      active: false,
      num: 1
      }, {
        id: 8,
        title: '冰岛',
        price: 18,
        image: '/images/8.png',
        active: false,
        num: 1
      }, {
        id: 9,
        title: '水果益力多',
        price: 16,
        image: '/images/9.png',
        active: false,
        num: 1
      }, {
        id: 10,
        title: '水果茉莉茶',
        price: 12,
        image: '/images/10.png',
        active: false,
        num: 1
      }, {
        id: 11,
        title: '法式慕斯',
        price: 21,
        image: '/images/11.png',
        active: false,
        num: 1
      }, {
        id: 12,
        title: '杯子蛋糕',
        price: 12,
        image: '/images/12.png',
        active: false,
        num: 1
      }, {
        id: 13,
        title: '提拉米苏',
        price: 20,
        image: '/images/13.png',
        active: false,
        num: 1
      }, {
        id: 14,
        title: '核桃雪花酥',
        price: 15,
        image: '/images/14.png',
        active: false,
        num: 1
      }, {
        id: 15,
        title: '蔓越莓雪花酥',
        price: 18,
        image: '/images/15.png',
        active: false,
        num: 1
      },
    ]
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    setTimeout(()=>{
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 500
      });
      wx.stopPullDownRefresh()
    }, 500);
  },
  tabMenu: function(event) {
    let index = event.target.dataset.index;
    this.setData({
      tabIndex: index
    });
  },
  // 点击去购物车结账
  card: function() {
    let that = this;
    // 判断是否有选中商品
    if (that.data.orderCount.num !== 0) {
      // 跳转到购物车
      wx.redirectTo({
        url: '../order/order'
      });
    } else {
      wx.showToast({
        title: '您未选中任何商品',
        icon: 'none',
        duration: 2000
      })
    }
  },
  addOrder: function(event) {
    let that = this;
    let id = event.target.dataset.id;
    let index = event.target.dataset.index;
    let param = this.data.items[index];
    let subOrders = []; // 购物单列表存储数据
    param.active ? param.active = false : param.active = true;
    // 改变添加按钮的状态
    this.data.items.splice(index, 1, param);
    console.log(param);
    that.setData({
      items: this.data.items
    });
    // 将已经确定的菜单添加到购物单列表数组
    this.data.items.forEach(item => {
      if (item.active) {
        subOrders.push(item);
      }
    });
    // 判断底部提交菜单显示隐藏
    if (subOrders.length == 0) {
      that.setData({
        bottomFlag: false
      });
    } else {
      that.setData({
        bottomFlag: true
      });
    }
    let money = 0;
    let num = subOrders.length;
    subOrders.forEach(item => {
      money += item.price; // 总价格求和
    });
    let orderCount = {
      num,
      money
    }
    // 设置显示对应的总数和全部价钱
    this.setData({
      orderCount
    });
    // 将选中的商品存储在本地
    wx.setStorage({
      key: "orders",
      data: subOrders
    });
  },
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '首页',
    })

  }
})