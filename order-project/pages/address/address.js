// pages/address/address.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  changeAddre: function (e) {
    wx.navigateTo({
      url: '../newAddress/newAddress'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '地址',
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;

    // 获取地址信息缓存
    wx.getStorage({
      key: 'addName',
      success: function(res) {
        console.log(res.data);
        that.setData({
          addName: res.data
          })
        },
      })
    wx.getStorage({
      key: 'addTel',
      success: function (res) {
        console.log(res.data);
        that.setData({
          addTel: res.data
        })
      },
    })
    wx.getStorage({
      key: 'addAddress',
      success: function (res) {
        console.log(res.data);
        that.setData({
          addAddress: res.data
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})