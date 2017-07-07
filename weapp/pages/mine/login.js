// login.js
var types = ['default', 'primary', 'warn']
var pageObject = {
  
}
var app = getApp();
var tel;
var pas;
Page({
  data: {
    defaultSize: 'default',
    primarySize: 'mini',
    warnSize: 'default',
    defaultDisabled: false,
    disabled: false,
    disbtn:true,
    disableVer:false,
    disVerBtn:true,
    defaultPlain:false,
    plain: true,
    loading: false,
    displayB:"display:block",
    displayN:"display:none",
    plainde:false,
    telValue:'',
    inputValue:'',
    err:'',
    getVer:"获取验证码",
    bizs:[]
  },
  currentTab:function(e){
    this.setData({
      defaultPlain: false,
      plain: true,
      displayB: "display:block",
      displayN: "display:none"
    })
  },
  getTab:function(e){
    this.setData({
      defaultPlain: true,
      plain: false,
      displayB: "display:none",
      displayN: "display:block"
    })
  },
  bindTel:function(e){
    var that = this
    tel = e.detail.value
    that.setData({
      telValue: tel
    })
  },
  bindKeyInput: function (e) {
    var re= /^1\d{10}$/
    if (re.test(tel)) {
      this.setData({
        err: ""
      })
    } else {
      this.setData({
        err: "请输入正确的电话号码"
      })
    }
    console.log(tel)
  },
  bindPas:function(e){
    console.log(e.detail.value)
    pas = e.detail.value
    var re = /^[a-zA-Z0-9]{6,21}$/
    if (re.test(pas)) {
      this.setData({
        disbtn: false,
        err: ""
      })
    } else {
      this.setData({
        err: "密码6-20"
      })
    }
  },
  bindTelVer:function(e){
    var that = this
    tel = e.detail.value
    that.setData({
      telValue: tel
    })
    var re = /^1\d{10}$/
    if (re.test(tel)) {
      this.setData({
        err: ""
      })
      wx.setStorage({
        key: "mobile",
        data: tel
      })
    } else {
      this.setData({
        err: "请输入正确的电话号码"
      })
    }
    console.log(tel)
  },
  getVerify:function(e){
    var wait = 60;
    var that=this
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
          getVer: wait +"秒后重新发送"
        })
        wait--;
        setTimeout(function () {
          time(o)
        },
          1000)
      }
    }
    if(tel==''){
      this.setData({
        err: "请输入电话号码"
      })
    }else {
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
          data: {mobile:tel},
          success: function (result) {
            console.log(result.data.content.sms_id)
            wx.setStorage({
              key: "sms_id",
              data: result.data.content.sms_id
            })
            wx.getStorageInfo({
              success: function (res) {
                console.log(res.keys)
                console.log(res.currentSize)
                console.log(res.limitSize)
              }
            })
          },
          fail: function (result) {
            console.log(result)
            wx.vibrateShort()
          }
        })
      }

    }
    
  },
  verCode:function(e){
    var re = /^\d{6}$/
    var varCode = e.detail.value
    if (re.test(varCode)) {
      this.setData({
        err: "",
        disVerBtn:false
      })
    } else {
      this.setData({
        err: "请输入6位数字验证码"
      })
    }
  }
  
})
