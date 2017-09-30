// pages/order/detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  remarks:function(e){
    wx.navigateTo({
      url: 'orderOperation?title='+'订单备注'
    })
  },
  chargeback: function (e) {
    wx.navigateTo({
      url: 'orderOperation?title=' + '订单退单'
    })
  },
  ordertaking: function (e) {
    wx.navigateTo({
      url: 'orderOperation?title=' + '订单接单'
    })
  },
  delivergoods: function (e) {
    wx.navigateTo({
      url: 'orderOperation?title=' + '订单发货'
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