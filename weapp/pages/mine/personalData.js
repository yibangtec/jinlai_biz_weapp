// pages/mine/personalData.js
var app = getApp()
var user_id = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    dis: 'display:block',
    imgStyle: 'display:block',
    mainImageSrc: '',
    user:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    user_id = options.mineId
    var url = 'user/detail'
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
        data: { app_type: 'biz', id: user_id },
        success: function (result) {
          console.log(result)
          if (result.data.status == 200) {
            that.setData({
              user: result.data.content
            })
            //获取本地user.password值，若为空则转到密码设置页
            if (result.data.content.passworde == "") {
              wx.redirectTo({
                url: '../../pages/login/pwset'
              })
            }
            //获取本地user表，并赋值info_user中涉及到的字段；其中avatar项若user.avatar为空，
            //则显示占位图像（待设计提供）；nickname项若user.nickname为空，则显示user.mobile
            if (result.data.content.avatar == null) {
              console.log(result.data.content.avatar)
              that.setData({
                headerImg: '../../image/header.png',//如果没有头像时的占位符
              })
            } else {
              console.log(result.data.content.avatar)
              that.setData({
                headerImg: 'https://jinlaisandbox-images.b0.upaiyun.com/user/' + result.data.content.avatar,
              })
            }

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