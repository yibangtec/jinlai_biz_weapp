// pwreset.js
var tel, code, newPw, confirmPw, smsId;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getVer:'获取验证码',
    telFocus:false,
    codeFocus:false,
    focusNewPw:false,
    focusConfirmPw:false,
    disableVer:false,
    disbtn:true,
    tell:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: options.title })
    var that =this
    //清空本地time_expire_login值
    wx.setStorage({
      key: "time_expire_login",
      data: ""
    })
    //获取本地user.password值，若该值为空，则转到短信登录页
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res.data.content.password)
        if (res.data.content.password==""){
          wx.redirectTo({
            url: 'login_sms'
          })
        }
      },
      fail: function (err) {
        console.log(err)
        
      }
    })
    //获取本地time_end_countdown值，若无或该值小于当前时间戳则结束
    var timestamp = Date.parse(new Date())
    wx.getStorage({
      key: 'time_end_countdown',
      success: function (res) {
        if (res.data.content.password == '' || res.data.content.password < timestamp) {
          wx.redirectTo({
            url: 'login'
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
   
    //获取本地mobile值并设置mobile为该值，设置mobile、button_sms为未激活状态，设置captcha、button_submit为激活状态，焦点移入captcha
    wx.getStorage({
      key: 'mobile',
      success: function (res) {
        console.log(res.data)
        tel = res.data
        that.setData({
          tell: tel
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
    //计算time_end_countdown值与当前时间戳相差秒数，并倒计时相应秒数

    //每秒更新button_sms文本为倒计时剩余秒数“xx 秒”
    //倒计时结束后设置mobile、button_sms为激活状态
  },
  //获取手机号
  getTel: function (e) {
    tel = e.detail.value
  },
  //获取验证码，先验证手机号，再掉接口
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
            getVer: wait + "后重新发送"
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
              smsId = result.data.content.sms_id
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

  },
  getCode:function(e){
    code = e.detail.value
  },
  verCode:function(e){
    var that = this
    var re = /^\d{6}$/
    if (re.test(code)) {

    }else{
      wx.showToast({
        title: '验证码格式不正确',
        icon: 'loading',
        duration: 2000
      })
      that.setData({
        codeFocus: true,
      })
    }
  },
  getNewPw: function (e) {
    newPw = e.detail.value
  },

  verNewPw:function(e){
    var that = this
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
  resetPw:function(e){
    if (confirmPw === newPw) {
      
      var url = 'account/password_reset'
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
          data: { captcha: code, mobile: tel, password: newPw, password_confirm: confirmPw, sms_id: smsId },
          success: function (result) {
            console.log(result)
            var user = result.data
            if (result.data.status == 200) {
              wx.setStorage({
                key: "user",
                data: user
              })
            }

            var timestamp = Date.parse(new Date())
            var time_expire_login = timestamp + 90 * 24 * 3600 * 1000
            wx.setStorage({
              key: "time_expire_login",
              data: time_expire_login
            })

            wx.reLaunch({
              url: 'pwresult?title=密码重置成功'
            })
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