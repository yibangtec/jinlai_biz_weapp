// pages/biz/detail.js
var app = getApp()
var text,bizId,biz;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    biz : {},
    id : "",
    pArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    console.log(options)
    
    var that = this
    that.setData({
      id:options.id,
    })


    // 通过API获取或处理数据
    var url = 'biz/detail'
    bizId = options.id
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
        data: { id: bizId },
        success: function (result) {
          console.log(result.data)
          biz = result.data.content
          var p = result.data.content.url_image_product
          var arr = p.split(",")
          console.log(arr)
          that.setData({ biz: result.data.content, pArr: arr });
          
        },
        fail: function (result) {
          console.log(result)
        }
      })
    }
  },
  edit_name:function(e){
    var n = e.currentTarget.dataset.name
    var v = e.currentTarget.dataset.value
    var t = e.currentTarget.dataset.text
    console.log(bizId + n + biz[v]+t)
    wx.navigateTo({
      url: 'edit_certain?id=' + bizId + '&name=' + n + '&value=' + biz[v]+'&text='+t
    })
  },
  edit_img:function(e){
    var n = e.currentTarget.dataset.name
    var v = e.currentTarget.dataset.name
    var t = e.currentTarget.dataset.text
    var img = e.currentTarget.dataset.img
    console.log(bizId + n + biz[v] + t)
    wx.navigateTo({
      url: 'edit_img?id=' + bizId + '&name=' + n + '&value=' + biz[v] + '&text=' + t+'&img='+img
    })
  },
  button_edit:function(e){
    wx.navigateTo({
      url: 'edit?id=' + bizId,
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