// pages/item/detail.js
var WxParse = require('../../utils/wxParse.js');
var app = getApp();
var itemId =''
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
    itemObj:'',
    figureImage:'',
    description:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    itemId = options.id
    var url = 'item/detail'
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
        data: { app_type: 'item', id: itemId },
        success: function (result) {
          if (result.data.status == 200) {
            var description = result.data.content.description
            var article = description;
            /**
            * WxParse.wxParse(bindName , type, data, target,imagePadding)
            * 1.bindName绑定的数据名(必填)
            * 2.type可以为html或者md(必填)
            * 3.data为传入的具体数据(必填)
            * 4.target为Page对象,一般为this(必填)
            * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
            */
            
            WxParse.wxParse('article', 'html', article, that, 5);
            console.log(article)
            var thisObj = result.data.content
            console.log(thisObj)
            if (thisObj.coupon_allowed==0){
              thisObj.coupon_allowed = "是"
            }else{
              thisObj.coupon_allowed = "否"
            }
            thisObj.time_to_publish = formatDateTime(thisObj.time_to_publish)
            thisObj.time_to_suspend = formatDateTime(thisObj.time_to_suspend)
            var arr=[]
            arr=result.data.content.figure_image_urls.split(",")
            console.log(thisObj)
            that.setData({
              itemObj: thisObj,
              figureImage: arr,
              description: description
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
  itemEdit:function(e){
    var item = e.currentTarget.dataset.item
    var name = e.currentTarget.dataset.name
    var value = e.currentTarget.dataset.value
    console.log(item)
    console.log(name)
    console.log(value)
    wx.navigateTo({
      url: 'editSingle?id=' + item+'&iName='+name+'&iValue='+value,
    })
  },
  ImageEdit:function(e){
    var item = e.currentTarget.dataset.item
    var name = e.currentTarget.dataset.name
    var value = e.currentTarget.dataset.value
    console.log(item)
    console.log(name)
    console.log(value)
    wx.navigateTo({
      url: 'editCertain?id=' + item + '&iName=' + name + '&iValue=' + value,
    })
  },
  submit:function(e){
    wx.navigateTo({
      url: 'edit?id=' + itemId,
    })
  },
  descriptionEdit:function(e){
    var item = e.currentTarget.dataset.item
    var name = e.currentTarget.dataset.name
    var value = e.currentTarget.dataset.value
    console.log(item)
    console.log(name)
    console.log(value)
    wx.navigateTo({
      url: 'descriptionItem?id=' + item + '&iName=' + name + '&iValue=' + value,
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
    var that = this
    console.log('onPullDownRefresh')

    wx.showLoading({
      title: '载入中',
    })
    //that.get_biz(that)

    wx.hideLoading()

    wx.stopPullDownRefresh()
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