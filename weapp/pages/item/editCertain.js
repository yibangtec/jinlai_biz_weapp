// pages/item/editCertain.js
const Upyun = require('../../utils/upyun-wxapp-sdk')
const yun = require('../../utils/video')
const upyun = new Upyun({
  bucket: 'jinlaisandbox-images',
  operator: 'jinlaisandbox',
})
const yu = new yun({
  bucket: 'jinlaisandbox-images',
  operator: 'jinlaisandbox',
})
function tick(s, bizId) {
  var objD = new Date();
  var str;
  var u = bizId
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
  var ss = objD.getSeconds() + s;
  if (ss < 10) ss = '0' + ss;
  u = u.toString()
  str = yy + MM + '/' + MM + dd + '/' + hh + mm + ss + '' + u + '.jpg';
  return str;
}
function tr(s, bizId) {
  var objD = new Date();
  var str;
  var u = bizId
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
  var ss = objD.getSeconds() + s;
  if (ss < 10) ss = '0' + ss;
  u = u.toString()
  str = yy + MM + '/' + MM + dd + '/' + hh + mm + ss + u + '.mp4';
  return str;
}
var app = getApp();
var itemId = ''
var objItem = ''
var user_id = ''
var biz_id = ''
var value = ''
var itemName = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainImageSrc:'',
    dis:'display:block',
    imgStyle:'display:block',
    timeStyle:'display:none',
    currentDate:'',
    dates: '',
    times: '',
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
      },
      fail: function (err) {

      }
    })

    itemId = options.id
    value = options.iValue
    itemName = options.iName
    if (value == "time_to_publish" || value =="time_to_suspend"){
      that.setData({
        imgStyle: 'display:none',
        timeStyle: 'display:block'
      })
    }
    that.setData({
      title: options.iName,
    })
    wx.setNavigationBarTitle({ title: options.iName })

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
          console.log(result)
          if (result.data.status == 200) {
            objItem = result.data.content
            var arr = objItem[value]
            arr = arr.split(",")
            if (arr.length > 0) {
              for (var i = 0; i < arr.length; i++) {
                arr[i] = 'https://jinlaisandbox-images.b0.upaiyun.com/item/' + arr[i]
              }
            }
            if (arr.length >= 1) {
              that.setData({
                dis: 'display:none'
              })
            }
            that.setData({
              mainImageSrc: arr
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