// pages/freight/detail.js
var app = getApp()
var bizId=''
var temId=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempObj:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    bizId = options.bizId
    temId = options.tempId
    console.log(options)
    var url = 'freight_template_biz/detail'
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
        data: { app_type: 'biz',id: temId, },
        success: function (result) {
          console.log(result.data)
          if (result.data.status == 200) {
            var obje = result.data.content
            for (var key in obje) {
              //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
              if (obje[key] == '' || obje[key] ==null) {
                obje[key]=''
              } else {
                
              }
            }
            that.setData({
              tempObj: obje,
            })
          } else {
            
          }

        },
        fail: function (result) {
          console.log(result)
          wx.vibrateShort()
        }
      })
    }
  },
  editBtn:function(e){
    wx.navigateTo({
      url: 'editFreight?bizId=' + bizId + '&tempId=' + temId,
    })
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