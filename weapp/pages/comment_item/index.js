// pages/comment_item/index.js
var app = getApp()
var user_id = ''
var bizId = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: {
      all: 'tab-current',
      favourable: '',
      intermediate: '',
      negative:'',
      commentStyle:'display:block'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        user_id = res.data.content.user_id
        console.log(user_id)
        bizId = res.data.content.biz_id
        console.log(bizId)
        var url = 'comment_item/index'
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
            data: { limit: 10, app_type: 'biz', biz_id: bizId },
            success: function (result) {
              console.log(result.data)
              if (result.data.status == 200){
                var list = result.data.content
                that.setData({
                  item: list
                })
              }else{
                that.setData({
                  commentStyle: 'display:none'
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
      fail: function (err) {

      }
    })
    
  },
  allComment:function(e){
    var that = this
    that.setData({
      currentTab: {
        all: 'tab-current',
        favourable: '',
        intermediate: '',
        negative: ''
      },
    })
    var url = 'comment_item/index'
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
        data: { limit: 10, app_type: 'biz', biz_id: bizId },
        success: function (result) {
          console.log(result.data)
          if (result.data.status == 200) {
            var list = result.data.content
            that.setData({
              commentStyle: 'display:block',
              item: list
            })
          } else {
            that.setData({
              commentStyle: 'display:none'
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
  favourableComment: function (e) {
    var that = this
    that.setData({
      currentTab: {
        all: '',
        favourable: 'tab-current',
        intermediate: '',
        negative: ''
      },
      
    })
    var url = 'comment_item/index'
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
        data: { limit: 10, app_type: 'biz', biz_id: bizId, score_min: '4' },
        success: function (result) {
          console.log(result.data)
          if (result.data.status == 200) {
            var list = result.data.content
            that.setData({
              commentStyle: 'display:block',
              item: list
            })
          } else {
            that.setData({
              commentStyle: 'display:none'
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
  intermediateComment: function (e) {
    var that = this
    that.setData({
      currentTab: {
        all: '',
        favourable: '',
        intermediate: 'tab-current',
        negative: ''
      },
      
    })
    var url = 'comment_item/index'
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
        data: { limit: 10, app_type: 'biz', biz_id: bizId, score_max: '3', score_min: '2' },
        success: function (result) {
          console.log(result.data)
          if (result.data.status == 200) {
            var list = result.data.content
            that.setData({
              commentStyle: 'display:block',
              item: list
            })
          } else {
            that.setData({
              commentStyle: 'display:none'
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
  negativeComment: function (e) {
    var that = this
    that.setData({
      currentTab: {
        all: '',
        favourable: '',
        intermediate: '',
        negative: 'tab-current'
      },
      
    })
    var url = 'comment_item/index'
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
        data: { limit: 10, app_type: 'biz', biz_id: bizId, score_max: '1' },
        success: function (result) {
          console.log(result.data)
          if (result.data.status == 200) {
            var list = result.data.content
            that.setData({
              commentStyle: 'display:block',
              item: list
            })
          } else {
            that.setData({
              commentStyle: 'display:none'
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