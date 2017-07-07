// /pages/mine/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    nn:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    wx.setStorage({
      key: "key",
      data: "value"
    })
    wx.getStorageInfo({
      success: function (res) {
        console.log(res.keys)
        console.log(res.currentSize)
        console.log(res.limitSize)
      }
    })
    wx.getStorage({
      key: 'time_expire_login',
      success: function (res) {
        console.log(res.data+"safds")
      },
      fail:function(err){
        console.log(err)
      }
    })
    console.log(app.globalData.int)
    if (app.globalData.int===1){
      wx.redirectTo({
        url: 'login'
      })
    }
    //调用应用实例的方法获取全局数据
    var that=this
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo: userInfo,
      })
    });
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
    wx.stopPullDownRefresh()
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
    return {
      title: '我的账户',
      path: '/pages/mine/index'
    }
  }
})