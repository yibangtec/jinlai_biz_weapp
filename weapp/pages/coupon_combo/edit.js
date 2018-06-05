// pages/coupon_combo/edit.js
var app = getApp()
var pickerFile = require('../../utils/picker_datetime.js');
var user_id = ''
var bizId = ''
var couponObj = {}
var timestamp = ''
var timestamp2 = ''
var objectArray = []
var objectBizArray = []
var obj = {}
var id = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: '',
    tipsError: 'display:none',
    textError: '',
    start: '',
    end: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.Id
    var that = this
    this.datetimePicker = new pickerFile.pickerDatetime({
      page: this,
      animation: 'slide',
      duration: 500
    })
    wx.getStorage({
      key: 'user',
      success: function (res) {
        user_id = res.data.content.user_id
        console.log(user_id)
        bizId = res.data.content.biz_id
        console.log(bizId)
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
              console.log(result.data)
              couponObj = result.data.content
              Object.keys(couponObj).forEach(function (key) {

                if (couponObj[key] == null || couponObj[key] == '') {
                  delete couponObj[key]
                }
                

              });
              if (couponObj.time_start == 0) {
                console.log(couponObj.time_start)
                var timestamp = Date.parse(new Date());
                couponObj.time_start = timestamp.slice(0, 9)
                console.log(couponObj.time_start)

              }
              that.setData({
                item: couponObj
              })
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
  getName: function (e) {
    var that = this
    var name = e.detail.value
    if (name.trim().length < 1) {
      wx.showToast({
        title: '名称不能为空',
        image: '../../image/errorTips.png',
        icon: 'none',
        duration: 2000
      })
    } else {
      couponObj.name = name
    }
  },
  getIds:function(e){
    var Ids = e.detail.value
    couponObj.template_ids = Ids
  },
  getMax_amount: function (e) {
    var Max_amount = e.detail.value
    couponObj.max_amount = Max_amount
  },
  getTime_start: function (e) {
    var Time_start = e.detail.value
    couponObj.time_start = Time_start
  },
  getTime_end: function (e) {
    var Time_end = e.detail.value
    couponObj.time_end = Time_end
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    obj.coupon_allowed = e.detail.value
  },
  // 点击时间组件确定事件 
  yes: function (e) {
    var yes = e.currentTarget.dataset.coupon
    this.setData({
      currentYes: 'coupon-current',
      currentNo: ''
    })
    obj.coupon_allowed = yes
  },
  no: function (e) {
    var yes = e.currentTarget.dataset.coupon
    this.setData({
      currentYes: '',
      currentNo: 'coupon-current'
    })
    obj.coupon_allowed = yes
  },

  startTap: function () {
    var that = this
    this.datetimePicker.setPicker('startDate');
  },
  endTap: function () {
    this.datetimePicker.setPicker('endDate');
  },
  submitEdit: function (e) {
    var that = this
    couponObj.biz_id = bizId
    couponObj.user_id = user_id
    couponObj.app_type = 'biz'
    couponObj.id = id
    if (couponObj.name == undefined || couponObj.template_ids == undefined) {
      console.log(couponObj.name)
      wx.showToast({
        title: '带*标示项不能为空',
        image: '../../image/errorTips.png',
        icon: 'none',
        duration: 2000
      })
    } else {
      var url = 'coupon_combo/edit'
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
          data: couponObj,
          success: function (result) {

            if (result.data.status == 200) {
              console.log(result.data)
              wx.showToast({
                title: '编辑成功',
                icon: 'success',
                duration: 2000
              })
              wx.navigateBack({
                delta: 1
              })
            } else {
              console.log(result.data)
            }

          },
          fail: function (result) {
            console.log(result)
            wx.vibrateShort()
          }
        })
      }
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