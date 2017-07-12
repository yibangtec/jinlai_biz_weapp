// login_sms.js
var app = getApp();
var login,tel,code,sms_id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnMin: 'mini',
    getVer:'获取验证码',
    telFocus: false,
    codeFocus: false,
    disbtn: true,
    disableVer:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取本地time_expire_login值，若大于当前时间戳则转到“我的”页
    wx.getStorage({
      key: 'time_expire_login',
      success: function (res) {
        login = res.data
        var timestamp = Date.parse(new Date())
        console.log(login)
        console.log(timestamp)
        if (login > timestamp) {
          wx.reLaunch({
            url: '../../pages/mine/index'
          })
        }
      },
      fail: function (err) {

      }
    })
    //获取本地time_end_countdown值，若无或该值小于当前时间戳则结束
    //获取本地mobile值并设置mobile为该值，设置mobile、button_sms为未激活状态，设置captcha、button_submit为激活状态，焦点移入captcha
    //计算time_end_countdown值与当前时间戳相差秒数，并倒计时相应秒数
    //每秒更新button_sms文本为倒计时剩余秒数“xx 秒”
    //倒计时结束后设置mobile、button_sms为激活状态

   
  },
  getTel:function(e){
    tel = e.detail.value
  },
  //验证码input输入框获取焦点的时候
  verifyTel:function(e){
    var that = this
    that.setData({
      disbtn: false,
    })
  },
  getCode:function(e){
    code = e.detail.value
  },
  getVerify:function(e){
    var that = this
    var wait = 60
    var re = /^1\d{10}$/
    if (re.test(tel)) {
      wx.setStorage({
        key: "mobile",
        data: tel
      })
      function time(o) {
        if (wait == 0) {
          o.setData({
            disableVer: false,
            getVer: "获取验证码"
          })
          wait = 60;
        } else {
          o.setData({
            disableVer: true,
            getVer: wait + "秒后重新发送"
          })
          wait--;
          setTimeout(function () {
            time(o)
          },
            1000)
        }
      }
      if (tel == '') {
        this.setData({
          err: "请输入电话号码"
        })
      } else {
        time(that)
        console.log("")
        // 通过API获取或处理数据
        var url = 'sms/create'
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
            data: { mobile: tel },
            success: function (result) {
              sms_id = result.data.content.sms_id
              console.log(result.data.content.sms_id)
              wx.setStorage({
                key: "sms_id",
                data: result.data.content.sms_id
              })
            },
            fail: function (result) {
              console.log(result)
              wx.vibrateShort()
            }
          })
        }
      }

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
    console.log(tel)


  },
  codeLogin:function(e){
    var re = /^\d{6}$/
    if (re.test(code)) {
      var url = 'account/login_sms'
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
          data: { mobile: tel, captcha: code, sms_id: sms_id },
          success: function (result) {
            console.log(result)
            if (result.data.status==200){
              if (result.data.content.password == 'set') {
                wx.reLaunch({
                  url: '../../pages/mine/index'
                })
                console.log("set")
                
              } else {
                wx.redirectTo({
                  url: 'pwset'
                })
              }
            }
          },
          fail: function (result) {
            console.log(result)
            wx.vibrateShort()
          }
        })
      }
    } else {
      wx.showToast({
        title: '请输入正确的验证码格式',
        icon: 'loading',
        duration: 2000
      })
      that.setData({
        codeFocus: true,
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
    wx.switchTab({
      url: '../../pages/mine/index'
    })
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