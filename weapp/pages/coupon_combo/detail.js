// pages/coupon_combo/detail.js
function tr(stamp) {
  //var objD = new Date();
  var objD = new Date(stamp * 1000);

  var yy = objD.getYear();
  if (yy < 1900) yy = yy + 1900;

  var MM = objD.getMonth() + 1;
  if (MM < 10) MM = '0' + MM;

  var dd = objD.getDate();
  if (dd < 10) dd = '0' + dd;

  var hh = objD.getHours();
  if (hh < 10) hh = '0' + hh;

  var mm = objD.getMinutes();
  if (mm < 10) mm = '0' + mm;

  var ss = objD.getSeconds();
  if (ss < 10) ss = '0' + ss;

  return yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
}
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.Id
    var that = this
    var url = 'coupon_combo/detail'
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
        data: { id: id, },
        success: function (result) {
          
          if (result.data.status == 200){
            var list = result.data.content
            console.log(list)
            
            if (list.time_start == null) {
              list.time_start = ''
            } else if (list.time_start == 0) {

            } else {
              var d = tr(list.time_start)
              //console.log(d)
              list.time_start = d
            }
            if (list.time_end == null) {
              list.time_end = ''
            } else if (list.time_end == 0) {

            } else {
              var end = tr(list.time_end)
              //console.log(end)
              list.time_end = end
            }

            that.setData({
              item: list
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
  edit: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'edit?Id=' + id
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