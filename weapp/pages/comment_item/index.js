// pages/comment_item/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: {
      all: 'tab-current',
      favourable: '',
      intermediate: '',
      negative:''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var url = 'comment_biz/index'
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
        data: { limit: 10, },
        success: function (result) {
          console.log(result.data)
          var list = result.data.content
          that.setData({
            item: list
          })
        },
        fail: function (result) {
          console.log(result)
          wx.vibrateShort()
        }
      })
    }
  },
  allComment:function(e){
    var that = this
    that.setData({
      currentTab: {
        all: 'tab-current',
        favourable: '',
        intermediate: '',
        negative: ''
      },
    })
  },
  favourableComment: function (e) {
    var that = this
    that.setData({
      currentTab: {
        all: '',
        favourable: 'tab-current',
        intermediate: '',
        negative: ''
      },
    })
  },
  intermediateComment: function (e) {
    var that = this
    that.setData({
      currentTab: {
        all: '',
        favourable: '',
        intermediate: 'tab-current',
        negative: ''
      },
    })
  },
  negativeComment: function (e) {
    var that = this
    that.setData({
      currentTab: {
        all: '',
        favourable: '',
        intermediate: '',
        negative: 'tab-current'
      },
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