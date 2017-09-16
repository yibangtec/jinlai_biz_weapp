// pages/mine/mineEdit.js
var app = getApp()
var newValue=''
var userId=''
var value =''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userId = options.mineId
    value = options.vue
    this.setData({
      value: value,
    })
  },
  getValue:function(e){
    newValue=e.detail.value
  },
  mineEdit:function(e){
    // 通过API获取或处理数据
    var url = 'user/edit_certain'
    var params = {}
    var api_result = api_request(url, params)

    // 网络请求
    function api_request(url, api_params) {
      // 生成签名
      app.sign_generate(api_params)

      // 通过小程序的网络请求API发送请求
      wx.request({
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: app.globalData.url_api + url,
        data: { app_type: 'biz',user_id: userId, id: userId, name: 'nickname', value: newValue},
        success: function (result) {
          console.log(result)
          if (result.data.status == 200) {
            wx.showToast({
              title: result.data.content.message,
              icon: 'loading',
              duration: 2000
            })
            wx.reLaunch({
              url: 'index'
            })
          } else {
            wx.showToast({
              title: result.data.content.error.message,
              icon: 'loading',
              duration: 2000
            })
          }
        },
        fail: function (result) {
          console.log(result)
          wx.vibrateShort()
        }
      })
    }
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