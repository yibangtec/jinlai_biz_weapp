// pwchange.js
var app = getApp()
var currentPw, newPw, confirmPw, userId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focusCurrentPw: false,
    focusNewPw: false,
    focusConfirmPw:false,
    disbtn: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'user_password',
      success: function (res) {
        if (res.data !== "set") {
          wx.redirectTo({
            url: 'pwset'
          })
        }
      },
      fail: function (err) {

      }
    })
  },
  getCurrentPw:function(e){
    currentPw=e.detail.value
  },
  verCurrentPw: function (e) {
    var that = this
    var re = /^[a-zA-Z0-9]{6,20}$/
    if (re.test(currentPw)) {
    }else{
      wx.showToast({
        title: '请输入正确的密码格式',
        icon: 'loading',
        duration: 2000
      })
      that.setData({
        focusCurrentPw: true,
      })
    }
  },
  getNewPw:function(e){
    newPw = e.detail.value
  },
  
  verNewPw: function (e) {
    var that=this
    if (currentPw === newPw){
      wx.showToast({
        title: '新密码不能与原始密码相同',
        icon: 'loading',
        duration: 2000
      })
      that.setData({
        focusNewPw: true,
      })
    }
    var re = /^[a-zA-Z0-9]{6,20}$/
    if (re.test(newPw)) {
      that.setData({
        disbtn: false,
      })
    } else {
      wx.showToast({
        title: '请输入正确的密码格式',
        icon: 'loading',
        duration: 2000
      })
      that.setData({
        focusNewPw: true,
      })
    }
    wx.getStorage({
      key: 'user',
      success: function (res) {
        userId = res.data.content.user_id
        console.log(userId)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  getPwConfirm: function (e) {
    confirmPw = e.detail.value
  },
  changePw:function(e){
    var that = this
    if (confirmPw==""){
      wx.showToast({
        title: '密码不能为空',
        icon: 'loading',
        duration: 2000
      })
      that.setData({
        focusConfirmPw: true,
      })
    }
    if (confirmPw===newPw){
      var url = 'account/password_change'
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
          data: { user_id: userId, password: newPw, password_confirm: confirmPw, password_current:currentPw },
          success: function (result) {
            console.log(result)
            if (result.data.status == 200) {
              wx.redirectTo({
                url: 'pwresult?title="成功修改密码"'
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
        focusConfirmPw: true,
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