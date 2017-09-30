// pages/item/itemDeleted.js
var app = getApp()
var user_id = ''
var id = ''
var operation = ''
var password = ''
var bizId = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth: 180,//删除按钮宽度单位（rpx） 
    list: '',
    showModal: false,
    itemObj: '',
    itemStyle: 'display:none',
    itemNone: 'display:block',
    selectedAllStatus: false,
    userId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res.data.content)
        user_id = res.data.content.user_id
        bizId = res.data.content.biz_id
        that.setData({
          userId: user_id,
        })
        var url = 'item/index'
        var params = {}
        var api_result = api_request(url, params)
        // 网络请求
        function api_request(url, api_params) {
          // 生成签名
          console.log(bizId)
          console.log(app.globalData.url_api + url)
          app.sign_generate(api_params)

          // 通过小程序的网络请求API发送请求 time_delete:'null', bizId
          wx.request({
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            url: app.globalData.url_api + url,
            data: { app_type: 'item', time_delete: '', biz_id: 2 },
            success: function (result) {
              if (result.data.status == 200) {
                for (var i = 0; i < result.data.content.length; i++) {
                  result.data.content[i].selected = false
                }
                that.setData({
                  list: result.data.content,
                  itemStyle: 'display:block',
                  itemNone: 'display:none'
                })
              }
              console.log(result)
            },
            fail: function (result) {
              console.log(result)
              wx.vibrateShort()
            }
          })
        }
      },
      fail: function (err) {

      }
    })
  },
  listClick: function (e) {
    var itemId = e.currentTarget.dataset.name
    wx.navigateTo({
      url: 'detail?id=' + itemId,
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