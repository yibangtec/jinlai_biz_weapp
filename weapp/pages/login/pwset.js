// pwset.js
var pw, pwtow;
var userId;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwFocus: false,
    pwTowFocus: false,
    disbtn: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  getPw:function(e){
    pw = e.detail.value
  },
  verifyPw:function(e){
    var that=this
    var re = /^[a-zA-Z0-9]{6,20}$/
    if (re.test(pw)) {
      that.setData({
        disbtn: false,
      })
    }else{
      wx.showToast({
        title: '请输入正确的密码格式',
        icon: 'loading',
        duration: 2000
      })
      that.setData({
        pwFocus: true,
      })
    }
  },
  getPwTow:function(e){
    pwtow = e.detail.value
    wx.getStorage({
      key: 'user',
      success: function (res) {
        userId = res.data.data.content.user_id

        console.log(userId)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  pwSet:function(){
    var that=this
    if(pw===pwtow){
      var url = 'account/password_set'
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
          data: { user_id:userId, password:pw, password_confirm:pwtow },
          success: function (result) {
            console.log(result)
            if (result.data.status == 200){
              wx.setStorage({
                key: "user_password",
                data: 'set'
              })
              wx.reLaunch({
                url: '../../pages/mine/index'
              })
            }
            
          },
          fail: function (result) {
            console.log(result)
            wx.vibrateShort()
          }
        })
      }
    }else{
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'loading',
        duration: 2000
      })
      that.setData({
        pwTowFocus: true,
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