// pages/order/orderDelivery.js
var app = getApp()
var orderId = ''
var operationType = ''
var noteValue = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options.id)
    orderId = options.id
    if (orderId == 'undefined'){
      wx.getStorage({
        key: 'list',
        success: function (res) {
          console.log(res.data)
          var arr = []
          for (var i = 0; i < res.data.length; i++) {
            arr.push(res.data[i].order_id)
          }
          orderId = arr.join(',')
          console.log(orderId)
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }else{
     
    }
    
  },

  bindFormSubmit: function(e){
    noteValue = e.detail.value.textarea
    console.log(noteValue)
    if (noteValue !== ''){
      wx.getStorage({
        key: 'user',
        success: function (res) {
          console.log(res.data.content)
          var user_id = res.data.content.user_id
          var bizId = res.data.content.biz_id

          var url = 'order/edit_bulk'
          var params = {}
          var api_result = api_request(url, params)
          //that.initEleWidth();
          // 网络请求
          function api_request(url, api_params) {
            // 生成签名
            app.sign_generate(api_params)

            wx.request({
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              url: app.globalData.url_api + url,
              data: { app_type: 'biz', user_id: user_id, ids: orderId, operation: 'note', note_stuff: noteValue },
              success: function (result) {
                var thisList = result.data.content
                if (result.data.status == 200) {
                  wx.showToast({
                    title: '全部操作成功',
                    icon: 'loading',
                    duration: 2000
                  })
                }
                console.log(result)
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

    }else{
      wx.showToast({
        title: '备注不能为空',
        icon: 'loading',
        duration: 2000
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