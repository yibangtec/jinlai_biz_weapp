// pages/category_biz/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: {
      first: 'tab-current',
      center: '',
      last: ''
    },
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  allCategory:function(e){
    var that = this
    that.setData({
      currentTab: {
        first: 'tab-current',
        center: '',
        last: ''
      },
    })

  },
  deleteCategory: function (e) {
    var that = this
    that.setData({
      currentTab: {
        first: '',
        center: 'tab-current',
        last: ''
      },
    })
  },
  crearCategory: function (e) {
    var that = this
    that.setData({
      currentTab: {
        first: '',
        center: '',
        last: 'tab-current'
      },
    })
  },
  edit:function(e){
    wx.navigateTo({
      url: 'edit'
    })
  },
  detail:function(e){
    wx.navigateTo({
      url: 'detail'
    })
  },
  recovery:function(e){
    wx.navigateTo({
      url: 'recovery'
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