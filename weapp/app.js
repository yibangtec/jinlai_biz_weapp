//app.js
App({
  onLaunch: function ()
  {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  // 获取用户资料
  getUserInfo:function(cb)
  {
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  // 全局变量
  globalData:
  {
    userInfo : null,
    int:1,
    url_api : "https://api.517ybang.com/",
    key_api: "7C4l7JLaM3Fq5biQurtmk9nFS",

    sign_params :
    {
      app_type : "client",
      app_version: "0.0.1",
      device_platform: "weapp",
      device_number: "",
      random: "", // 请求签名时生成
      timestamp: "" // 请求签名时生成
    },

    complete_params : {}
  },

  // 签名生成参数
  sign_generate : function(api_params)
  {
    // 载入含有sha1算法函数的工具文件
    var util = require('utils/util.js')

    // 生成签名所需的时间戳及随机数
    this.globalData.sign_params.timestamp = Date.parse(new Date()) / 1000
    var random = ( Math.round(Math.random() * 1000) ).toString()
    this.globalData.sign_params.random = util.hex_sha1(random)

    // 合并待签名参数对象
    var params_to_sign = Object.assign(this.globalData.sign_params, api_params)

    // 将所有参与签名的参数键值对以字典序升序进行排序
    var key_sorted = Object.keys(params_to_sign).sort()
    var params_sorted = {}
    for (let key of key_sorted)
    {
      params_sorted[key] = (params_to_sign[key]).toString()
    }
    this.globalData.complete_params = params_sorted

    // 生成待计算签名字符串
    var sign_string = ""
    for (var key in params_sorted) {
      sign_string += "&" + key + "=" + params_to_sign[key]
    }

    // 将密钥以“&key=”+key值的格式拼入字符串末尾
    sign_string += "&key=" + this.globalData.key_api

    // 对拼接后的字符串进行SHA1计算
    // 将计算后的字符串转为大写
    this.globalData.complete_params.random = random
    this.globalData.complete_params.sign = (util.hex_sha1(sign_string)).toUpperCase()
    //console.log(this.globalData.complete_params)
  }
})