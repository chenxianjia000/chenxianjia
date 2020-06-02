// pages/newAddress/newAddress.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputTel: '',
    inputAddress: '',
    inputName: ''
  },
  bindName: function (e) {
    this.setData({
      inputName: e.detail.value
    })
  },
  bindTel: function (e) {
    this.setData({
      inputTel: e.detail.value,
    })
  },
  bindAddress: function (e) {
    this.setData({
      inputAddress: e.detail.value
    })
  },
 
  addbtn: function() {
    if (this.data.inputName) {
      wx.setStorage({
        key: 'addName',
        data: this.data.inputName,
      }) //将地址信息缓存
    } else {
      wx.showModal({
        title: '请输入正确的收货人姓名',
        content: '',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      }); //校验用户输入是否正确
      return;
    };
    if ((/^1(3|4|5|7|8)\d{9}$/.test(this.data.inputTel))){
      wx.setStorage({
        key: 'addTel',
        data: this.data.inputTel,
      })
    }else{
      wx.showModal({
        title: '请输入正确的手机号码',
        content: '',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return;
    };
    if (this.data.inputAddress) {
      wx.setStorage({
        key: 'addAddress',
        data: this.data.inputAddress,
      })
    } else {
      wx.showModal({
        title: '请输入正确的收货地址',
        content: '',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return;
    };
    wx.showModal({
      title: '修改成功',
      content: '',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '地址修改',
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