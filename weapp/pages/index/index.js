//index.js
//获取应用实例
var app = getApp()
var login;
Page({
  data: {
    bizs: [],
    comeInBtn:'display:none'
  },
  onLoad: function ()
  {
    var that=this;
    var timestamp = Date.parse(new Date())
    console.log(timestamp)
    wx.getStorage({
      key: 'time_expire_login',
      success: function (res) {
        login = res.data
        console.log(login)
        if (login == undefined || login < timestamp) {
          wx.redirectTo({
            url: '../../pages/login/login'
          })
        }
      },
      fail: function (err) {
        console.log(err)
        if (err){
          wx.redirectTo({
            url: '../../pages/login/login'
          })
        }
      }
    })
    //清除本地存储
    wx.clearStorage()
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res.data)
      },
      fail: function (err) {
        console.log(err)
      }
    })

    wx.getStorage({
      key: 'user_biz_id',
      success: function (res) {
        var userBiz_id = res.data
        console.log(userBiz_id)
        var userBiz_id = res.data
        if (userPw == undefined) {
          that.setData({
            comeInBtn: 'display:block',
          })
        }
      },
      fail: function (err) {
        console.log(err)
        if (err) {
          that.setData({
            comeInBtn: 'display:block',
          })
        }
      }
    })
    console.log("onLoad")
    var that = this

    that.get_biz(that)
  },
  get_biz: function (object) {
    console.log("get_biz initiated")


    // 通过API获取或处理数据
    var url = 'biz/index'
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
        data: app.globalData.complete_params,
        success: function (result) {
          object.setData({ bizs: result.data.content });
        },
        fail: function (result) {
          console.log(result)
          wx.vibrateShort()
        }
      })
    }
  }, // end get_biz
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ()
  {
    return {
      title: '进来商城',
      path: '/pages/index/index'
    }
  },

  onPullDownRefresh: function ()
  {
    console.log('onPullDownRefresh')
  
    wx.showLoading({
      title: '载入中',
    })

    var that = this
    that.get_biz(that)

    wx.hideLoading()

    wx.stopPullDownRefresh()
  }

}) // end Page
