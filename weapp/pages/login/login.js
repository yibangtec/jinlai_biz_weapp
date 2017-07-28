// login.js
var login, tel, pw;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnMin:'mini',
    dis:'display:none',
    telFocus:false,
    pwFocus:false,
    disbtn:true,
    tel:'',
    pw:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timestamp = Date.parse(new Date())
    wx.getStorage({
      key: 'time_expire_login',
      success: function (res) {
        login = res.data
        console.log(login)
        if (login > timestamp) {
          wx.reLaunch({
            url: '../../pages/mine/index'
          })
        }
      },
      fail: function (err) {
       
      }
    })
  },
  login_sms:function(e){
    wx.navigateTo({
      url: 'login_sms'
    })
  },
  //手机号输入框失去焦点获取tel
  getTel:function(e){
    tel = e.detail.value
    var that = this

    var re = /^1\d{10}$/
    if (re.test(tel)) {
      that.setData({
        disbtn: false
      })
    } else {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'loading',
        duration: 2000
      })
      that.setData({
        telFocus: true,
      })
    }
  },
  
  //失去焦点的时候获取pw
  getPw:function(e){
    pw = e.detail.value
  },
  //点击确定判断pw,登录
  pwLogin:function(e){
    var that=this
    var re = /^[a-zA-Z0-9]{6,20}$/
    if (re.test(pw)) {
      var url = 'account/login'
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
          data: { password:pw, mobile: tel },
          success: function (result) {
            console.log(result)
            var user = result.data
            if (result.data.status==200){
              wx.showToast({
                title: '登录成功',
                icon: 'loading',
                duration: 2000
              })
              wx.setStorage({
                key: "user",
                data: user
              })
              wx.reLaunch({
                url: '../../pages/mine/index'
              })
            }
           
            var timestamp = Date.parse(new Date())
            var time_expire_login = timestamp + 90*24*3600*1000
            wx.setStorage({
              key: "time_expire_login",
              data: time_expire_login
            })

           
          },
          fail: function (result) {
            console.log(result)
            wx.vibrateShort()
          }
        })
      }
    } else {
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
    //wx.switchTab({
      //url: '../../pages/index/index'
    //})
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