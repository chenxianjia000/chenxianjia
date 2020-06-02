var history = [];


Page({
  data: {


  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '历史订单',
    })
    history = wx.getStorageSync('history')
    this.setData({
      history: history
    })
  }
  
})