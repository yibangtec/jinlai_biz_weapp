// pages/order/detail.js
var app = getApp()
function formatDateTime(timeStamp) {
  var date = new Date();
  date.setTime(timeStamp * 1000);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order_id = options.orderId
    console.log(order_id)
    var that = this
    var url = 'order/detail'
    var params = {}
    var api_result = api_request(url, params)
    //that.initEleWidth();
    // 网络请求
    function api_request(url, api_params) {
      // 生成签名
      //console.log(bizId)
      app.sign_generate(api_params)

      wx.request({
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        url: app.globalData.url_api + url,
        data: { app_type: 'item', id: order_id, },
        success: function (result) {
          var thisList = result.data.content
          if (result.data.status == 200) {
            for (var key in thisList) {
              //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
              if (thisList[key] == null) {
                thisList[key] = ''
              }
            }
            if (thisList.time_create){
              thisList.time_create = formatDateTime(thisList.time_create)
            }else{
              thisList.time_create = ''
            }
            if (thisList.time_cancel) {
              thisList.time_cancel = formatDateTime(thisList.time_cancel)
            }else{
              thisList.time_cancel = ''
            }
            if (thisList.time_expire) {
              thisList.time_expire = formatDateTime(thisList.time_expire)
            } else {
              thisList.time_expire = ''
            }
            that.setData({
              orderDetail: thisList,
            });
          } else {

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
  remarks:function(e){
    var orderId = e.currentTarget.dataset.id
    var operationType = e.currentTarget.dataset.name
    wx.navigateTo({
      url: 'orderNote?title=订单备注&id=' + orderId + '&opera=' + operationType
    })
  },
  chargeback: function (e) {
    var orderId = e.currentTarget.dataset.id
    var operationType = e.currentTarget.dataset.name
    wx.navigateTo({
      url: 'orderOperation?title=订单退单&id=' + orderId + '&opera=' + operationType
    })
  },
  ordertaking: function (e) {
    var orderId = e.currentTarget.dataset.id
    var operationType = e.currentTarget.dataset.name
    wx.navigateTo({
      url: 'orderOperation?title=订单接单&id=' + orderId + '&opera=' + operationType
    })
  },
  delivergoods: function (e) {
    var orderId = e.currentTarget.dataset.id
    var operationType = e.currentTarget.dataset.name
    wx.navigateTo({
      url: 'orderOperation?title=订单发货&id=' + orderId + '&opera=' + operationType
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