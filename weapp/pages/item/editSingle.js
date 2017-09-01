// pages/item/editSingle.js
var app = getApp();
var itemId = ''
var value=''
var user_id=''
var itemName = ''
var thisObj=''
var itemValue=''
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
    title:'',
    value:'',
    dis:true,
    length:''
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
          if (result.data.status == 200) {
            thisObj = result.data.content
            if (thisObj.coupon_allowed == 0) {
              thisObj.coupon_allowed = "是"
            } else {
              thisObj.coupon_allowed = "否"
            }
            thisObj.time_to_publish = formatDateTime(thisObj.time_to_publish)
            thisObj.time_to_suspend = formatDateTime(thisObj.time_to_suspend)
            var arr = []
            arr = result.data.content.figure_image_urls.split(",")
            that.setData({
              value: thisObj[value]
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
  verUpdate:function(e){
    var that = this
    that.setData({
      dis: false
    })
  },
  getCode_biz:function(e){
    if (e.detail.value == thisObj[value]){
      wx.showToast({
        title: '修改内容与原内容相同',
        icon: 'loading',
        duration: 2000
      })
    }else{
      itemValue = e.detail.value
    } 
  },
  submitUpdate:function(e){
    var url = 'item/edit_certain'
    var params = {}

    if (value == 'code_biz'){
      var re = /[a-zA-Z\d]{1,20}/
      if (re.test(itemValue)) {
        var api_result = api_request(url, params)
      }else{
        wx.showToast({
          title: '最多20个英文大小写字母、数字',
          icon: 'loading',
          duration: 2000
        })
      }
    } else if (value == 'name'){
      var reg = /([\u4e00-\u9fa5a-zA-Z]+[0-9]*){1,30}/
      if (reg.test(itemValue) || value == 'slogan') {
        var api_result = api_request(url, params)
      } else {
        wx.showToast({
          title: '最多30个字符，中英文、数字，不可为纯数字',
          icon: 'loading',
          duration: 2000
        })
      }
    } else if (value == 'tag_price' || value == 'price') {
      if (itemValue > 99999.99){
        wx.showToast({
          title: '最高99999.99',
          icon: 'loading',
          duration: 2000
        })
      }else {
        var api_result = api_request(url, params)
      }
    } else if (value == 'unit_name') {
      that.setData({
        length: 10
      })
      var api_result = api_request(url, params)
    } else if (value == 'weight_net' || value == 'weight_gross' || value == 'weight_volume') {
      if (itemValue > 999.99) {
        wx.showToast({
          title: '最高999.99',
          icon: 'loading',
          duration: 2000
        })
      } else {
        var api_result = api_request(url, params)
      }
    } else if (value == 'stocks') {
      if (itemValue > 65535) {
        wx.showToast({
          title: '库存最多65535',
          icon: 'loading',
          duration: 2000
        })
      } else {
        var api_result = api_request(url, params)
      }
    } else if (value == 'quantity_max' || value == 'quantity_min') {
      if (itemValue > 99) {
        wx.showToast({
          title: '限量最多99',
          icon: 'loading',
          duration: 2000
        })
      } else {
        var api_result = api_request(url, params)
      }
    } else if (value == 'discount_credit' || value == 'commission_rate') {
      if (itemValue > 0.5) {
        wx.showToast({
          title: '积分抵扣率和佣金比例最高0.5',
          icon: 'loading',
          duration: 2000
        })
      } else {
        var api_result = api_request(url, params)
      }
    }else{
      var api_result = api_request(url, params)
    }

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
        data: { app_type: 'biz', id: itemId, user_id: user_id, name: value, value: itemValue},
        success: function (result) {
          if (result.data.status == 200) {
            wx.showToast({
              title: result.data.content.message,
              icon: 'loading',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: result.data.content.error.message,
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